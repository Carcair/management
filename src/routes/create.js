/**
 * Load dependencies
 */
const express = require('express');

/**
 * Load variables
 */
const { NODE_ENV } = require('../../config');

/**
 * Load controller and helpers
 */
const { getUrls, newUrl, checkUrl } = require('../controllers/createCtrl');

/**
 * Load middlewares
 */
const router = express.Router();

/**
 * Test creation route, dev only
 * @route /api/create/test
 */
if (NODE_ENV === 'development') {
  router.get('/test', getUrls);
}

/**
 * Create new URL
 * @route /api/create
 */
router.post('/', checkUrl, newUrl);

module.exports = router;
