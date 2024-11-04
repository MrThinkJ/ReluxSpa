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
  !isProduction && console.error(err.stack);

  if (err instanceof AppError) {
    res.status(err.getStatusCode()).json(err.toJSON(isProduction));
    return;
  }

  // Handle both ZodError instance and stringified ZodError
  if (err instanceof ZodError || err.error) {
    const appErr = ErrInvalidRequest.wrap(err);
    let zodErrors = [];

    if (err instanceof ZodError) {
      zodErrors = err.errors;
    } else if (typeof err.error === "string") {
      try {
        zodErrors = JSON.parse(err.error);
      } catch (e) {
        zodErrors = [{ path: ["unknown"], message: err.error }];
      }
    }

    zodErrors.forEach((error) => {
      const path = Array.isArray(error.path) ? error.path.join(".") : error.path;
      appErr.withDetail(path, error.message);
    });

    res.status(appErr.getStatusCode()).json(appErr.toJSON(isProduction));
    return;
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

module.exports = {
  AppError,
  responseErr,
  ErrInternalServer,
  ErrInvalidRequest,
  ErrUnauthorized,
  ErrForbidden,
  ErrNotFound,
  ErrMethodNotAllowed,
};