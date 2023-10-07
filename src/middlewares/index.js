const services = require("../services");
const logger = require("../utils/logger");
/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>}
 * @description This function is used to authenticate the token
 */
function authenticateToken(req, res, next) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    logger.info("no token provided!");
    return res.status(403).send("no token provided!");
  }
  try {
    const decoded = services.userService.getData(accessToken);
    req.decoded = decoded;
    logger.info(decoded);
    next();
  } catch (err) {
    logger.error(err);
    return res.status(403).send("Unauthorized!");
  }
}

module.exports = { authenticateToken };
