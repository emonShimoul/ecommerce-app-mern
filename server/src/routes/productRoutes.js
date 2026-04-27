const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", protect, admin, createProduct);
router.get("/", getProducts);

module.exports = router;