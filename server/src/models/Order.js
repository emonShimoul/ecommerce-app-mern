const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    totalPrice: Number,
    shippingInfo: {
      name: String,
      address: String,
      phone: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);