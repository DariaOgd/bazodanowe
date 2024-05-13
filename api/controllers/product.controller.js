import createError from "../utils/createError.js";
import Product from "../models/product.model.js";

export const createProduct = async (req, res, next) => {
    const newProduct = new Product({
        userId: req.userId,
        ...req.body
    });

    try {
        const savedProduct = await newProduct.save();
        console.log("dodano produkt")
        res.status(201).json(savedProduct);
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product.userId !== req.userId)
        return next(createError(403, "You can delete only your product!"));
  
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).send("Product has been deleted!");
    } catch (err) {
      next(err);
    }
  };
  export const getProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) next(createError(404, "Product not found!"));
      res.status(200).send(product);
    } catch (err) {
      next(err);
    }
  };
  export const getProducts = async (req, res, next) => {
    const q = req.query;
    const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.cat && { category: q.category }),
      ...((q.min || q.max) && {
        price: {
          ...(q.min && { $gt: q.min }),
          ...(q.max && { $lt: q.max }),
        },
      }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    try {
      const products = await Product.find(filters).sort({ [q.sort]: -1 });
      res.status(200).send(products);
    } catch (err) {
      next(err);
    }
  };


  export const updateProduct = async (req, res, next) => {
    const productId = req.params.id;  // Get the product ID from the request URL
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return next(createError(404, "Product not found!"));
      }
  
      // Update product data with request body (excluding sensitive fields)
      const allowedUpdates = ["title", "description", "price", "category", /* other allowed fields */];
      const updates = Object.keys(req.body).reduce((acc, key) => {
        if (allowedUpdates.includes(key)) {
          acc[key] = req.body[key];
        }
        return acc;
      }, {});
  
      const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });  // Update and return new product
      res.status(200).json(updatedProduct);
    } catch (err) {
      next(err);
    }
  };
  

