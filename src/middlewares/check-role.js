const { ErrUnauthorized, ErrForbidden, responseErr } = require("../app-error");

const allowRoles = (roles) => {
  return (req, res, next) => {
    if (!res.locals.requester) {
      responseErr(ErrUnauthorized, res);
      return;
    }

    const requester = res.locals.requester;
    if (roles.indexOf(requester.role) === -1) {
      responseErr(ErrForbidden.withLog(`This user has role: ${requester.role}`), res);
      return;
    }

    next();
  };
};

module.exports = { allowRoles };
