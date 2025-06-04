const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✅ mutat sus

// ✅ importuri corecte
const productsRoutes = require('./routes/productsRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use(cors());
app.use(express.json());

// ✅ mountare rute
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cautari', searchRoutes);

// ✅ start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
