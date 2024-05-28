import Order from '../models/order.model.js';
import Product from '../models/product.model.js'; // Add this line to import the Product model
import crypto from 'crypto';

const hashCardInfo = (cardInfo) => {
  const hash = crypto.createHash('sha256');
  hash.update(cardInfo);
  return hash.digest('hex');
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ userId: req.userId }).populate('products.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    console.log('Received request to create order:', req.body); // Log request body
    const { products, totalAmount, address, city, zipCode, country, cardNumber, expiryDate, cvv } = req.body;
    const hashedCardInfo = hashCardInfo(cardNumber + expiryDate + cvv);

    const newOrder = new Order({
      userId: req.userId,
      products,
      totalAmount,
      cardInfo: hashedCardInfo,
      address,
      city,
      zipCode,
      country
    });

    const savedOrder = await newOrder.save();

    await Product.updateMany(
      { _id: { $in: products.map(p => p.productId) } },
      { $set: { bought: true } }
    );

    console.log('Order created successfully:', savedOrder); // Log success
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Error creating order:', err); // Log error
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.query.userId; // Get user ID from query parameters
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Order.find({ userId }).populate('products.productId');
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
