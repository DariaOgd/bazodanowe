import express from 'express';
import { getOrder, createOrder, updateOrderStatus, deleteOrder } from '../controllers/order.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.get('/', verifyToken, getOrder);
router.post('/create', verifyToken, createOrder);
router.post('/update-status', verifyToken, updateOrderStatus);
router.post('/delete', verifyToken, deleteOrder);

export default router;
