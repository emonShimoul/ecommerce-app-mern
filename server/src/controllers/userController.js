const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};