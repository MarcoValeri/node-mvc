// Import modules and views
const express = require('express');
const { homeView } = require('../controllers/homeController');
const router = express.Router();

// Home Route
router.get('/', homeView);

// Export
module.exports = router;
