/**
 * Load dependencies
 */
const express = require('express');

/**
 * Load controller
 */
const { newUrl, checkUrl } = require('../controllers/createCtrl');

/**
 * Load middlewares
 */
const router = express.Router();

/**
 * Create new URL
 */
router.post('/', checkUrl, newUrl);

module.exports = router;
