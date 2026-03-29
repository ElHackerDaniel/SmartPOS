// src/layout/MainLayout.jsx
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  const colors = {
    bgDark: '#0f172a',
    bgCard: '#1e293b',
    border: 'rgba(255, 255, 255, 0.1)'
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: colors.bgDark,
    }}>
      
      {/* Área principal (izquierda) */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflow: 'hidden',
      }}>
        
        {/* Contenido scrolleable */}
        <main style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          backgroundColor: colors.bgDark,
        }}>
          {children}
        </main>
      </div>

      {/* Sidebar fijo a la derecha */}
      <Sidebar />
    </div>
  );
}

export default MainLayout;