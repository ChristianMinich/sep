const svc = require("../services/userService");
const logger = require("../utils/logger");
function authenticateToken(req, res, next) {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    logger.info("no token provided!");
    return res.status(403).send("no token provided!");
  }

  try {
    const decoded = svc.getData();
    req.decoded = decoded;
    logger.info(decoded);
    next();
  } catch (err) {
    logger.error(err);
    return res.status(403).send("Unauthorized!");
  }
}

module.exports = { authenticateToken }