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


  if (!order) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-4">
        Order Details
      </h2>

      <p className="mb-4 text-gray-500">
        Status: {order.status}
      </p>

      <div className="space-y-3">
        {order.orderItems.map((item) => (
          <div key={item._id} className="flex justify-between border-b pb-2">
            <span>{item.product.title}</span>
            <span>{item.quantity} × ${item.product.price}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-6">
        Total: ${order.totalPrice}
      </h3>

      {order.status === "Pending" && (
        <button
            onClick={cancelOrder}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
            Cancel Order
        </button>
        )}

    </div>
  );
};

export default OrderDetails;