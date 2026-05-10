const Order = require("../models/Order");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  try {
    const {
      products,
      totalPrice,
      shippingInfo,
      paymentMethod,
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        message: "Payment method required",
      });
    }

    const orderItems = products.map((item) => ({
      product: item.productId,
      quantity: item.qty,
    }));

    // DEFAULT PAYMENT STATUS
    let paymentStatus = "pending";

    // COD stays pending
    if (paymentMethod === "cod") {
      paymentStatus = "pending";
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
      shippingInfo,
      paymentMethod,
      paymentStatus,
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

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "orderItems.product"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // security: only owner
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Not found" });

  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  if (order.status !== "Pending") {
    return res.status(400).json({ message: "Cannot cancel" });
  }

  order.status = "Cancelled";
  await order.save();

  res.json(order);
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};