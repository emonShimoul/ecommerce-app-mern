const User = require("../models/User");

// add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.user._id);

    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get cart
exports.getCart = async (req, res) => {
  try {
    // .populate() 👉 Replaces productId with full product data
    // req.user._id 👉 Comes from auth middleware
    const user = await User.findById(req.user._id).populate("cart.productId");

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};