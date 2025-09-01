const Reservation = require('../models/Reservation.js');
const Restaurant = require('../models/Restaurant.js');
const User = require('../models/User.js');
const { asyncHandler } = require('../middleware/errorHandler.js'); 

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Private
const createReservation = asyncHandler(async (req, res) => {
  const { restaurant_id, reservation_date, reservation_time, party_size, special_requests } = req.body;
  const user_id = req.user.id;

  // Validation
  if (!restaurant_id || !reservation_date || !reservation_time || !party_size) {
    return res.status(400).json({
      success: false,
      message: 'Restaurant, date, time, and party size are required'
    });
  }

  // Check if restaurant exists
  const restaurant = await Restaurant.findById(restaurant_id);
  if (!restaurant) {
    return res.status(404).json({
      success: false,
      message: 'Restaurant not found'
    });
  }

  // Check if reservation date is in the future
  const reservationDateTime = new Date(`${reservation_date}T${reservation_time}`);
  if (reservationDateTime <= new Date()) {
    return res.status(400).json({
      success: false,
      message: 'Reservation must be in the future'
    });
  }

  // Check availability
  const isAvailable = await Reservation.checkAvailability(
    restaurant_id, reservation_date, reservation_time, party_size
  );

  if (!isAvailable) {
    return res.status(400).json({
      success: false,
      message: 'No tables available for the selected date and time'
    });
  }

  // Get an available table
  const availableTables = await Restaurant.getAvailableTables(
    restaurant_id, reservation_date, reservation_time, party_size
  );

  const table_id = availableTables.length > 0 ? availableTables[0].id : null;

  // Create reservation
  const reservation = await Reservation.create({
    user_id,
    restaurant_id,
    reservation_date,
    reservation_time,
    party_size,
    special_requests,
    table_id
  });

  // Get the full reservation details
  const fullReservation = await Reservation.findById(reservation.id);

  res.status(201).json({
    success: true,
    message: 'Reservation created successfully',
    data: fullReservation
  });
});

// @desc    Get user's reservations
// @route   GET /api/reservations/my-reservations
// @access  Private
const getMyReservations = asyncHandler(async (req, res) => {
  const { status, upcoming } = req.query;
  const filters = {};
  
  if (status) filters.status = status;
  if (upcoming === 'true') filters.upcoming = true;

  const reservations = await Reservation.findByUserId(req.user.id, filters);

  res.json({
    success: true,
    count: reservations.length,
    data: reservations
  });
});

// @desc    Get reservation by ID
// @route   GET /api/reservations/:id
// @access  Private
const getReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const reservation = await Reservation.findById(id);

  if (!reservation) {
    return res.status(404).json({
      success: false,
      message: 'Reservation not found'
    });
  }

  // Check if user owns the reservation or is admin
  if (reservation.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this reservation'
    });
  }

  res.json({
    success: true,
    data: reservation
  });
});

// @desc    Update reservation
// @route   PUT /api/reservations/:id
// @access  Private
const updateReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reservation_date, reservation_time, party_size, special_requests } = req.body;

  const reservation = await Reservation.findById(id);

  if (!reservation) {
    return res.status(404).json({
      success: false,
      message: 'Reservation not found'
    });
  }

  // Check if user owns the reservation
  if (reservation.user_id !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this reservation'
    });
  }

  // Check if reservation can be updated (not in the past, not cancelled)
  if (reservation.status === 'cancelled' || reservation.status === 'completed') {
    return res.status(400).json({
      success: false,
      message: 'Cannot update completed or cancelled reservations'
    });
  }

  const updateData = {};
  if (reservation_date) updateData.reservation_date = reservation_date;
  if (reservation_time) updateData.reservation_time = reservation_time;
  if (party_size) updateData.party_size = party_size;
  if (special_requests !== undefined) updateData.special_requests = special_requests;

  // If date, time, or party size changed, check availability
  if (reservation_date || reservation_time || party_size) {
    const newDate = reservation_date || reservation.reservation_date;
    const newTime = reservation_time || reservation.reservation_time;
    const newPartySize = party_size || reservation.party_size;

    const isAvailable = await Reservation.checkAvailability(
      reservation.restaurant_id, newDate, newTime, newPartySize, id
    );

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'No tables available for the selected date and time'
      });
    }

    // Get a new table if needed
    if (party_size && party_size !== reservation.party_size) {
      const availableTables = await Restaurant.getAvailableTables(
        reservation.restaurant_id, newDate, newTime, newPartySize
      );
      updateData.table_id = availableTables.length > 0 ? availableTables[0].id : null;
    }
  }

  const updatedReservation = await Reservation.update(id, updateData);

  res.json({
    success: true,
    message: 'Reservation updated successfully',
    data: updatedReservation
  });
});

// @desc    Cancel reservation
// @route   PUT /api/reservations/:id/cancel
// @access  Private
const cancelReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const reservation = await Reservation.findById(id);

  if (!reservation) {
    return res.status(404).json({
      success: false,
      message: 'Reservation not found'
    });
  }

  // Check if user owns the reservation
  if (reservation.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to cancel this reservation'
    });
  }

  // Check if reservation can be cancelled
  if (reservation.status === 'cancelled' || reservation.status === 'completed') {
    return res.status(400).json({
      success: false,
      message: 'Reservation is already cancelled or completed'
    });
  }

  const cancelledReservation = await Reservation.cancel(id);

  res.json({
    success: true,
    message: 'Reservation cancelled successfully',
    data: cancelledReservation
  });
});

// @desc    Confirm reservation (Admin/Restaurant Owner)
// @route   PUT /api/reservations/:id/confirm
// @access  Private/Admin
const confirmReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const reservation = await Reservation.updateStatus(id, 'confirmed');

  if (!reservation) {
    return res.status(404).json({
      success: false,
      message: 'Reservation not found'
    });
  }

  res.json({
    success: true,
    message: 'Reservation confirmed successfully',
    data: reservation
  });
});

// @desc    Mark reservation as completed (Admin/Restaurant Owner)
// @route   PUT /api/reservations/:id/complete
// @access  Private/Admin
const completeReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const reservation = await Reservation.updateStatus(id, 'completed');

  if (!reservation) {
    return res.status(404).json({
      success: false,
      message: 'Reservation not found'
    });
  }

  res.json({
    success: true,
    message: 'Reservation marked as completed',
    data: reservation
  });
});

// @desc    Mark reservation as no-show (Admin/Restaurant Owner)
// @route   PUT /api/reservations/:id/no-show
// @access  Private/Admin
const markNoShow = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const reservation = await Reservation.updateStatus(id, 'no_show');

  if (!reservation) {
    return res.status(404).json({
      success: false,
      message: 'Reservation not found'
    });
  }

  res.json({
    success: true,
    message: 'Reservation marked as no-show',
    data: reservation
  });
});

// @desc    Get restaurant reservations (Admin/Restaurant Owner)
// @route   GET /api/reservations/restaurant/:restaurantId
// @access  Private/Admin
const getRestaurantReservations = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const { status, date } = req.query;

  const filters = {};
  if (status) filters.status = status;
  if (date) filters.date = date;

  const reservations = await Reservation.findByRestaurantId(restaurantId, filters);

  res.json({
    success: true,
    count: reservations.length,
    data: reservations
  });
});

// @desc    Get upcoming reservations
// @route   GET /api/reservations/upcoming
// @access  Private/Admin
const getUpcomingReservations = asyncHandler(async (req, res) => {
  const { limit = 20 } = req.query;

  const reservations = await Reservation.getUpcoming(parseInt(limit));

  res.json({
    success: true,
    count: reservations.length,
    data: reservations
  });
});

module.exports = {
  createReservation,
  getMyReservations,
  getReservation,
  updateReservation,
  cancelReservation,
  confirmReservation,
  completeReservation,
  markNoShow,
  getRestaurantReservations,
  getUpcomingReservations
};
