const express = require('express');
const {
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
} = require('../controllers/reservationController.js');
const { protect, restrictTo } = require('../middleware/auth.js');

const router = express.Router();

// Protected routes (require authentication)
router.post('/', protect, createReservation);
router.get('/my-reservations', protect, getMyReservations);
router.get('/upcoming', protect, restrictTo('admin'), getUpcomingReservations);
router.get('/restaurant/:restaurantId', protect, restrictTo('admin'), getRestaurantReservations);
router.get('/:id', protect, getReservation);
router.put('/:id', protect, updateReservation);
router.put('/:id/cancel', protect, cancelReservation);

// Admin only routes
router.put('/:id/confirm', protect, restrictTo('admin'), confirmReservation);
router.put('/:id/complete', protect, restrictTo('admin'), completeReservation);
router.put('/:id/no-show', protect, restrictTo('admin'), markNoShow);

module.exports = router;
