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
        res.status(400).end('Request failed.');
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
      res.status(400).end('Request failed.');
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
      urls.forEach((element) => {
        tempArr.push(element.shortURL);
      });

      // // Generate shortURL
      // let shortURL = baseUrl + '/' + shortid.generate();

      // // In case if shortURL exists, generate until we get different
      // // Prevent repetition
      // while (tempArr.includes(shortURL)) {
      //   shortURL = baseUrl + '/' + shortid.generate();
      // }

      // // Object we'll insert into DB
      // const tempObj = {
      //   realURL,
      //   shortURL,
      // };

      // // Validate URLs
      // if (validateUrl(tempObj.realURL === false || shortURL === false))
      //   res.status(406).end('Invalid URL');

      const temp = createURLObj(realURL, baseURL, tempArr);

      if (temp === 406) res.status(406).end('Invalid URLs.');

      // Insert into DB
      Url.create(temp)
        .then(() => {
          // Return value we inserted as response
          Url.findOne({
            where: { realURL },
            raw: true,
          }).then((url) => {
            res.status(201).json(url);
          });
        })
        .catch((err) => {
          res.status(400).end('Request failed.');
        });
    })
    .catch((err) => {
      res.status(400).end('Request failed.');
    });
};
