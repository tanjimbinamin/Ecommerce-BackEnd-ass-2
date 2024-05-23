import { Request, Response } from "express";
import { TOrder } from "./order.interface";
import { orderService } from "./order.service";
import orderValidationSchema from "./order.validation";

// Create a new order and manage inventory
const createNewOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;
    const zodOrderValidation = orderValidationSchema.parse(orderData);
    const result = await orderService.createNewOrderIntoDB(zodOrderValidation);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Insufficient quantity available in inventory",
      // data: error,
    });
  }
};

// Retrieve all orders
const retriveOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const allOrders = await orderService.retriveAllOrdersFromDB(email);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: allOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order not found",
      data: error,
    });
  }
};

export const orderController = {
  createNewOrder,
  retriveAndSearchOrders: retriveOrders,
};
