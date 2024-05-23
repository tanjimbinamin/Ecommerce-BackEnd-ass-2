import { Error } from "mongoose";
import { ProductModel } from "../Product/product.model";
import { productService } from "../Product/product.service";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";


// Create a new order and manage the inventory
const createNewOrderIntoDB = async (order: TOrder) => {
  try {
    const orderedProducts = await productService.getSingleProductFromDB(
      order.productId
    );
    const productsInventory = orderedProducts?.inventory?.quantity;

      if (typeof productsInventory !== 'number') {
        return Promise.reject(new Error("Invalid product inventory"));
      }

      const reduceInventory = productsInventory - order.quantity;

      if (productsInventory > 0 && productsInventory >= order.quantity) {
        // Prepare update data object
        const updateData:any = { "inventory.quantity": reduceInventory };

        // Only set inStock to false if inventory is reduced to zero or less
        if (reduceInventory <= 0) {
          updateData["inventory.inStock"] = false;
        }

        // Update the product inventory and inStock status in one call
        await ProductModel.findOneAndUpdate(
          { _id: order.productId },
          { $set: updateData }
        );

        // Create and return the new order
        const newOrder = await OrderModel.create(order);
        return newOrder;
      } else {
        return Promise.reject(new Error("Check Again"));
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
