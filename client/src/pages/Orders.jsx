import { useEffect, useState } from "react";
import API from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/my");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
        case "Pending":
        return "bg-yellow-100 text-yellow-700";
        case "Processing":
        return "bg-blue-100 text-blue-700";
        case "Shipped":
        return "bg-indigo-100 text-indigo-700";
        case "Delivered":
        return "bg-green-100 text-green-700";
        case "Cancelled":
        return "bg-red-100 text-red-700";
        default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-xl shadow"
          >
            {/* Order Info */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">
                Order ID: {order._id.slice(-6)}
              </p>
              <span
                className={`px-3 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}
              >
                {order.status}
              </span>

              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Products */}
            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product?.images?.[0]?.url}
                      alt=""
                      className="w-14 h-14 object-cover rounded"
                    />

                    <div>
                      <p className="font-medium">
                        {item.product?.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-gray-700">
                    ${item.product?.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="text-right mt-4">
              <p className="text-lg font-bold text-blue-600">
                Total: ${order.totalPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;