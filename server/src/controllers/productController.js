const Product = require("../models/Product");
const uploadImage = require("../utils/uploadImage");
const { successResponse, errorResponse } = require("../utils/response");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, stock } = req.body;

    // ✅ 1. Validation
    if (!title || !price || !stock) {
      return errorResponse(res, "Title, price and stock are required", 400);
    }

    if (!req.file) {
      return errorResponse(res, "Product image is required", 400);
    }

    // ✅ 2. Upload Image
    const result = await uploadImage(req.file.buffer);

    // ✅ 3. Create Product
    const product = await Product.create({
      title,
      price,
      description,
      stock,
      image: result.secure_url,
    });

    // ✅ 4. Standard Response
    return successResponse(res, product, "Product created successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Failed to create product");
  }
};



// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return successResponse(res, products);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};



// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    return successResponse(res, product);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};



// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { title, price, description, stock } = req.body || {};

    product.title = title || product.title;
    product.price = price || product.price;
    product.description = description || product.description;
    product.stock = stock || product.stock;

    // Optional image update
    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      product.image = result.secure_url;
    }

    const updatedProduct = await product.save();

    return successResponse(res, updatedProduct, "Product updated");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};



// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    await product.deleteOne();

    return successResponse(res, null, "Product deleted");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};