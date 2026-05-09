import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { useCart } from "../hooks/useCart";

const PaymentSuccess = () => {

  const navigate = useNavigate();

  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const createOrder = async () => {

      try {

        // GET SAVED ORDER
        const pendingOrder = JSON.parse(
          localStorage.getItem("pendingOrder")
        );

        if (!pendingOrder) {
          navigate("/");
          return;
        }

        // CREATE ORDER
        await API.post("/orders", pendingOrder);

        // CLEAR CART
        clearCart();

        // REMOVE TEMP DATA
        localStorage.removeItem("pendingOrder");

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    createOrder();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Processing Payment...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-20 rounded-2xl shadow-sm text-center max-w-md">

        <div className="text-5xl mb-4">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful
        </h1>

        <p className="mt-3 text-gray-600">
          Your order has been placed successfully.
        </p>

        <button
          onClick={() => navigate("/orders")}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          View Orders
        </button>

      </div>
    </div>
  );
};

export default PaymentSuccess;