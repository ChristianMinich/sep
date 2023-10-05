const services = require("../services");


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