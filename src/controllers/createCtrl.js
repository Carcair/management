/**
 * Load modules
 */
const shortid = require('shortid');

/**
 * Load sequelize schema
 */
const Url = require('../models/sequelize/Url');

/**
 * Load config vars
 */
const { NODE_ENV } = require('../../config');

/**
 * Load util helper functions
 */
const { createURLObj } = require('../util/helpers');

/**
 * Get URLs, dev only
 */
if (NODE_ENV === 'development') {
  exports.getUrls = (req, res) => {
    // Get all URLs
    Url.findAll({ raw: true })
      .then((urls) => {
        res.status(200).json(urls);
      })
      .catch((err) => {
        res.status(503).end('Request failed.');
      });
  };
}

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
      res.status(503).end('Request failed.');
    });
};

/**
 * Create URL and insert it in DB
 */
exports.newUrl = async (req, res) => {
  // Get realURL
  const realURL = req.body.realURL;
  // Get dynamic protocol and host values
  const baseURL = `${req.protocol}://${req.headers.host}`;

  /**
   * We need to generate shortURL that doesn't exist
   */
  Url.findAll()
    .then((urls) => {
      // Temp array with all existing shortURLs
      let tempArr = [];
      // Seperate only shortURL variables
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
          Url.findOne({
            where: { realURL },
            raw: true,
          }).then((url) => {
            // Successful insert
            res.status(201).json(url);
          });
        })
        .catch((err) => {
          // Failed query
          res.status(503).end('Request failed.');
        });
    })
    .catch((err) => {
      // Failed query
      res.status(503).end('Request failed.');
    });
};
