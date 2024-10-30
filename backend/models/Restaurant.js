import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  images: [{
    type: String,
    required: true,
  }],
  menu: [{
    category: String,
    items: [{
      name: String,
      description: String,
      price: Number,
      image: String,
    }],
  }],
  openingHours: [{
    day: String,
    open: String,
    close: String,
  }],
  tables: [{
    number: Number,
    capacity: Number,
    isAvailable: {
      type: Boolean,
      default: true,
    },
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

export default mongoose.model('Restaurant', restaurantSchema);