const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController'); // ✅ import corect

router.post('/register', registerUser); // ✅ funcția există

module.exports = router;
