// src/pages/Export.jsx
import { useState } from "react";
import api from "../api/api";
import { 
  FileSpreadsheet, Download, Package, 
  ShoppingCart, CheckCircle, AlertCircle 
} from "lucide-react";
import Topbar from "../components/Topbar";

function Export() {
  const [exporting, setExporting] = useState({
    sales: false,
    products: false,
    purchases: false
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const exportSales = async () => {
    setExporting(prev => ({ ...prev, sales: true }));
    setError(null);
    setSuccess(null);
    
    try {
      const response = await api.get("sales/export/", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ventas_${new Date().toISOString().slice(0, 10)}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setSuccess("✅ Ventas exportadas correctamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError("❌ Error al exportar ventas");
      setTimeout(() => setError(null), 3000);
    } finally {
      setExporting(prev => ({ ...prev, sales: false }));
    }
  };

  const exportProducts = async () => {
    setExporting(prev => ({ ...prev, products: true }));
    setError(null);
    setSuccess(null);
    
    try {
      const response = await api.get("products/export/", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `productos_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setSuccess("✅ Productos exportados correctamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError("❌ Error al exportar productos");
      setTimeout(() => setError(null), 3000);
    } finally {
      setExporting(prev => ({ ...prev, products: false }));
    }
  };

  const exportPurchases = async () => {
    setExporting(prev => ({ ...prev, purchases: true }));
    setError(null);
    setSuccess(null);
    
    try {
      const response = await api.get("purchases/export/", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `compras_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setSuccess("✅ Compras exportadas correctamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError("❌ Error al exportar compras");
      setTimeout(() => setError(null), 3000);
    } finally {
      setExporting(prev => ({ ...prev, purchases: false }));
    }
  };

  const colors = {
    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    bgCard: 'var(--bg-card)',
    border: 'var(--border)',
    accent: '#3b82f6',
    success: '#10b981',
    danger: '#ef4444'
  };

  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto' },
    header: { marginBottom: '32px' },
    title: { fontSize: '32px', fontWeight: 'bold', color: colors.textPrimary, marginBottom: '8px' },
    subtitle: { color: colors.textSecondary, fontSize: '14px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' },
    card: { background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '24px' },
    cardIcon: (color) => ({ width: '48px', height: '48px', background: `${color}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color }),
    cardTitle: { fontSize: '20px', fontWeight: '600', color: colors.textPrimary, marginBottom: '8px' },
    cardDescription: { fontSize: '14px', color: colors.textSecondary, marginBottom: '20px' },
    cardFormat: { display: 'inline-block', padding: '4px 8px', background: `${colors.accent}20`, borderRadius: '6px', fontSize: '11px', color: colors.accent, marginBottom: '16px' },
    button: (bgColor) => ({ width: '100%', background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`, color: 'white', padding: '12px', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }),
    alert: { padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' },
    successAlert: { background: `${colors.success}20`, border: `1px solid ${colors.success}40`, color: colors.success },
    errorAlert: { background: `${colors.danger}20`, border: `1px solid ${colors.danger}40`, color: colors.danger }
  };

  return (
    <>
      <Topbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Exportar Datos</h1>
          <p style={styles.subtitle}>Exporta tus datos para análisis y respaldo</p>
        </div>

        {success && <div style={{ ...styles.alert, ...styles.successAlert }}><CheckCircle size={18} /><span>{success}</span></div>}
        {error && <div style={{ ...styles.alert, ...styles.errorAlert }}><AlertCircle size={18} /><span>{error}</span></div>}

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardIcon('#3b82f6')}><FileSpreadsheet size={28} /></div>
            <h3 style={styles.cardTitle}>Ventas</h3>
            <p style={styles.cardDescription}>Exporta el historial completo de ventas</p>
            <span style={styles.cardFormat}>Formato: Excel (.xlsx)</span>
            <button onClick={exportSales} disabled={exporting.sales} style={styles.button('#3b82f6')}>
              {exporting.sales ? "Exportando..." : <><Download size={16} /> Exportar Ventas</>}
            </button>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon('#10b981')}><Package size={28} /></div>
            <h3 style={styles.cardTitle}>Productos</h3>
            <p style={styles.cardDescription}>Exporta el catálogo completo de productos</p>
            <span style={styles.cardFormat}>Formato: CSV (.csv)</span>
            <button onClick={exportProducts} disabled={exporting.products} style={styles.button('#10b981')}>
              {exporting.products ? "Exportando..." : <><Download size={16} /> Exportar Productos</>}
            </button>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon('#8b5cf6')}><ShoppingCart size={28} /></div>
            <h3 style={styles.cardTitle}>Compras</h3>
            <p style={styles.cardDescription}>Exporta el historial de compras a proveedores</p>
            <span style={styles.cardFormat}>Formato: CSV (.csv)</span>
            <button onClick={exportPurchases} disabled={exporting.purchases} style={styles.button('#8b5cf6')}>
              {exporting.purchases ? "Exportando..." : <><Download size={16} /> Exportar Compras</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Export;