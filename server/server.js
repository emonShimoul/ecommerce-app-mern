const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const connectDB = require("./src/config/db");

dotenv.config(); // 1. Load env first

connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);


// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});