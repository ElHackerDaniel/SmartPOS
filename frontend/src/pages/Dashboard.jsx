// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState({
    ventas_hoy: 0,
    productos: 0,
    stock_bajo: 0
  });
  const [profit, setProfit] = useState({ ganancia: 0 });
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    loadStats();
    loadReports();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("reports/dashboard/");
      setStats(res.data);
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    }
  };

  const loadProfit = async () => {
    try {
      const res = await api.get("reports/profit/");
      setProfit(res.data);
    } catch (error) {
      console.error("Error cargando ganancia:", error);
    }
  };

  const loadReports = async () => {
    setLoading(true);
    try {
      const sales = await api.get(`reports/sales-by-day/?start=${start}&end=${end}`);
      const top = await api.get("reports/top-products/");
      const p = await api.get("reports/profit/");
      
      setSalesData(sales.data);
      setTopProducts(top.data);
      setProfit(p.data);
    } catch (error) {
      console.error("Error cargando reportes:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value || 0);
  };

  // Obtener límites del año actual
  const getCurrentYearLimits = () => {
    const currentYear = new Date().getFullYear();
    return {
      min: `${currentYear}-01-01`,
      max: `${currentYear}-12-31`,
      currentYear
    };
  };

  // Mejorar la función handleFilter con validación de año
  const handleFilter = () => {
    const { currentYear } = getCurrentYearLimits();
    
    // Validar formato de fecha
    const validateYear = (dateStr, fieldName) => {
      if (!dateStr) return true;
      const year = new Date(dateStr).getFullYear();
      if (year !== currentYear) {
        alert(`⚠️ ${fieldName} debe ser del año ${currentYear}`);
        return false;
      }
      return true;
    };
    
    if (!validateYear(start, "La fecha de inicio")) return;
    if (!validateYear(end, "La fecha de fin")) return;
    
    if (start && end && start > end) {
      alert("⚠️ La fecha de inicio no puede ser mayor que la fecha fin");
      return;
    }
    
    loadReports();
  };

  // Colores del sidebar
  const colors = {
    bgDark: '#0f172a',
    bgDarker: '#1e293b',
    bgCard: '#1e293b',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    purple: '#8b5cf6'
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
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: colors.textPrimary,
      margin: 0
    },
    dateBox: {
      background: colors.bgCard,
      padding: '8px 16px',
      borderRadius: '8px',
      color: colors.textSecondary,
      fontSize: '14px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    filterBar: {
      display: 'flex',
      gap: '16px',
      background: colors.bgCard,
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      alignItems: 'flex-end'
    },
    filterGroup: {
      flex: 1
    },
    filterLabel: {
      display: 'block',
      fontSize: '12px',
      color: colors.textSecondary,
      marginBottom: '6px',
      fontWeight: '500'
    },
    filterInput: {
      width: '100%',
      padding: '10px 12px',
      background: colors.bgDark,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      fontSize: '14px',
      color: colors.textPrimary,
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    filterHint: {
      display: 'block',
      fontSize: '10px',
      color: colors.textSecondary,
      marginTop: '4px'
    },
    filterButton: {
      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
      color: 'white',
      padding: '10px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      boxShadow: `0 4px 12px ${colors.accent}40`,
      transition: 'all 0.3s ease'
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    },
    card: (borderColor) => ({
      background: colors.bgCard,
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderLeft: `4px solid ${borderColor}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }),
    cardTitle: {
      color: colors.textSecondary,
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '8px'
    },
    cardValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: '8px'
    },
    cardTrend: (color) => ({
      color: color,
      fontSize: '13px',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }),
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px'
    },
    chartCard: {
      background: colors.bgCard,
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    chartTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: '16px'
    },
    chartPlaceholder: {
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.bgDark,
      borderRadius: '8px',
      color: colors.textSecondary,
      border: '1px dashed rgba(255, 255, 255, 0.1)',
      fontSize: '14px'
    }
  };

  // Efectos hover
  const handleButtonHover = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = `0 8px 20px ${colors.accent}60`;
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = `0 4px 12px ${colors.accent}40`;
  };

  const handleCardHover = (e, color) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = `0 12px 30px ${color}20`;
    e.currentTarget.style.borderColor = color;
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  };

  const { min, max, currentYear } = getCurrentYearLimits();

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <div style={styles.dateBox}>
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Filtros mejorados con labels y validación */}
      <div style={styles.filterBar}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>
            📅 Fecha inicio
          </label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            min={min}
            max={max}
            style={styles.filterInput}
            onMouseEnter={(e) => e.target.style.borderColor = colors.accent}
            onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
          />
          <small style={styles.filterHint}>
            Solo año {currentYear}
          </small>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>
            📅 Fecha fin
          </label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            min={min}
            max={max}
            style={styles.filterInput}
            onMouseEnter={(e) => e.target.style.borderColor = colors.accent}
            onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
          />
          <small style={styles.filterHint}>
            Solo año {currentYear}
          </small>
        </div>

        <button
          onClick={handleFilter}
          style={styles.filterButton}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
        >
          Filtrar
        </button>
      </div>

      {/* Cards */}
      <div style={styles.cardsGrid}>
        <div 
          style={styles.card(colors.accent)}
          onMouseEnter={(e) => handleCardHover(e, colors.accent)}
          onMouseLeave={handleCardLeave}
        >
          <p style={styles.cardTitle}>Ventas hoy</p>
          <p style={styles.cardValue}>{formatCurrency(stats.ventas_hoy)}</p>
          <p style={styles.cardTrend(colors.success)}>↑ 2% vs ayer</p>
        </div>
        
        <div 
          style={styles.card(colors.success)}
          onMouseEnter={(e) => handleCardHover(e, colors.success)}
          onMouseLeave={handleCardLeave}
        >
          <p style={styles.cardTitle}>Productos</p>
          <p style={styles.cardValue}>{stats.productos || 0}</p>
          <p style={styles.cardTrend(colors.success)}>↑ 3 vs ayer</p>
        </div>
        
        <div 
          style={styles.card(colors.danger)}
          onMouseEnter={(e) => handleCardHover(e, colors.danger)}
          onMouseLeave={handleCardLeave}
        >
          <p style={styles.cardTitle}>Stock bajo</p>
          <p style={styles.cardValue}>{stats.stock_bajo || 0}</p>
          <p style={styles.cardTrend(colors.danger)}>↓ 2 vs ayer</p>
        </div>
        
        <div 
          style={styles.card(colors.purple)}
          onMouseEnter={(e) => handleCardHover(e, colors.purple)}
          onMouseLeave={handleCardLeave}
        >
          <p style={styles.cardTitle}>Ganancia</p>
          <p style={styles.cardValue}>{formatCurrency(profit.ganancia)}</p>
          <p style={styles.cardTrend(colors.success)}>↑ 8% vs ayer</p>
        </div>
      </div>

      {/* Gráficos con Recharts */}
      <div style={styles.chartsGrid}>
        {/* Gráfico de líneas - Ventas por día */}
        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Ventas por día</h2>
          {loading ? (
            <div style={styles.chartPlaceholder}>
              Cargando datos...
            </div>
          ) : salesData && salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="day" 
                  stroke={colors.textSecondary}
                  tick={{ fill: colors.textSecondary, fontSize: 11 }}
                />
                <YAxis 
                  stroke={colors.textSecondary}
                  tick={{ fill: colors.textSecondary, fontSize: 11 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.bgCard, 
                    border: `1px solid rgba(255,255,255,0.1)`,
                    borderRadius: '8px',
                    color: colors.textPrimary
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Ventas']}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke={colors.accent} 
                  strokeWidth={2}
                  dot={{ fill: colors.accent, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={styles.chartPlaceholder}>
              📊 No hay ventas - Selecciona otro período
            </div>
          )}
        </div>

        {/* Gráfico de barras - Productos más vendidos */}
        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Productos más vendidos</h2>
          {loading ? (
            <div style={styles.chartPlaceholder}>
              Cargando datos...
            </div>
          ) : topProducts && topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="product" 
                  stroke={colors.textSecondary}
                  tick={{ fill: colors.textSecondary, fontSize: 11 }}
                />
                <YAxis 
                  stroke={colors.textSecondary}
                  tick={{ fill: colors.textSecondary, fontSize: 11 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.bgCard, 
                    border: `1px solid rgba(255,255,255,0.1)`,
                    borderRadius: '8px',
                    color: colors.textPrimary
                  }}
                  formatter={(value) => [`${value} unidades`, 'Vendidos']}
                />
                <Bar 
                  dataKey="sales" 
                  fill={colors.accent} 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={styles.chartPlaceholder}>
              📈 Sin datos - No hay productos vendidos
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;