import { useEffect, useState } from "react";
import api from "../api/api";
import { 
  Minus, Plus, Trash2, 
  ShoppingCart, Package, 
  CreditCard, Search,
  XCircle
} from "lucide-react";

function POS() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("products/");
      setProducts(res.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + (Number(item.sale_price) * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      for (const item of cart) {
        await api.post("sales/", {
          product: item.id,
          quantity: item.quantity,
          sale_price: item.sale_price
        });
      }
      alert("✅ Venta realizada exitosamente");
      setCart([]);
    } catch (error) {
      alert("❌ Error al procesar la venta");
    } finally {
      setLoading(false);
    }
  };

  // Colores de la paleta del sidebar
  const colors = {
    bgDark: '#0f172a',
    bgCard: '#1e293b',
    bgHover: '#2d3a4f',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    border: 'rgba(255, 255, 255, 0.1)'
  };

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    titleIcon: {
      background: `linear-gradient(135deg, ${colors.accent}, ${colors.success})`,
      padding: '10px',
      borderRadius: '12px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: colors.textPrimary,
      margin: 0
    },
    statsBadge: {
      background: colors.bgCard,
      padding: '8px 16px',
      borderRadius: '20px',
      border: `1px solid ${colors.border}`,
      color: colors.textSecondary,
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px'
    },
    productsSection: {
      background: colors.bgCard,
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    searchBar: {
      marginBottom: '20px',
      position: 'relative'
    },
    searchInput: {
      width: '100%',
      padding: '12px 16px 12px 40px',
      background: colors.bgDark,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      fontSize: '14px',
      color: colors.textPrimary,
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: colors.textSecondary
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px',
      maxHeight: '600px',
      overflowY: 'auto',
      paddingRight: '8px'
    },
    productCard: {
      background: colors.bgDark,
      padding: '16px',
      borderRadius: '12px',
      border: `1px solid ${colors.border}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    productName: {
      color: colors.textPrimary,
      fontWeight: '600',
      marginBottom: '8px',
      fontSize: '15px'
    },
    productPrice: {
      color: colors.accent,
      fontWeight: 'bold',
      fontSize: '18px',
      marginBottom: '4px'
    },
    productStock: {
      color: colors.textSecondary,
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    stockBadge: (stock) => ({
      color: stock > 5 ? colors.success : colors.danger,
      fontWeight: '500'
    }),
    cartSection: {
      background: colors.bgCard,
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      height: 'fit-content',
      position: 'sticky',
      top: '20px'
    },
    cartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    cartTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: colors.textPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    clearButton: {
      background: 'transparent',
      border: `1px solid ${colors.border}`,
      padding: '6px 12px',
      borderRadius: '8px',
      color: colors.textSecondary,
      fontSize: '12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'all 0.2s ease'
    },
    cartItems: {
      maxHeight: '400px',
      overflowY: 'auto',
      marginBottom: '16px'
    },
    cartItem: {
      background: colors.bgDark,
      padding: '12px',
      borderRadius: '12px',
      marginBottom: '8px',
      border: `1px solid ${colors.border}`
    },
    cartItemRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    cartItemName: {
      color: colors.textPrimary,
      fontWeight: '500',
      fontSize: '14px'
    },
    cartItemPrice: {
      color: colors.accent,
      fontSize: '14px',
      fontWeight: '600'
    },
    cartItemDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '8px'
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    quantityButton: {
      background: colors.bgCard,
      border: `1px solid ${colors.border}`,
      padding: '4px 8px',
      borderRadius: '6px',
      color: colors.textPrimary,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    quantity: {
      color: colors.textPrimary,
      fontSize: '14px',
      minWidth: '30px',
      textAlign: 'center'
    },
    removeButton: {
      background: 'transparent',
      border: 'none',
      padding: '4px',
      borderRadius: '6px',
      color: colors.danger,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    cartFooter: {
      borderTop: `1px solid ${colors.border}`,
      paddingTop: '16px'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      color: colors.textSecondary,
      fontSize: '14px'
    },
    total: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '16px 0',
      padding: '12px',
      background: colors.bgDark,
      borderRadius: '12px'
    },
    totalLabel: {
      color: colors.textSecondary,
      fontSize: '16px'
    },
    totalValue: {
      color: colors.accent,
      fontSize: '24px',
      fontWeight: 'bold'
    },
    checkoutButton: {
      width: '100%',
      background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
      color: 'white',
      padding: '16px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      boxShadow: `0 4px 12px ${colors.success}40`,
      transition: 'all 0.3s ease'
    },
    emptyCart: {
      textAlign: 'center',
      padding: '48px 20px',
      color: colors.textSecondary,
      border: `1px dashed ${colors.border}`,
      borderRadius: '12px'
    },
    emptyIcon: {
      opacity: 0.3,
      marginBottom: '12px'
    }
  };

  // Efectos hover
  const handleSearchHover = (e) => {
    e.target.style.borderColor = colors.accent;
    e.target.style.boxShadow = `0 0 0 3px ${colors.accent}20`;
  };

  const handleSearchLeave = (e) => {
    e.target.style.borderColor = colors.border;
    e.target.style.boxShadow = 'none';
  };

  const handleProductHover = (e) => {
    e.currentTarget.style.background = colors.bgHover;
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleProductLeave = (e) => {
    e.currentTarget.style.background = colors.bgDark;
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const handleCheckoutHover = (e) => {
    if (!loading) {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = `0 8px 20px ${colors.success}60`;
    }
  };

  const handleCheckoutLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = `0 4px 12px ${colors.success}40`;
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <div style={styles.titleIcon}>
            <CreditCard size={24} />
          </div>
          <h1 style={styles.title}>Punto de Venta (POS)</h1>
        </div>
        <div style={styles.statsBadge}>
          <ShoppingCart size={16} />
          <span>{totalItems} artículos en carrito</span>
        </div>
      </div>

      {/* Grid principal */}
      <div style={styles.grid}>
        {/* Sección de productos */}
        <div style={styles.productsSection}>
          <div style={styles.sectionTitle}>
            <Package size={20} color={colors.accent} />
            Productos Disponibles
          </div>

          {/* Barra de búsqueda */}
          <div style={styles.searchBar}>
            <Search size={18} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              onMouseEnter={handleSearchHover}
              onMouseLeave={handleSearchLeave}
            />
          </div>

          {/* Grid de productos */}
          <div style={styles.productsGrid}>
            {filteredProducts.map(p => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                style={styles.productCard}
                onMouseEnter={handleProductHover}
                onMouseLeave={handleProductLeave}
              >
                <div style={styles.productName}>{p.name}</div>
                <div style={styles.productPrice}>
                  ${p.sale_price?.toLocaleString()}
                </div>
                <div style={styles.productStock}>
                  Stock: <span style={styles.stockBadge(p.stock)}>{p.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección del carrito */}
        <div style={styles.cartSection}>
          <div style={styles.cartHeader}>
            <div style={styles.cartTitle}>
              <ShoppingCart size={20} color={colors.accent} />
              Carrito de Compras
            </div>
            {cart.length > 0 && (
              <button
                style={styles.clearButton}
                onClick={clearCart}
                onMouseEnter={(e) => {
                  e.target.style.background = colors.bgHover;
                  e.target.style.color = colors.danger;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = colors.textSecondary;
                }}
              >
                <XCircle size={14} />
                Limpiar
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <ShoppingCart size={48} style={styles.emptyIcon} />
              <p>Carrito vacío</p>
              <p style={{ fontSize: '12px', marginTop: '8px' }}>
                Agrega productos para comenzar
              </p>
            </div>
          ) : (
            <>
              {/* Items del carrito */}
              <div style={styles.cartItems}>
                {cart.map((item, i) => (
                  <div key={i} style={styles.cartItem}>
                    <div style={styles.cartItemRow}>
                      <span style={styles.cartItemName}>{item.name}</span>
                      <span style={styles.cartItemPrice}>
                        ${(item.sale_price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                    <div style={styles.cartItemDetails}>
                      <div style={styles.quantityControls}>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={styles.quantityButton}
                          onMouseEnter={(e) => e.target.style.background = colors.bgHover}
                          onMouseLeave={(e) => e.target.style.background = colors.bgCard}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={styles.quantity}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={styles.quantityButton}
                          onMouseEnter={(e) => e.target.style.background = colors.bgHover}
                          onMouseLeave={(e) => e.target.style.background = colors.bgCard}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={styles.removeButton}
                        onMouseEnter={(e) => e.target.style.background = `${colors.danger}20`}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer del carrito */}
              <div style={styles.cartFooter}>
                <div style={styles.totalRow}>
                  <span>Subtotal:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div style={styles.totalRow}>
                  <span>IVA (19%):</span>
                  <span>${(total * 0.19).toLocaleString()}</span>
                </div>
                <div style={styles.total}>
                  <span style={styles.totalLabel}>Total:</span>
                  <span style={styles.totalValue}>
                    ${(total * 1.19).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  style={{
                    ...styles.checkoutButton,
                    ...(loading ? { opacity: 0.5, cursor: 'not-allowed' } : {})
                  }}
                  onMouseEnter={handleCheckoutHover}
                  onMouseLeave={handleCheckoutLeave}
                  disabled={loading}
                >
                  <CreditCard size={20} />
                  {loading ? "Procesando..." : "Cobrar"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default POS;