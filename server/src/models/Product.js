const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    image: {
      url: String,
      public_id: String,  // need to remove image from cloudinary when delete or update a product
    },
    stock: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);