const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// ADMIN
router.get(
  "/admin/all",
  protect,
  adminMiddleware,
  getAllOrders
);
router.put(
  "/admin/:id",
  protect,
  adminMiddleware,
  updateOrderStatus
);


router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;