const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: '/default.jpg' }, // Default image path
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }], // Add favoriteMovies field
  favoriteTvShows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TvShow' }] // Add favoriteTvShows field
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
