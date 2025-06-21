const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const { getProductsBySearch } = require('../controllers/productsController');

router.get('/', controller.getAllProducts);
router.get('/search/:termen', controller.getProductsBySearch);

module.exports = router;
