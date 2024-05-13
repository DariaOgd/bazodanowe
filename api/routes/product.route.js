import express from "express"
import { verifyToken } from "../middleware/jwt.js"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct    } from "../controllers/product.controller.js"
 const router = express.Router()

 router.post("/", verifyToken, createProduct)

 router.delete("/:id", verifyToken, deleteProduct);
router.get("/single/:id", getProduct);
router.get("/", getProducts)
router.put("/:id", verifyToken, updateProduct); // PUT for updates

 export default router