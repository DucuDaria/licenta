const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.post('/', searchController.saveSearch);
router.get('/', searchController.getHistory);

module.exports = router;
