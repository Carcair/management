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
const { deleteUrl } = require('../controllers/deleteCtrl');

/**
 * Load middlewares
 */
const router = express.Router();

/**
 * Test delete route
 */
router.get('/test', (req, res) => {
  res.end('Delete route works!');
});

/**
 * Delete a URL by its id
 */
router.delete('/:id', deleteUrl);

module.exports = router;
