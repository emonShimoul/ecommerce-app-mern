const Product = require("../models/Product");
const uploadImage = require("../utils/uploadImage");
const cloudinary = require("../config/cloudinary");
const { successResponse, errorResponse } = require("../utils/response");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, stock } = req.body;

    if (!title || !price || !stock) {
      return errorResponse(res, "Required fields missing", 400);
    }

    if (!req.files || req.files.length === 0) {
      return errorResponse(res, "At least one image required", 400);
    }

    // Upload multiple images
    const uploadedImages = [];

    for (let file of req.files) {
      const result = await uploadImage(file.buffer);

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,   // need to remove image from cloudinary when delete or update a product
      });
    }

    const product = await Product.create({
      title,
      price,
      description,
      stock,
      images: uploadedImages,
    });

    return successResponse(res, product, "Product created");
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
    
    // 🔥 If new images uploaded
    if (req.files && req.files.length > 0) {
      const cloudinary = require("../config/cloudinary");

      // ❗ Delete old images
      for (let img of product.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      // Upload new images
      const newImages = [];

      for (let file of req.files) {
        const result = await uploadImage(file.buffer);

        newImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

      product.images = newImages;
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

    // 🔥 Delete all images
    for (let img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();

    return successResponse(res, null, "Product deleted");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};