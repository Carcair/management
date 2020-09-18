/**
 * Load dependencies
 */
const express = require('express');

/**
 * Load variables
 */
const { NODE_ENV } = require('../../config');

/**
 * Load controller
 */
const { getUrls, newUrl, checkUrl } = require('../controllers/createCtrl');

/**
 * Load middlewares
 */
const router = express.Router();

/**
 * Test creation route, dev only
 */
if (NODE_ENV === 'development') {
  router.get('/test', getUrls);
}

/**
 * Create new URL
 */
router.post('/', checkUrl, newUrl);

module.exports = router;
