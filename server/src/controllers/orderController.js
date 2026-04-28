const Order = require("../models/Order");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id).populate("cart.productId");

    if (!user.cart.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // create order items
    const orderItems = user.cart.map((item) => ({
      product: item.productId._id,
      quantity: item.quantity,
    }));

    // calculate total price
    const totalPrice = user.cart.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
    });

    // clear cart after order
    user.cart = [];
    await user.save();

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