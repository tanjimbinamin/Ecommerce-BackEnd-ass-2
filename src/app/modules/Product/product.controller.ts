import { Request, Response } from "express";
import { TProduct } from "./product.interface";
import { productService } from "./product.service";
import ProductValidationSchema from "./product.validation";

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: TProduct = req.body;
    

    const zodValidationParse = ProductValidationSchema.parse(newProduct);

    const results = await productService.createNewProductIntoDB(zodValidationParse);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: results
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

// all products
const searchProduct = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.searchTerm;
    const retrivedProducts =
      await productService.getAllProductsFromDB(searchQuery);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: retrivedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

// Single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const singleProudct =
      await productService.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: singleProudct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

// Update product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedInfo = req.body;

    const zodValidationForUpdate = ProductValidationSchema.parse(updatedInfo);
    const updateProduct = await productService.updateSingleProductIntoDB(
      productId,
      zodValidationForUpdate
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

// Delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await productService.deleteSingleProductIntoDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

export const productsController = {
  createProduct,
  searchProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct,
};
