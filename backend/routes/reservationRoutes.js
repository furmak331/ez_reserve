import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReservation);
router.get('/my-reservations', protect, getMyReservations);
router.put('/:id', protect, updateReservation);
router.delete('/:id', protect, cancelReservation);

export default router;
