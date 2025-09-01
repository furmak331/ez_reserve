const express = require('express');
const { 
  getRestaurants, 
  getRestaurantById, 
  searchNearby,
  checkAvailability,
  getRestaurantReviews,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController.js');
const { protect, restrictTo } = require('../middleware/auth.js');

const router = express.Router();

// Public routes
router.get('/', getRestaurants);
router.get('/search/nearby', searchNearby);
router.get('/:id', getRestaurantById);
router.get('/:id/availability', checkAvailability);
router.get('/:id/reviews', getRestaurantReviews);

// Admin only routes
router.post('/', protect, restrictTo('admin'), createRestaurant);
router.put('/:id', protect, restrictTo('admin'), updateRestaurant);
router.delete('/:id', protect, restrictTo('admin'), deleteRestaurant);

module.exports = router;
