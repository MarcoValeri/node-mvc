// Import modules and views
const express = require('express');
const { homeView } = require('../controllers/homeController');
const { aboutView } = require('../controllers/aboutController');
const router = express.Router();

// Home Route
router.get('/', homeView);

// About Route
router.get('/about', aboutView);

// Export
module.exports = router;
