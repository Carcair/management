/**
 * Load modules
 */
const validUrl = require('valid-url');
const shortid = require('shortid');

/**
 * Generate object of URL variables
 * that will insert into DB
 */
exports.createURLObj = (realURL, baseURL, arr) => {
  // Generate shortURL
  let shortURL = baseURL + '/' + shortid.generate();

  // In case if shortURL exists, generate until we get different
  // Prevent repetition
  // arr is an array with all shortURLs inside DB
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
