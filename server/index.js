const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI is not defined in environment variables!');
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => {
    console.error('CRITICAL: Error connecting to MongoDB:');
    console.error(err);
  });

// Basic Route
app.get('/', (req, res) => {
  res.send('eCommerce API is running...');
});

// Import Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Import Models
const Product = require('./models/Product');

// Start Server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
