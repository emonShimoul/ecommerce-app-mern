import { useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../hooks/useCart";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        products: cartItems.map((item) => ({
          productId: item._id,
          qty: item.qty,
        })),
        totalPrice: total,
        shippingInfo: form,
      };

      await API.post("/orders", orderData);

      alert("Order placed successfully!");

      // clear cart
      clearCart();
      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">

        {/* FORM */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full mb-3 border p-2 rounded"
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full mb-3 border p-2 rounded"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full mb-3 border p-2 rounded"
          />

          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Placing..." : "Place Order"}
          </button>
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span>{item.title} x {item.qty}</span>
              <span>${item.price * item.qty}</span>
            </div>
          ))}

          <hr className="my-4" />

          <h3 className="text-lg font-bold">
            Total: ${total.toFixed(2)}
          </h3>
        </div>

      </div>
    </div>
  );
};

export default Checkout;