const Order = require("../models/Order");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  try {
    const { products, totalPrice, shippingInfo } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    const orderItems = products.map((item) => ({
      product: item.productId,
      quantity: item.qty,
    }));

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
      shippingInfo, // optional (add to model if needed)
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product"
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};