const services = require("../services");

/**
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 * @description This function is used to get the store details
 */
function storeDetails(req, res) {
  try {
    services.storeService
      .storeDetails()
      .then((details) => {
        if (details !== null) {
          res.status(200).send(JSON.stringify(details));
        } else {
          logger.warn("No Store-Details Found!");
          res.status(400).send("No Store-Details Found!");
        }
      })
      .catch((error) => {
        logger.error(error);
        res.status(500).send("Error fetching Store-Details!");
      });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error fetching Store-Details!");
  }
}

module.exports = { storeDetails };
