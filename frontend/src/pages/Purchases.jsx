// src/pages/Purchases.jsx
import { useEffect, useState } from "react";
import api from "../api/api";
import { ShoppingBag, Package, Plus, AlertCircle } from "lucide-react";

function Purchases() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("purchases/", {
        product_name: productName,
        quantity: quantity,
        purchase_price: price
      });

      alert("✅ Compra registrada exitosamente");
      setProductName("");
      setQuantity("");
      setPrice("");
      
      // Recargar productos para actualizar la lista
      loadProducts();
    } catch (error) {
      console.error("Error registrando compra:", error);
      alert("❌ Error al registrar la compra");
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
    border: 'rgba(255, 255, 255, 0.1)'
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px'
    },
    header: {
      gridColumn: 'span 2',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    titleIcon: {
      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
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
    statsCard: {
      background: colors.bgCard,
      padding: '20px',
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    statsIcon: {
      background: 'rgba(16, 185, 129, 0.1)',
      padding: '10px',
      borderRadius: '12px',
      color: colors.success
    },
    statsInfo: {
      flex: 1
    },
    statsLabel: {
      color: colors.textSecondary,
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '4px'
    },
    statsValue: {
      color: colors.textPrimary,
      fontSize: '20px',
      fontWeight: 'bold'
    },
    formContainer: {
      background: colors.bgCard,
      padding: '28px',
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },
    formTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      color: colors.textSecondary,
      fontSize: '13px',
      fontWeight: '500',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      background: colors.bgDark,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      fontSize: '14px',
      color: colors.textPrimary,
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    inputGroup: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    inputIcon: {
      position: 'absolute',
      right: '12px',
      color: colors.textSecondary
    },
    button: {
      width: '100%',
      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
      color: 'white',
      padding: '14px 24px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      boxShadow: `0 4px 12px ${colors.accent}40`,
      transition: 'all 0.3s ease',
      marginTop: '8px'
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    previewCard: {
      background: colors.bgCard,
      padding: '28px',
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },
    previewTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    previewItem: {
      background: colors.bgDark,
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '12px',
      border: `1px solid ${colors.border}`
    },
    previewRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px'
    },
    previewLabel: {
      color: colors.textSecondary,
      fontSize: '13px'
    },
    previewValue: {
      color: colors.textPrimary,
      fontWeight: '500'
    },
    emptyPreview: {
      textAlign: 'center',
      padding: '32px',
      color: colors.textSecondary,
      border: `1px dashed ${colors.border}`,
      borderRadius: '12px'
    }
  };

  // Efectos hover
  const handleInputHover = (e) => {
    e.target.style.borderColor = colors.accent;
    e.target.style.boxShadow = `0 0 0 3px ${colors.accent}20`;
  };

  const handleInputLeave = (e) => {
    e.target.style.borderColor = colors.border;
    e.target.style.boxShadow = 'none';
  };

  const handleButtonHover = (e) => {
    if (!loading) {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = `0 8px 20px ${colors.accent}60`;
    }
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = `0 4px 12px ${colors.accent}40`;
  };

  const total = (price || 0) * (quantity || 0);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <div style={styles.titleIcon}>
            <ShoppingBag size={24} />
          </div>
          <h1 style={styles.title}>Registrar Compra</h1>
        </div>

        {/* Stats card */}
        <div style={styles.statsCard}>
          <div style={styles.statsIcon}>
            <Package size={24} />
          </div>
          <div style={styles.statsInfo}>
            <div style={styles.statsLabel}>Productos en inventario</div>
            <div style={styles.statsValue}>{products.length}</div>
          </div>
        </div>
      </div>

      {/* Formulario de compra */}
      <div style={styles.formContainer}>
        <div style={styles.formTitle}>
          <Plus size={20} color={colors.accent} />
          Nueva Compra
        </div>

        <form onSubmit={handleSubmit}>
          {/* 🔥 NUEVO: Input de texto para el nombre del producto */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre del producto</label>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Ej: Laptop HP, Mouse Logitech..."
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                style={styles.input}
                onMouseEnter={handleInputHover}
                onMouseLeave={handleInputLeave}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Cantidad</label>
            <div style={styles.inputGroup}>
              <input
                type="number"
                min="1"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                style={styles.input}
                onMouseEnter={handleInputHover}
                onMouseLeave={handleInputLeave}
              />
              <span style={styles.inputIcon}>unidades</span>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Precio de compra</label>
            <div style={styles.inputGroup}>
              <input
                type="number"
                min="0"
                step="100"
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={styles.input}
                onMouseEnter={handleInputHover}
                onMouseLeave={handleInputLeave}
              />
              <span style={styles.inputIcon}>COP</span>
            </div>
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            disabled={loading}
          >
            {loading ? (
              "Registrando..."
            ) : (
              <>
                <ShoppingBag size={18} />
                Registrar Compra
              </>
            )}
          </button>
        </form>
      </div>

      {/* Vista previa de la compra */}
      <div style={styles.previewCard}>
        <div style={styles.previewTitle}>
          <AlertCircle size={20} color={colors.accent} />
          Vista Previa
        </div>

        {productName && quantity && price ? (
          <div style={styles.previewItem}>
            <div style={styles.previewRow}>
              <span style={styles.previewLabel}>Producto:</span>
              <span style={styles.previewValue}>{productName}</span>
            </div>
            <div style={styles.previewRow}>
              <span style={styles.previewLabel}>Cantidad:</span>
              <span style={styles.previewValue}>{quantity} unidades</span>
            </div>
            <div style={styles.previewRow}>
              <span style={styles.previewLabel}>Precio unitario:</span>
              <span style={styles.previewValue}>
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0
                }).format(price || 0)}
              </span>
            </div>
            <div style={styles.previewRow}>
              <span style={styles.previewLabel}>Total:</span>
              <span style={{
                ...styles.previewValue,
                color: colors.accent,
                fontSize: '18px'
              }}>
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0
                }).format(total)}
              </span>
            </div>
          </div>
        ) : (
          <div style={styles.emptyPreview}>
            <ShoppingBag size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
            <p>Completa el formulario</p>
            <p style={{ fontSize: '12px' }}>para ver la vista previa</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Purchases;