import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/api";

import { getStatusColor }
from "../../utils/orderUtils";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ORDERS
  useEffect(() => {

    const fetchOrders = async () => {
      try {

        const data = await getAllOrders();
        setOrders(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchOrders();

  }, []);

  // UPDATE STATUS
  const handleStatusChange = async (
    id,
    status
  ) => {

    try {

      await updateOrderStatus(id, status);

      // UPDATE UI INSTANTLY
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? {
                ...order,
                status,
              }
            : order
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  // LOADING
  if (loading) {
    return (
      <p className="text-center py-10">
        Loading orders...
      </p>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        All Orders
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-white p-6 rounded-2xl shadow"
          >

            {/* HEADER */}
            <div className="flex flex-wrap justify-between gap-4 mb-6">

              <div>

                <p className="font-semibold">
                  Order #{order._id.slice(-6)}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

              {/* STATUS */}
              <div>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order._id,
                      e.target.value
                    )
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(order.status)}`}
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

            </div>

            {/* CUSTOMER */}
            <div className="mb-6">

              <h2 className="font-semibold mb-2">
                Customer Info
              </h2>

              <p>
                {order.user?.name}
              </p>

              <p className="text-gray-500 text-sm">
                {order.user?.email}
              </p>

              <p className="text-gray-500 text-sm">
                {order.shippingInfo?.phone}
              </p>

            </div>

            {/* PRODUCTS */}
            <div className="space-y-3">

              {order.orderItems.map((item) => (

                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-3"
                >

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        item.product?.images?.[0]?.url
                      }
                      alt=""
                      className="w-14 h-14 rounded-lg object-cover"
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

                  <p className="font-semibold">
                    ৳
                    {item.product?.price *
                      item.quantity}
                  </p>

                </div>

              ))}

            </div>

            {/* FOOTER */}
            <div className="flex flex-wrap justify-between items-center mt-6 gap-4">

              <div>

                <p className="text-sm">
                  Payment Method:
                  {" "}
                  <span className="font-medium">
                    {order.paymentMethod}
                  </span>
                </p>

                <p className="text-sm">
                  Payment Status:
                  {" "}
                  <span className="font-medium">
                    {order.paymentStatus}
                  </span>
                </p>

              </div>

              <p className="text-xl font-bold text-indigo-600">
                ৳ {order.totalPrice}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminOrders;