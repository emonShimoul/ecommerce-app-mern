const Product = require("../models/Product");
const uploadImage = require("../utils/uploadImage");
const cloudinary = require("../config/cloudinary");
const { successResponse, errorResponse } = require("../utils/response");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, stock, featured, discountPrice } = req.body;

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
      featured: featured || false,
      discountPrice: discountPrice || null,
    });

    return successResponse(res, product, "Product created");
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Failed to create product");
  }
};

// GET ALL PRODUCTS (WITH FILTERS + SEARCH + PAGINATION)
exports.getProducts = async (req, res) => {
  try {
    const { featured, discount, search, page = 1, limit = 12 } = req.query;

    const query = {};

    // Featured filter
    if (featured === "true") {
      query.featured = true;
    }

    // Discount filter
    if (discount === "true") {
      query.discountPrice = { $exists: true };
    }

    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    return successResponse(res, {
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });

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
    const { title, price, description, stock, featured, discountPrice } = req.body || {};

    if (title !== undefined) product.title = title;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (stock !== undefined) product.stock = stock;
    if (featured !== undefined) product.featured = featured;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    
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