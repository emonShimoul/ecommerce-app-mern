const Product = require("../models/Product");

// create product (admin)
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, image, stock } = req.body;

    const product = await Product.create({
      title,
      price,
      description,
      image,
      stock,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};