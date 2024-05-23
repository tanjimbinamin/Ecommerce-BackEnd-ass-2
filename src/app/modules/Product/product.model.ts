import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

// variants schema
const variantsSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
  },
});

// Inventory schema
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
    trim: true,
  },
  inStock: {
    type: Boolean,
    required: true,
    trim: true,
  },
});

// Product schema
const productShcema = new Schema<TProduct>({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    required: true,
    trim: true,
  },
  variants: {
    type: [variantsSchema],
    required: true,
    trim: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
    trim: true,
  },
});

// Model
export const ProductModel = model<TProduct>("Product", productShcema);
