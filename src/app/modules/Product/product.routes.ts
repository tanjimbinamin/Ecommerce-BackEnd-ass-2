import express from "express";
import { productsController } from "./product.controller";

const router = express.Router();

// Create new product
router.post("/", productsController.createProduct);

// all products
router.get("/", productsController.searchProduct);

// Retrieve a product
router.get("/:productId", productsController.retriveSingleProduct);

// Update product
router.put("/:productId", productsController.updateSingelProduct);

// Delete product
router.delete("/:productId", productsController.deleteProduct);

export const productsRoute = router;
