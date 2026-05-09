const express = require("express");
const router = express.Router();

const {
  createStripeSession,
} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");

router.post(
  "/create-stripe-session",
  protect,
  createStripeSession
);

module.exports = router;