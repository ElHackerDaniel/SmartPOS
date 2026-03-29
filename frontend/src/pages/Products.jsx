// src/pages/Products.jsx
import { useEffect, useState } from "react";
import api from "../api/api";
import { Package, Search, Plus, Edit, Trash2, X } from "lucide-react";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    purchase_price: '',
    sale_price: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  // Abrir modal para crear producto
  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      purchase_price: '',
      sale_price: '',
      stock: ''
    });
    setError('');
    setShowModal(true);
  };

  // Abrir modal para editar producto
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      purchase_price: product.purchase_price,
      sale_price: product.sale_price,
      stock: product.stock
    });
    setError('');
    setShowModal(true);
  };

  // Eliminar producto
  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      await api.delete(`products/${product.id}/`);
      alert("✅ Producto eliminado correctamente");
      loadProducts();
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("❌ Error al eliminar el producto");
    } finally {
      setLoading(false);
    }
  };

  // Guardar producto (crear o actualizar)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingProduct) {
        // Actualizar producto existente
        await api.put(`products/${editingProduct.id}/`, formData);
        alert("✅ Producto actualizado correctamente");
      } else {
        // Crear nuevo producto
        await api.post("products/", formData);
        alert("✅ Producto creado correctamente");
      }
      setShowModal(false);
      loadProducts();
    } catch (error) {
      console.error("Error guardando producto:", error);
      if (error.response?.data?.name) {
        setError(error.response.data.name[0]);
      } else {
        setError("Error al guardar el producto");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Formateador de moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(value || 0);
  };

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    searchBar: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px'
    },
    searchInput: {
      flex: 1,
      padding: '12px 16px',
      background: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      fontSize: '14px',
      color: colors.textPrimary,
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    addButton: {
      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: `0 4px 12px ${colors.accent}40`,
      transition: 'all 0.3s ease'
    },
    tableContainer: {
      background: colors.bgCard,
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    thead: {
      background: colors.bgDark
    },
    th: {
      padding: '16px',
      textAlign: 'left',
      color: colors.textSecondary,
      fontSize: '13px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: `1px solid ${colors.border}`
    },
    td: {
      padding: '16px',
      color: colors.textPrimary,
      fontSize: '14px',
      borderBottom: `1px solid ${colors.border}`
    },
    productName: {
      fontWeight: '500',
      color: colors.textPrimary
    },
    priceCell: {
      color: colors.textSecondary
    },
    salePriceCell: {
      color: colors.accent,
      fontWeight: '600'
    },
    stockBadge: (stock) => ({
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block',
      background: stock < 5 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
      color: stock < 5 ? colors.danger : colors.success,
      border: `1px solid ${stock < 5 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
    }),
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    iconButton: {
      background: 'transparent',
      border: 'none',
      padding: '6px',
      borderRadius: '8px',
      cursor: 'pointer',
      color: colors.textSecondary,
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    emptyState: {
      textAlign: 'center',
      padding: '48px',
      color: colors.textSecondary,
      fontSize: '14px'
    },
    // Modal styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      background: colors.bgCard,
      borderRadius: '16px',
      padding: '24px',
      width: '450px',
      maxWidth: '90%',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    modalInput: {
      width: '100%',
      padding: '10px 12px',
      background: colors.bgDark,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      color: colors.textPrimary,
      outline: 'none'
    },
    modalLabel: {
      display: 'block',
      fontSize: '12px',
      color: colors.textSecondary,
      marginBottom: '4px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    modalButtons: {
      display: 'flex',
      gap: '12px',
      marginTop: '8px'
    },
    modalSave: {
      flex: 1,
      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
      color: 'white',
      padding: '10px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer'
    },
    modalCancel: {
      flex: 1,
      background: 'transparent',
      color: colors.textSecondary,
      padding: '10px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer'
    },
    errorMessage: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: `1px solid ${colors.danger}`,
      color: colors.danger,
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '13px',
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

  const handleButtonHover = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = `0 8px 20px ${colors.accent}60`;
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = `0 4px 12px ${colors.accent}40`;
  };

  const handleRowHover = (e) => {
    e.currentTarget.style.background = colors.bgHover;
  };

  const handleRowLeave = (e) => {
    e.currentTarget.style.background = 'transparent';
  };

  const handleIconHover = (e, color) => {
    e.currentTarget.style.background = `${color}20`;
    e.currentTarget.style.color = color;
  };

  const handleIconLeave = (e) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = colors.textSecondary;
  };

  return (
    <>
      <div style={styles.container}>
        {/* Header con icono */}
        <div style={styles.header}>
          <div style={styles.titleContainer}>
            <div style={styles.titleIcon}>
              <Package size={24} />
            </div>
            <h1 style={styles.title}>Productos</h1>
          </div>
          <div>
            <button 
              onClick={handleAddProduct}
              style={styles.addButton}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              <Plus size={18} />
              Nuevo Producto
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div style={styles.searchBar}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: colors.textSecondary
            }} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                ...styles.searchInput,
                paddingLeft: '40px'
              }}
              onMouseEnter={handleSearchHover}
              onMouseLeave={handleSearchLeave}
            />
          </div>
        </div>

        {/* Tabla de productos */}
        <div style={styles.tableContainer}>
          {filteredProducts.length === 0 ? (
            <div style={styles.emptyState}>
              <Package size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <p>No hay productos disponibles</p>
              <p style={{ fontSize: '12px', marginTop: '8px' }}>
                Agrega un nuevo producto para comenzar
              </p>
            </div>
          ) : (
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Precio Compra</th>
                  <th style={styles.th}>Precio Venta</th>
                  <th style={styles.th}>Stock</th>
                  <th style={styles.th}>Acciones</th>
                 </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr 
                    key={p.id} 
                    style={styles.tr}
                    onMouseEnter={handleRowHover}
                    onMouseLeave={handleRowLeave}
                  >
                    <td style={styles.td}>
                      <span style={styles.productName}>{p.name}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.priceCell}>{formatCurrency(p.purchase_price)}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.salePriceCell}>{formatCurrency(p.sale_price)}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.stockBadge(p.stock)}>
                        {p.stock} unidades
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button 
                          onClick={() => handleEditProduct(p)}
                          style={styles.iconButton}
                          onMouseEnter={(e) => handleIconHover(e, colors.accent)}
                          onMouseLeave={handleIconLeave}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(p)}
                          style={styles.iconButton}
                          onMouseEnter={(e) => handleIconHover(e, colors.danger)}
                          onMouseLeave={handleIconLeave}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal para crear/editar producto */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalTitle}>
              <span>{editingProduct ? "Editar Producto" : "Nuevo Producto"}</span>
              <button
                onClick={() => setShowModal(false)}
                style={styles.iconButton}
                onMouseEnter={(e) => handleIconHover(e, colors.textSecondary)}
                onMouseLeave={handleIconLeave}
              >
                <X size={18} />
              </button>
            </div>

            {error && (
              <div style={styles.errorMessage}>
                {error}
              </div>
            )}

            <form onSubmit={handleSaveProduct} style={styles.modalForm}>
              <div>
                <label style={styles.modalLabel}>Nombre del producto</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Laptop HP"
                  style={styles.modalInput}
                  required
                />
              </div>

              <div>
                <label style={styles.modalLabel}>Precio de compra (COP)</label>
                <input
                  type="number"
                  name="purchase_price"
                  value={formData.purchase_price}
                  onChange={handleChange}
                  placeholder="0"
                  style={styles.modalInput}
                  required
                  step="100"
                  min="0"
                />
              </div>

              <div>
                <label style={styles.modalLabel}>Precio de venta (COP)</label>
                <input
                  type="number"
                  name="sale_price"
                  value={formData.sale_price}
                  onChange={handleChange}
                  placeholder="0"
                  style={styles.modalInput}
                  required
                  step="100"
                  min="0"
                />
              </div>

              <div>
                <label style={styles.modalLabel}>Stock inicial</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  style={styles.modalInput}
                  required
                  min="0"
                />
              </div>

              <div style={styles.modalButtons}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={styles.modalCancel}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={styles.modalSave}
                  disabled={loading}
                >
                  {loading ? "Guardando..." : (editingProduct ? "Actualizar" : "Crear")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;