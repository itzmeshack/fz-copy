const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: String,
    required: false // Optional to support tvId
  },
  tvId: {
    type: String,
    required: false // Optional to support movieId
  },
  type: {
    type: String,
    enum: ['movie', 'tv'],
    required: true
  },
  title: {
    type: String
  },
  poster_path: {
    type: String
  }
});

// Ensure that at least one of movieId or tvId is provided
FavouriteSchema.pre('save', function (next) {
  if (!this.movieId && !this.tvId) {
    next(new Error('Either movieId or tvId must be provided'));
  } else {
    next();
  }
});



const Favourite = mongoose.model('Favourite', FavouriteSchema);

module.exports = Favourite;
