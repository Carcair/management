/**
 * Load modules
 */
const validUrl = require('valid-url');
const shortid = require('shortid');
const rabbitHandler = require('./rabbitHandler');

/**
 * Load URL schema
 */
const Url = require('../models/sequelize/Url');

/**
 * Generate object of URL variables
 * that will insert into DB
 */
exports.createURLObj = (realURL, baseURL, arr) => {
  // Generate shortURL
  let shortURL = 'http://' + baseURL + '/' + shortid.generate();

  // In case if shortURL exists, generate until we get different
  // Prevent repetition
  // arr is an array with all shortURLs inside DB
  while (arr.includes(shortURL)) {
    shortURL = 'http://' + baseURL + '/' + shortid.generate();
  }

  // Validate URLs
  // If not valid, return Not Acceptable
  if (!validUrl.isUri(realURL) || !validUrl.isUri(shortURL)) return 406;

  // Object we'll insert into DB
  // Id is generated inside DB / Auto Increment
  return {
    realURL,
    shortURL,
  };
};

// Get all URLs
// And sent them to Rabbit service
// This payload will be received on startup of Redirection service
exports.getUrls = () => {
  Url.findAll({ raw: true })
    .then((urls) => {
      rabbitHandler.sendFirstPayload(urls);
    })
    .catch((err) => {
      console.log(err);
    });
};
