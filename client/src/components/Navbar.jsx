import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-blue-600 font-semibold"
    : "text-gray-600 hover:text-blue-600 transition";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Shop<span className="text-blue-600">Hub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/products" className={navLinkClass}>Products</NavLink>
          <NavLink to="/categories" className={navLinkClass}>Categories</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
          <button
            onClick={handleLogout}
            className="px-4 py-1 border rounded-md hover:bg-gray-100"
          >
            Logout
          </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border rounded-md hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 border rounded-md hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          )}

          <Link to="/cart" className="relative px-4 py-1 bg-blue-600 text-white rounded-md">
            Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                  {cartItems.length}
                </span>
              )}
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 shadow-lg">
          <div className="flex flex-col gap-2">

            <NavLink
              to="/"
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </NavLink>

            <NavLink
              to="/categories"
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </NavLink>

            <NavLink
              to="/contact"
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>

            <div className="border-t pt-3 mt-2 flex flex-col gap-2">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 rounded-lg border text-left hover:bg-gray-50"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-lg border hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="block px-4 py-3 rounded-lg border hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}

              <Link
                to="/cart"
                className="block px-4 py-3 rounded-lg bg-blue-600 text-white text-center"
                onClick={() => setMenuOpen(false)}
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