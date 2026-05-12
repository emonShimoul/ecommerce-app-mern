import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-5">
        <h2 className="text-2xl font-bold mb-8">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">
          <Link to="/admin">
            Dashboard
          </Link>

          <Link to="/admin/orders">
            Orders
          </Link>

          <Link to="/admin/products">
            Products
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;