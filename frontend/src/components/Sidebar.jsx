// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Package, TrendingUp, 
  ShoppingCart, Store, Moon, Sun, LogOut, Download   
} from "lucide-react";
import useTheme from "../hooks/useTheme";

function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const colors = {
    bgDark: '#0f172a',
    bgCard: '#1e293b',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.1)'
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const styles = {
    sidebar: {
      width: '280px',
      background: `linear-gradient(180deg, ${colors.bgDark} 0%, ${colors.bgCard} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      borderLeft: `1px solid ${colors.border}`,
      boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)'
    },
    logoContainer: {
      padding: '28px 20px 20px 20px',
      borderBottom: `1px solid ${colors.border}`,
      marginBottom: '20px'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: `linear-gradient(135deg, ${colors.accent}, #8b5cf6)`,
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '12px'
    },
    logoText: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: colors.textPrimary,
      letterSpacing: '0.5px'
    },
    nav: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '0 16px'
    },
    link: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '12px',
      textDecoration: 'none',
      color: isActive ? colors.textPrimary : colors.textSecondary,
      background: isActive ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})` : 'transparent',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }),
    footer: {
      padding: '20px 16px',
      borderTop: `1px solid ${colors.border}`,
      marginTop: 'auto'
    },
    button: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 16px',
      borderRadius: '10px',
      background: 'transparent',
      border: 'none',
      color: colors.textSecondary,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '14px',
      marginBottom: '8px'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      marginBottom: '16px'
    },
    userAvatar: {
      width: '40px',
      height: '40px',
      background: `linear-gradient(135deg, #f59e0b, #f97316)`,
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white'
    },
    userName: {
      fontSize: '14px',
      fontWeight: '500',
      color: colors.textPrimary
    },
    userRole: {
      fontSize: '12px',
      color: colors.textSecondary
    },
    version: {
      fontSize: '11px',
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: '12px'
    }
  };

  const menuItems = [
    { path: "/", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/products", name: "Productos", icon: <Package size={20} /> },
    { path: "/purchases", name: "Compras", icon: <TrendingUp size={20} /> },
    { path: "/sales", name: "Ventas", icon: <ShoppingCart size={20} /> },
    { path: "/pos", name: "POS", icon: <Store size={20} /> },
    { path: "/export", name: "Exportar", icon: <Download size={20} /> }
  ];

  return (
    <aside style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <div style={styles.logoIcon}>SP</div>
        <div style={styles.logoText}>SmartPOS</div>
      </div>

      {/* Menú de navegación */}
      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => styles.link(isActive)}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

        {/* Botón de tema */}
        <button
          onClick={toggleTheme}
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.color = colors.textPrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = colors.textSecondary;
          }}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          <span>{theme === "light" ? "Modo oscuro" : "Modo claro"}</span>
        </button>

        {/* Botón de cerrar sesión */}
        <button
          onClick={handleLogout}
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = colors.textSecondary;
          }}
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
        
      {/* Footer con controles */}
      <div style={styles.footer}>
        {/* Información del usuario */}
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>AD</div>
          <div>
            <div style={styles.userName}>Admin User</div>
            <div style={styles.userRole}>Administrador</div>
          </div>
        </div>
        {/* Versión */}
        <div style={styles.version}>
          v1.0.0 • SmartPOS 2026
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;