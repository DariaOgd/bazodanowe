import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js'

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
        
            // Find the product to check the userId
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Check if the user is trying to add their own product
      if (product.userId === req.userId) {
        return res.status(403).json({ message: "You cannot add your own product to the cart" });
      }

      // Find the cart for the current user
      let cart = await Cart.findOne({ userId: req.userId });
      if (!cart) {
        // If no cart exists, create a new one
        cart = new Cart({ userId: req.userId, products: [] });
      }
  
      // Find the index of the product in the cart
      const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
      if (productIndex !== -1) {
        // If product exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If product doesn't exist, add it to the cart
        cart.products.push({ productId, quantity });
      }
  
      // Save the updated cart
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } catch (err) {
      console.error('Error adding product to cart:', err); // Log the error for debugging
      next(err);
    }
  };

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => !p.productId.equals(productId));

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $set: { products: [] } },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

//test