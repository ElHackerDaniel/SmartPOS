import { useEffect, useState } from "react";
import api from "../api/api";
import { TrendingUp, Package, AlertCircle, ShoppingCart, DollarSign } from "lucide-react";

function Sales() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProductStock, setSelectedProductStock] = useState(0);

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

  // Actualizar stock cuando se selecciona un producto
  useEffect(() => {
    if (product) {
      const selected = products.find(p => p.id === parseInt(product));
      setSelectedProductStock(selected?.stock || 0);
    } else {
      setSelectedProductStock(0);
    }
  }, [product, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("sales/", {
        product: product,
        quantity: quantity,
        sale_price: price
      });

      alert("✅ Venta registrada exitosamente");
      setQuantity("");
      setPrice("");
      setProduct("");
      
      // Recargar productos para actualizar stock
      loadProducts();
    } catch (error) {
      alert("❌ No hay suficiente stock");
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
      background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
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
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: colors.textSecondary,
      fontSize: '13px',
      fontWeight: '500',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    stockBadge: {
      color: selectedProductStock > 0 ? colors.success : colors.danger,
      fontSize: '12px',
      fontWeight: 'normal',
      textTransform: 'none'
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      background: colors.bgDark,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      fontSize: '14px',
      color: colors.textPrimary,
      outline: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    option: {
      background: colors.bgDark,
      color: colors.textPrimary
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
      background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
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
      boxShadow: `0 4px 12px ${colors.success}40`,
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
    warningMessage: {
      background: 'rgba(245, 158, 11, 0.1)',
      border: '1px solid rgba(245, 158, 11, 0.2)',
      borderRadius: '8px',
      padding: '12px',
      marginTop: '12px',
      color: colors.warning,
      fontSize: '13px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
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
    e.target.style.borderColor = colors.success;
    e.target.style.boxShadow = `0 0 0 3px ${colors.success}20`;
  };

  const handleInputLeave = (e) => {
    e.target.style.borderColor = colors.border;
    e.target.style.boxShadow = 'none';
  };

  const handleButtonHover = (e) => {
    if (!loading) {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = `0 8px 20px ${colors.success}60`;
    }
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = `0 4px 12px ${colors.success}40`;
  };

  // Obtener producto seleccionado para preview
  const selectedProduct = products.find(p => p.id === parseInt(product));
  const total = (price || 0) * (quantity || 0);
  const stockWarning = quantity > selectedProductStock;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <div style={styles.titleIcon}>
            <TrendingUp size={24} />
          </div>
          <h1 style={styles.title}>Registrar Venta</h1>
        </div>

        {/* Stats card */}
        <div style={styles.statsCard}>
          <div style={styles.statsIcon}>
            <Package size={24} />
          </div>
          <div style={styles.statsInfo}>
            <div style={styles.statsLabel}>Productos disponibles</div>
            <div style={styles.statsValue}>{products.length}</div>
          </div>
        </div>
      </div>

      {/* Formulario de venta */}
      <div style={styles.formContainer}>
        <div style={styles.formTitle}>
          <ShoppingCart size={20} color={colors.success} />
          Nueva Venta
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <div style={styles.label}>
              <span>Producto</span>
              {selectedProductStock > 0 && (
                <span style={styles.stockBadge}>
                  Stock disponible: {selectedProductStock}
                </span>
              )}
            </div>
            <select
              onChange={(e) => setProduct(e.target.value)}
              value={product}
              required
              style={styles.select}
              onMouseEnter={handleInputHover}
              onMouseLeave={handleInputLeave}
            >
              <option value="" style={styles.option}>Seleccionar producto</option>
              {products.map(p => (
                <option key={p.id} value={p.id} style={styles.option}>
                  {p.name} - {formatCurrency(p.sale_price)} (Stock: {p.stock})
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Cantidad</label>
            <div style={styles.inputGroup}>
              <input
                type="number"
                min="1"
                max={selectedProductStock}
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
            {stockWarning && quantity && (
              <div style={styles.warningMessage}>
                <AlertCircle size={16} />
                La cantidad supera el stock disponible ({selectedProductStock})
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Precio de venta</label>
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
              ...(loading || stockWarning ? styles.buttonDisabled : {})
            }}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            disabled={loading || stockWarning}
          >
            {loading ? (
              "Registrando..."
            ) : (
              <>
                <DollarSign size={18} />
                Registrar Venta
              </>
            )}
          </button>
        </form>
      </div>

      {/* Vista previa de la venta */}
      <div style={styles.previewCard}>
        <div style={styles.previewTitle}>
          <AlertCircle size={20} color={colors.success} />
          Resumen de Venta
        </div>

        {product && quantity && price ? (
          <div style={styles.previewItem}>
            <div style={styles.previewRow}>
              <span style={styles.previewLabel}>Producto:</span>
              <span style={styles.previewValue}>{selectedProduct?.name}</span>
            </div>
            <div style={styles.previewRow}>
              <span style={styles.previewLabel}>Cantidad:</span>
              <span style={styles.previewValue}>{quantity} unidades</span>
            </div>
            <div style={styles.previewRow}>
              <span style={styles.previewLabel}>Precio unitario:</span>
              <span style={styles.previewValue}>
                {formatCurrency(price || 0)}
              </span>
            </div>
            <div style={styles.previewRow}>
              <span style={styles.previewLabel}>Subtotal:</span>
              <span style={styles.previewValue}>
                {formatCurrency(total)}
              </span>
            </div>
            <div style={{
              ...styles.previewRow,
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: `1px solid ${colors.border}`
            }}>
              <span style={styles.previewLabel}>Total:</span>
              <span style={{
                ...styles.previewValue,
                color: colors.success,
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                {formatCurrency(total)}
              </span>
            </div>
            {stockWarning && (
              <div style={{
                ...styles.warningMessage,
                marginTop: '16px',
                marginBottom: 0
              }}>
                <AlertCircle size={16} />
                ⚠️ Stock insuficiente. Disponible: {selectedProductStock}
              </div>
            )}
          </div>
        ) : (
          <div style={styles.emptyPreview}>
            <ShoppingCart size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
            <p>Completa el formulario</p>
            <p style={{ fontSize: '12px' }}>para ver el resumen de la venta</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Función auxiliar para formatear moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(value || 0);
};

export default Sales;
