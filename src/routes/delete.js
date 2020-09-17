/**
 * Load dependencies
 */
const express = require('express');

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

module.exports = router;
