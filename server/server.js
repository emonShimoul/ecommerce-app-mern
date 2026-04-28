const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const connectDB = require("./src/config/db");
const protect = require("./src/middleware/authMiddleware");
const cartRoutes = require("./src/routes/cartRoutes");

dotenv.config(); // 1. Load env first

connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You are logged in",
    user: req.user,
  });
});

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});