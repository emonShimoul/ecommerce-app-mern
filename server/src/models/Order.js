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
    // ORDER STATUS
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    // PAYMENT METHOD
    paymentMethod: {
      type: String,
      enum: ["cod", "stripe", "bkash"],
      required: true,
    },

    // PAYMENT STATUS
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    // EXTRA PAYMENT INFO
    paymentInfo: {
      transactionId: String,
      stripeSessionId: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);