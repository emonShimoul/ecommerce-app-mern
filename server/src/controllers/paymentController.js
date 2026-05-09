const stripe = require("../config/stripe");

exports.createStripeSession = async (req, res) => {
  try {

    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "No products found",
      });
    }

    // STRIPE LINE ITEMS
    const line_items = products.map((item) => ({
      price_data: {
        currency: "usd",

        product_data: {
          name: item.title,
        },

        unit_amount: Math.round(item.price * 100),
      },

      quantity: item.qty,
    }));

    // CREATE STRIPE SESSION
    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      line_items,

      mode: "payment",

      success_url: "http://localhost:5173/payment-success",

      cancel_url: "http://localhost:5173/checkout",
    });

    res.json({
      url: session.url,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};