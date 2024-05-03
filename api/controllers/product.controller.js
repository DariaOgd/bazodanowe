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
        return next(createError(403, "You can delete only your gig!"));
  
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).send("Gig has been deleted!");
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