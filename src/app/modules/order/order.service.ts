import { Error } from "mongoose";
import { ProductModel } from "../Product/product.model";
import { productService } from "../Product/product.service";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

// Create a new order and manage the inventory
const createNewOrderIntoDB = async (order: TOrder) => {
  try {
    const orderedProducts = await productService.retriveSingleProductFromDB(
      order.productId
    );
    const productsInventory = orderedProducts?.inventory.quantity as number;
    const reduceInventory = productsInventory - order.quantity;

    if (productsInventory > 0 && productsInventory >= order.quantity) {
      if (productsInventory <= 1 || productsInventory >= order.quantity) {
        await ProductModel.findOneAndUpdate(
          { _id: order.productId },
          { "inventory.inStock": false }
        );
      }
      await ProductModel.findOneAndUpdate(
        { _id: order.productId },
        { "inventory.quantity": reduceInventory }
      );
      const newOrder = await OrderModel.create(order);
      return newOrder;
    } else {
      return Promise.reject(new Error("Condition not met"));
    }
  } catch (err) {
    console.log(err);
  }
};

// Retrieve all orders and search by email from DB
const retriveAllOrdersFromDB = async (emailQuery: unknown) => {
  if (emailQuery) {
    const queryResult = await OrderModel.find({
      email: { $regex: emailQuery, $options: "i" },
    });
    if (Array.isArray(queryResult) && queryResult.length === 0) {
      return Promise.reject(new Error("Something went wrong"));
    } else {
      return queryResult;
    }
  }
  return await OrderModel.find();
};

export const orderService = {
  createNewOrderIntoDB,
  retriveAllOrdersFromDB,
};
