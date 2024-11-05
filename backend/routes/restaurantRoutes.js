import express from 'express';
import { 
    getRestaurants, 
    getRestaurantById, 
    checkAvailability 
} from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/:id/check-availability', checkAvailability);

export default router;
