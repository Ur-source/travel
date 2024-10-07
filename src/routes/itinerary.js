// src/routes/itinerary.js
const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Ensure the path is correct
const { generateItinerary } = require('../services/recommendation');

// GET itinerary for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itinerary = generateItinerary(user);
    return res.json(itinerary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error generating itinerary' });
  }
});

module.exports = router;
