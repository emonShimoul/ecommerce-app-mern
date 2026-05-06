import { Link } from "react-router-dom";
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

        <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm">

                  <div className="flex items-center gap-4">
                    <img
                      src={item.images?.[0]?.url || item.image}
                      alt=""
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      <p className="text-indigo-600 font-semibold">${item.price}</p>
                    </div>
                  </div>

                  <input
                    type="number"
                    value={item.qty}
                    min={1}
                    onChange={(e) => updateQty(item._id, e.target.value)}
                    className="w-20 border rounded-lg px-2 py-1 mt-3 sm:mt-0"
                  />

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 mt-3 sm:mt-0"
                  >
                    Remove
                  </button>

                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <h2 className="text-xl font-semibold">
                Total: ${total.toFixed(2)}
              </h2>

              <Link
                to="/checkout"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
              >
                Checkout
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Cart;