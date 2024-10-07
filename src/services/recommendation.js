// src/services/recommendation.js
const destinations = require('../data/destinations.json');

function generateItinerary(user) {
  const { vibe, previous_destinations, favorite_activities, expenses } = user;

  // Filter destinations by user vibe preference
  const potentialDestinations = destinations.filter(
    (destination) => destination.vibe === vibe && !previous_destinations.includes(destination.name)
  );

  const selectedDestination = potentialDestinations.length
    ? potentialDestinations[Math.floor(Math.random() * potentialDestinations.length)]
    : { name: "Default Destination", activities: [{ name: "Exploring", cost: 0 }] };

  // Filter activities based on user budget
  const affordableActivities = selectedDestination.activities.filter(
    (activity) => activity.cost <= expenses
  );

  // Create the final itinerary
  const itinerary = {
    destination: selectedDestination.name,
    vibe: vibe,
    activities: affordableActivities.map(activity => activity.name),
    estimated_budget_per_day: expenses
  };

  return itinerary;
}

module.exports = {
  generateItinerary,
};
