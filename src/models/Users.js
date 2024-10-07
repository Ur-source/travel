// src/models/User.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

class User {
  constructor(id, name, vibe, previous_destinations, favorite_activities, expenses) {
    this.id = id;
    this.name = name;
    this.vibe = vibe;
    this.previous_destinations = previous_destinations;
    this.favorite_activities = favorite_activities;
    this.expenses = expenses;
  }

  static getAllUsers() {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(path.join(__dirname, '../data/users.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(new User(
          data.id,
          data.name,
          data.vibe,
          data.previous_destinations.split(',').map(dest => dest.trim()), // Trim spaces if any
          data.favorite_activities.split(',').map(act => act.trim()), // Trim spaces if any
          parseInt(data.expenses, 10) // Ensure to parse expenses as an integer
        )))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  static getUserById(userId) {
    return new Promise((resolve, reject) => {
      this.getAllUsers()
        .then(users => {
          const user = users.find(user => user.id === userId.toString()); // Convert userId to string for comparison
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = User;
