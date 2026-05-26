import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { getStatusColor } from "../utils/orderUtils";

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

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case "Pending": return "bg-yellow-100 text-yellow-700";
  //     case "Processing": return "bg-blue-100 text-blue-700";
  //     case "Shipped": return "bg-indigo-100 text-indigo-700";
  //     case "Delivered": return "bg-green-100 text-green-700";
  //     case "Cancelled": return "bg-red-100 text-red-700";
  //     default: return "bg-gray-100 text-gray-700";
  //   }
  // };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!orders.length) return <p className="text-center py-20">No orders yet.</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">

        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          My Orders
        </h2>

        <div className="space-y-6">
          {orders.map((order) => (
            <Link key={order._id} to={`/orders/${order._id}`}>
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition mt-8">

                {/* Header */}
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                  <p className="text-sm text-gray-500">
                    Order #{order._id.slice(-6)}
                  </p>

                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>

                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product?.images?.[0]?.url}
                          alt=""
                          className="w-14 h-14 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
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
                  <p className="text-lg font-semibold text-indigo-600">
                    Total: ${order.totalPrice}
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;