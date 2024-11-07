const { ZodError } = require("zod");

class AppError extends Error {
  constructor(err, options) {
    super(err.message, options);
    this.statusCode = 500;
    this.details = {};
  }

  // Factory method (Design Pattern)
  static from(err, statusCode = 500) {
    const appError = new AppError(err);
    appError.statusCode = statusCode;
    return appError;
  }

  getRootCause() {
    if (this.rootCause) {
      return this.rootCause instanceof AppError ? this.rootCause.getRootCause() : this.rootCause;
    }
    return null;
  }

  // Wrapper (Design Pattern)
  wrap(rootCause) {
    const appError = AppError.from(this, this.statusCode);
    appError.rootCause = rootCause;
    return appError;
  }

  // setter chain
  withDetail(key, value) {
    this.details[key] = value;
    return this;
  }

  withLog(logMessage) {
    this.logMessage = logMessage;
    return this;
  }

  toJSON(isProduction = true) {
    const rootCause = this.getRootCause();

    return isProduction
      ? {
          message: this.message,
          statusCode: this.statusCode,
          details: this.details,
        }
      : {
          message: this.message,
          statusCode: this.statusCode,
          rootCause: rootCause ? rootCause.message : this.message,
          details: this.details,
          logMessage: this.logMessage,
        };
  }

  getStatusCode() {
    return this.statusCode;
  }
}

// Util error function
const responseErr = (err, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  !isProduction && console.log("Error:", err); // Debug log

  if (err instanceof AppError) {
    res.status(err.getStatusCode()).json(err.toJSON(isProduction));
    return;
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const appErr = ErrInvalidRequest.wrap(err);

    err.issues.forEach((issue) => {
      appErr.withDetail(issue.path.join("."), issue.message);
    });

    res.status(appErr.getStatusCode()).json(appErr.toJSON(isProduction));
    return;
  }

  // Handle stringified Zod errors
  if (err.error && typeof err.error === "string") {
    try {
      const parsedError = JSON.parse(err.error);
      const appErr = ErrInvalidRequest.wrap(new Error("Validation failed"));

      if (Array.isArray(parsedError)) {
        parsedError.forEach((issue) => {
          appErr.withDetail(issue.path.join("."), issue.message);
        });
      }

      res.status(appErr.getStatusCode()).json(appErr.toJSON(isProduction));
      return;
    } catch (e) {
      console.error("Error parsing validation error:", e);
    }
  }

  const appErr = ErrInternalServer.wrap(err);
  res.status(appErr.getStatusCode()).json(appErr.toJSON(isProduction));
};

const ErrInternalServer = AppError.from(new Error("Something went wrong, please try again later."), 500);
const ErrInvalidRequest = AppError.from(new Error("Invalid request"), 400);
const ErrUnauthorized = AppError.from(new Error("Unauthorized"), 401);
const ErrForbidden = AppError.from(new Error("Forbidden"), 403);
const ErrNotFound = AppError.from(new Error("Not found"), 404);
const ErrMethodNotAllowed = AppError.from(new Error("Method not allowed"), 405);
const ErrUserNotFound = AppError.from(new Error("User not found"), 404);
const ErrOTPNotFound = AppError.from(new Error("OTP not found"), 404);
const ErrInvalidOTP = AppError.from(new Error("Invalid OTP"), 400);
const ErrOTPUsed = AppError.from(new Error("OTP used"), 400);
const ErrPasswordResetNotFound = AppError.from(new Error("Password reset not found"), 404);

module.exports = {
  AppError,
  responseErr,
  ErrInternalServer,
  ErrInvalidRequest,
  ErrUnauthorized,
  ErrForbidden,
  ErrNotFound,
  ErrMethodNotAllowed,
  ErrUserNotFound,
  ErrInvalidOTP,
  ErrOTPUsed,
  ErrPasswordResetNotFound,
};
