import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await API.get(`/orders/${id}`);
      setOrder(res.data);
    };
    fetchOrder();
  }, [id]);

  const cancelOrder = async () => {
    await API.put(`/orders/${id}/cancel`);
    window.location.reload();
  };

  if (!order) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <h2 className="text-3xl font-semibold mb-6">Order Details</h2>

        <p className="mb-6 text-gray-500">
          Status: <span className="font-medium text-gray-800">{order.status}</span>
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {order.orderItems.map((item) => (
            <div key={item._id} className="flex justify-between border-b py-3">
              <span>{item.product.title}</span>
              <span>{item.quantity} × ${item.product.price}</span>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-semibold text-indigo-600">
              Total: ${order.totalPrice}
            </h3>
          </div>
        </div>

        {order.status === "Pending" && (
          <button
            onClick={cancelOrder}
            className="mt-6 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Cancel Order
          </button>
        )}

      </div>
    </div>
  );
};

export default OrderDetails;