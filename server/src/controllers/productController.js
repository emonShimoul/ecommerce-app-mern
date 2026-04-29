const Product = require("../models/Product");
const uploadImage = require("../utils/uploadImage");
const cloudinary = require("../config/cloudinary");
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
      image: {
        url: result.secure_url,
        public_id: result.public_id, // need to remove image from cloudinary when delete or update a product
      },
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

    if (title !== undefined) product.title = title;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (stock !== undefined) product.stock = stock;

    // Optional image update
    if (req.file) {
      // delete old image
      if (product.image?.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      // upload new image
      const result = await uploadImage(req.file.buffer);

      product.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
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

    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.deleteOne();

    return successResponse(res, null, "Product deleted");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};