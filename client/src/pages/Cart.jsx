
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images?.[0]?.url || item.image}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>${item.price}</p>
                  </div>
                </div>

                <input
                  type="number"
                  value={item.qty}
                  min={1}
                  onChange={(e) =>
                    updateQty(item._id, e.target.value)
                  }
                  className="w-16 border px-2 py-1 rounded"
                />

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex justify-between">
              <h2 className="text-xl font-bold mt-6">
                Total: ${total.toFixed(2)}
              </h2>

              <Link
                to="/checkout"
                className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;