const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");


// create product (admin)
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, stock } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "products" },
        async (error, result) => {
          if (error) {
              console.log(error);
            return res.status(500).json({ message: "Upload failed" });
          }

          imageUrl = result.secure_url;

          if (!title || !price) {
            return res.status(400).json({ message: "Missing fields" });
          }

          const product = await Product.create({
            title,
            price,
            description,
            image: imageUrl,
            stock,
          });

          res.json(product);
        }
      );

      result.end(req.file.buffer);
    } else {
      const product = await Product.create({
        title,
        price,
        description,
        image: "",
        stock,
      });

      res.json(product);
    }
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

// get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { title, price, description, image, stock } = req.body;

    product.title = title || product.title;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.stock = stock || product.stock;

    const updated = await product.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};