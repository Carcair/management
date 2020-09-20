/**
 * Load modules
 */
const rabbitHandler = require('../util/rabbitHandler');

/**
 * Load sequelize schema
 */
const Url = require('../models/sequelize/Url');

/**
 * Load util helper functions
 */
const { createURLObj } = require('../util/helpers');

/**
 * Load secret variables
 */
const { baseURL } = require('../../config');

/**
 * Check if realUrl exists
 */
exports.checkUrl = (req, res, next) => {
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
};

/**
 * Create URL and insert it in DB
 */
exports.newUrl = async (req, res) => {
  // Get realURL
  const realURL = req.body.realURL;

  /**
   * We need to generate shortURL that doesn't exist
   */
  Url.findAll()
    .then((urls) => {
      // Temp array with all existing shortURLs
      let tempArr = [];

      // Seperate only shortURL variables
      // We need to for comparison when generating new shortURL
      urls.forEach((element) => {
        tempArr.push(element.shortURL);
      });

      // Create object with URL variables
      const temp = createURLObj(realURL, baseURL, tempArr);

      // Will return 406 in case URLs aren't valid
      if (temp === 406) res.status(406).end('Invalid URLs.');

      // Insert into DB
      Url.create(temp)
        .then(() => {
          // Return value we inserted as response
          // So we can send it to redirection service
          Url.findOne({
            where: { realURL },
            raw: true,
          }).then((url) => {
            // Successful insert

            // Send url data to Redirection service
            rabbitHandler.sendPayload(url);

            res.status(201).json(url);
          });
        })
        .catch((err) => {
          // Failed query
          res.status(503).json({ err });
        });
    })
    .catch((err) => {
      // Failed query
      res.status(503).json({ err });
    });
};
