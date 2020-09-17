/**
 * Load modules
 */
const validUrl = require('valid-url');
const shortid = require('shortid');

/**
 * Validate url
 */
exports.validateUrl = (url) => {
  if (validUrl.isUri(url)) return true;
  else return false;
};

exports.createURLObj = (realURL, baseURL, arr) => {
  // Generate shortURL
  let shortURL = baseURL + '/' + shortid.generate();

  // In case if shortURL exists, generate until we get different
  // Prevent repetition
  while (arr.includes(shortURL)) {
    shortURL = baseURL + '/' + shortid.generate();
  }

  // Validate URLs
  if (!validUrl.isUri(realURL) || !validUrl.isUri(shortURL)) return 406;

  // Object we'll insert into DB
  return {
    realURL,
    shortURL,
  };
};
