const Restaurant = require('../models/Restaurant.js');
const Review = require('../models/Review.js');
const { asyncHandler } = require('../middleware/errorHandler.js'); 

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = asyncHandler(async (req, res) => {
  const { cuisine, search, city, limit = 20, page = 1 } = req.query;
  
  const filters = {};
  if (cuisine) filters.cuisine = cuisine;
  if (search) filters.search = search;
  if (city) filters.city = city;
  if (limit) filters.limit = parseInt(limit);

  const restaurants = await Restaurant.findAll(filters);

  res.json({
    success: true,
    count: restaurants.length,
    data: restaurants
  });
});

// @desc    Get restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const restaurant = await Restaurant.findById(id);
  
  if (!restaurant) {
    return res.status(404).json({
      success: false,
      message: 'Restaurant not found'
    });
  }

  // Get restaurant hours
  const hours = await Restaurant.getHours(id);
  
  // Get restaurant tables
  const tables = await Restaurant.getTables(id);

  // Get recent reviews
  const reviews = await Review.findByRestaurantId(id, 10, 0);

  res.json({
    success: true,
    data: {
      restaurant: {
        ...restaurant,
        hours,
        tables,
        reviews
      }
    }
  });
});

// @desc    Search restaurants nearby
// @route   GET /api/restaurants/search/nearby
// @access  Public
const searchNearby = asyncHandler(async (req, res) => {
  const { latitude, longitude, radius = 10 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude are required'
    });
  }

  const restaurants = await Restaurant.searchNearby(
    parseFloat(latitude),
    parseFloat(longitude),
    parseFloat(radius)
  );

  res.json({
    success: true,
    count: restaurants.length,
    data: restaurants
  });
});

// @desc    Get available tables for a restaurant
// @route   GET /api/restaurants/:id/availability
// @access  Public
const checkAvailability = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { date, time, partySize } = req.query;

  if (!date || !time || !partySize) {
    return res.status(400).json({
      success: false,
      message: 'Date, time, and party size are required'
    });
  }

  const restaurant = await Restaurant.findById(id);
  
  if (!restaurant) {
    return res.status(404).json({
      success: false,
      message: 'Restaurant not found'
    });
  }

  const availableTables = await Restaurant.getAvailableTables(
    id, date, time, parseInt(partySize)
  );

  res.json({
    success: true,
    data: {
      available: availableTables.length > 0,
      tables: availableTables,
      restaurant_name: restaurant.name
    }
  });
});

// @desc    Get restaurant reviews
// @route   GET /api/restaurants/:id/reviews
// @access  Public
const getRestaurantReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  
  const offset = (parseInt(page) - 1) * parseInt(limit);
  const reviews = await Review.findByRestaurantId(id, parseInt(limit), offset);
  
  // Get average rating
  const ratingData = await Review.getAverageRating(id);

  res.json({
    success: true,
    data: {
      reviews,
      average_rating: parseFloat(ratingData.average_rating).toFixed(1),
      total_reviews: parseInt(ratingData.total_reviews)
    }
  });
});

// @desc    Create new restaurant (Admin only)
// @route   POST /api/restaurants
// @access  Private/Admin
const createRestaurant = asyncHandler(async (req, res) => {
  const restaurantData = req.body;
  
  // Validate required fields
  const requiredFields = ['name', 'description', 'cuisine'];
  for (const field of requiredFields) {
    if (!restaurantData[field]) {
      return res.status(400).json({
        success: false,
        message: `${field} is required`
      });
    }
  }

  const restaurant = await Restaurant.create(restaurantData);

  res.status(201).json({
    success: true,
    message: 'Restaurant created successfully',
    data: restaurant
  });
});

// @desc    Update restaurant (Admin only)
// @route   PUT /api/restaurants/:id
// @access  Private/Admin
const updateRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const restaurant = await Restaurant.update(id, updateData);

  if (!restaurant) {
    return res.status(404).json({
      success: false,
      message: 'Restaurant not found'
    });
  }

  res.json({
    success: true,
    message: 'Restaurant updated successfully',
    data: restaurant
  });
});

// @desc    Delete restaurant (Admin only)
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
const deleteRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const restaurant = await Restaurant.delete(id);

  if (!restaurant) {
    return res.status(404).json({
      success: false,
      message: 'Restaurant not found'
    });
  }

  res.json({
    success: true,
    message: 'Restaurant deleted successfully'
  });
});

module.exports = {
  getRestaurants,
  getRestaurantById,
  searchNearby,
  checkAvailability,
  getRestaurantReviews,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};
