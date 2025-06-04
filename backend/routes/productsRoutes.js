const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// ✅ o singură rută GET
router.get('/', productsController.getAllProducts);
router.get('/search/:query', productsController.getProductsBySearch);

// ✅ scraping endpoint
router.post('/scrape', productsController.scrapeProducts);

module.exports = router;
