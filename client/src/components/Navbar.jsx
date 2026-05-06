import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-medium"
      : "text-gray-600 hover:text-indigo-600 transition";

  return (
    <nav className="bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-gray-800">
          Shop<span className="text-indigo-600">Hub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/products" className={navClass}>Products</NavLink>
          <NavLink to="/categories" className={navClass}>Categories</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>

          {token && (
            <NavLink to="/orders" className={navClass}>
              Orders
            </NavLink>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">

          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 shadow-lg">
          <div className="flex flex-col gap-3">

            <NavLink to="/" className="p-3 rounded-lg hover:bg-gray-100">Home</NavLink>
            <NavLink to="/products" className="p-3 rounded-lg hover:bg-gray-100">Products</NavLink>
            <NavLink to="/categories" className="p-3 rounded-lg hover:bg-gray-100">Categories</NavLink>
            <NavLink to="/contact" className="p-3 rounded-lg hover:bg-gray-100">Contact</NavLink>

            {token && (
              <NavLink to="/orders" className="p-3 rounded-lg hover:bg-gray-100">
                Orders
              </NavLink>
            )}

            <div className="border-t pt-3 mt-2 flex flex-col gap-2">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="p-3 border rounded-lg hover:bg-gray-50 text-left"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="p-3 border rounded-lg hover:bg-gray-50">
                    Login
                  </Link>
                  <Link to="/register" className="p-3 bg-indigo-600 text-white rounded-lg text-center">
                    Register
                  </Link>
                </>
              )}

              <Link
                to="/cart"
                className="p-3 bg-indigo-600 text-white rounded-lg text-center"
              >
                Cart ({cartItems.length})
              </Link>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;