import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../hooks/useCart";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      if (hasRun.current) return;  // If already executed → stop
      hasRun.current = true;  // Otherwise → mark as executed

      try {
        const pendingOrder = JSON.parse(
          localStorage.getItem("pendingOrder")
        );
        if (!pendingOrder) {
          navigate("/");
          return;
        }
        const res = await API.post("/orders", pendingOrder);
        setOrder(res.data);
        clearCart();
        localStorage.removeItem("pendingOrder");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    createOrder();
  }, [clearCart, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Processing your payment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center">
          <div className="text-5xl mb-3">🎉</div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Payment Successful
          </h1>
          <p className="mt-2 text-green-100 text-sm md:text-base">
            Your order has been placed successfully
          </p>
        </div>
        {/* BODY */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Order Info */}
          <div className="bg-gray-50 rounded-xl p-4 md:p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Order Summary
            </h2>
            {order?.orderItems?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-2 border-b last:border-b-0"
              >
                <div className="text-sm text-gray-700">
                  {item.product?.title}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {item.quantity} × ${item.product?.price}
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>${order?.totalPrice}</span>
            </div>
          </div>
          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="w-full sm:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-medium transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;