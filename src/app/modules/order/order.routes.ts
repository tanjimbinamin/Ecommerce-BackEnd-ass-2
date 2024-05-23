import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

// Create a new order and manage inventory
router.post("/", orderController.createNewOrder);

// Retrive all orders and search a specific order 
router.get("/", orderController.retriveAndSearchOrders);

export const orderRoute = router;
