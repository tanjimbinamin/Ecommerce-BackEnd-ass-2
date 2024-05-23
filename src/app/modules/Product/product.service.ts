import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

// Create Product
const createNewProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);

  return result;
};

// All products
const getAllProductsFromDB = async (searchQuery: unknown) => {
  if (searchQuery) {
    return await ProductModel.find({
      $or: [
        {
          name: { $regex: searchQuery, $options: "i" },
          description: { $regex: searchQuery, $options: "i" },
        },
      ],
    }).exec();
  } else {
    return await ProductModel.find();
  }
};

// Single product
const getSingleProductFromDB = async (id: string) =>
  await ProductModel.findById(id);

// Update a single product
const updateSingleProductIntoDB = async (id: string, updatedInfo: TProduct) => {
  const updatedProduct = await ProductModel.findOneAndUpdate(
    { _id: id },
    { $set: updatedInfo }
  );
  return updatedProduct;
};

// Delete a single product
const deleteSingleProductIntoDB = async (id: string) => {
  const deleteAbleProduct = await ProductModel.deleteOne({ _id: id });
  return deleteAbleProduct;
};

export const productService = {
  createNewProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductIntoDB,
};
