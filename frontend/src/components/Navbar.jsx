// src/components/Navbar.jsx (opcional - si lo usas en el sidebar)
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, TrendingUp, Store } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/products", name: "Productos", icon: <Package size={18} /> },
    { path: "/purchases", name: "Compras", icon: <TrendingUp size={18} /> },
    { path: "/sales", name: "Ventas", icon: <ShoppingCart size={18} /> },
    { path: "/pos", name: "POS", icon: <Store size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex flex-col gap-2">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive(item.path)
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
