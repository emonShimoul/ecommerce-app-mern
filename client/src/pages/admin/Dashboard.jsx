import { useEffect, useState } from "react";
import { getAdminStats } from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <p className="text-center py-10">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* TOTAL ORDERS */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 text-sm">
            Total Orders
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.totalOrders}
          </p>
        </div>

        {/* TOTAL USERS */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 text-sm">
            Total Users
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.totalUsers}
          </p>
        </div>

        {/* TOTAL PRODUCTS */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 text-sm">
            Total Products
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.totalProducts}
          </p>
        </div>

        {/* TOTAL SALES */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 text-sm">
            Total Sales
          </h2>

          <p className="text-3xl font-bold mt-2 text-green-600">
            ৳ {stats.totalSales}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;