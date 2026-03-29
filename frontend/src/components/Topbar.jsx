import useTheme from "../hooks/useTheme";

// src/components/Topbar.jsx
// src/components/Topbar.jsx
function Topbar() {
  const colors = {
    bgDark: '#0f172a',
    bgCard: '#0f172a',
    accent: '#3b82f6',
    border: 'rgba(255, 255, 255, 0.1)'
  };

  const styles = {
    container: {
      background: `linear-gradient(135deg, ${colors.bgDark}, ${colors.bgCard})`,
      padding: '16px 24px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    icon: {
      width: '36px',
      height: '36px',
      background: `linear-gradient(135deg, ${colors.accent}, #8b5cf6)`,
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'white'
    },
    title: {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: 0,
      color: 'white',
      letterSpacing: '0.5px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.icon}>SP</div>
      <h1 style={styles.title}>SmartPOS</h1>
    </div>
  );
}

export default Topbar;