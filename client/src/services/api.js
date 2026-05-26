import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

/* =========================
   ADMIN APIS
========================= */

// DASHBOARD STATS
export const getAdminStats = async () => {
  const res = await API.get(
    "/orders/admin/stats"
  );

  return res.data.stats;
};

// GET ALL ORDERS
export const getAllOrders = async () => {
  const res = await API.get(
    "/orders/admin/all"
  );

  return res.data.orders;
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (
  id,
  status
) => {
  const res = await API.put(
    `/orders/admin/${id}`,
    { status }
  );

  return res.data;
};

// GET SINGLE ADMIN ORDER
export const getAdminOrderById = async (
  id
) => {
  const res = await API.get(
    `/orders/admin/${id}`
  );

  return res.data.order;
};

export default API;