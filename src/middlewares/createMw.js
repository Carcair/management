/**
 * Load sequelize schema
 */
const Url = require('../models/sequelize/Url');

const createMw = {
  /**
   * Check for realUrl existence in DB
   */
  checkUrl: (req, res, next) => {
    const realURL = req.body.realURL;

    Url.findOne({
      where: { realURL },
      raw: true,
    })
      .then((url) => {
        // Check if we got result
        if (url == null) next();
        else res.status(406).end('Already exists.');
      })
      .catch((err) => {
        res.status(503).json({ err });
      });
  },
};

module.exports = createMw;
