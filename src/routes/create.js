/**
 * Load dependencies
 */
const express = require('express');

/**
 * Load controllers and middlewares
 */
const { newUrl } = require('../controllers/createCtrl');
const { checkUrl } = require('../middlewares/createMw');

const router = express.Router();

/**
 * Create new URL
 */
router.post('/', checkUrl, newUrl);

module.exports = router;
