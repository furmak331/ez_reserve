import Restaurant from '../models/Restaurant.js';
import asyncHandler from 'express-async-handler';

// Get all restaurants
export const getRestaurants = asyncHandler(async (req, res) => {
  const { cuisine, search, page = 1, limit = 10 } = req.query;
  
  const query = {};
  if (cuisine) query.cuisine = cuisine;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { 'menu.items.name': { $regex: search, $options: 'i' } },
    ];
  }

  const restaurants = await Restaurant.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Restaurant.countDocuments(query);

  res.json({
    restaurants,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

// Get restaurant by ID
export const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404);
    throw new Error('Restaurant not found');
  }
});

// Check table availability
export const checkAvailability = asyncHandler(async (req, res) => {
  const { date, time, partySize } = req.body;
  const restaurant = await Restaurant.findById(req.params.id);
  
  if (!restaurant) {
    res.status(404);
    throw new Error('Restaurant not found');
  }

  // Logic to check table availability
  const availableTables = restaurant.tables.filter(
    table => table.isAvailable && table.capacity >= partySize
  );

  res.json({
    available: availableTables.length > 0,
    tables: availableTables,
  });
});