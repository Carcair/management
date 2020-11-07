/**
 * Load dependencies
 */
const express = require('express');

/**
 * Load controller
 */
const { deleteUrl } = require('../controllers/deleteCtrl');

const router = express.Router();

/**
 * Delete a URL by its id
 */
router.delete('/:id', deleteUrl);

module.exports = router;
