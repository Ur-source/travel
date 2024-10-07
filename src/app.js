// src/app.js
const express = require('express');
const app = express();
const itineraryRoutes = require('./routes/itinerary');

app.use(express.json()); // Middleware for parsing JSON requests

// Register the itinerary routes
app.use('/itinerary', itineraryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
