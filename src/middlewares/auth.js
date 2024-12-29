const { verifyToken } = require("../utils/jwt");
const { models } = require("../sequelize");
module.exports.authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    // 2. Verify token
    const requester = await verifyToken(token);

    // 3. Get user from database
    const user = await models.User.findOne({
      where: { username: requester.sub },
    });

    // 4. Check user is exist
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    // 5. Check user is active
    if (!user.isActive) {
      res.status(401).json({ error: "User is not active" });
      return;
    }
    const { roleId, username: username } = user;
    const role = await models.Role.findByPk(roleId);
    if (!role) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    // 6. Set requester to res.locals
    res.locals["requester"] = { username, role: role.name };
    return next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
};
