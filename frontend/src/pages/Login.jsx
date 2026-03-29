// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Lock, LogIn, AlertCircle } from "lucide-react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Usuario o contraseña incorrectos");
      } else {
        setError("Error de conexión con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  const colors = {
    bgDark: '#0f172a',
    bgCard: '#1e293b',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.1)',
    danger: '#ef4444',
    dangerHover: '#dc2626'
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${colors.bgDark}, #0a0f1f)`,
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundDecoration: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0
    },
    circle1: {
      position: 'absolute',
      top: '-20%',
      right: '-10%',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${colors.accent}20, transparent 70%)`,
      filter: 'blur(60px)'
    },
    circle2: {
      position: 'absolute',
      bottom: '-20%',
      left: '-10%',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      background: `radial-gradient(circle, #8b5cf620, transparent 70%)`,
      filter: 'blur(60px)'
    },
    card: {
      position: 'relative',
      zIndex: 1,
      width: '420px',
      background: `linear-gradient(135deg, ${colors.bgCard}, ${colors.bgDark})`,
      borderRadius: '24px',
      padding: '40px',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)'
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    logo: {
      width: '64px',
      height: '64px',
      background: `linear-gradient(135deg, ${colors.accent}, #8b5cf6)`,
      borderRadius: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto',
      boxShadow: `0 8px 20px ${colors.accent}40`
    },
    logoText: {
      fontSize: '28px',
      fontWeight: 'bold',
      background: `linear-gradient(135deg, ${colors.accent}, #8b5cf6)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px'
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: '14px'
    },
    errorBox: {
      background: `${colors.danger}20`,
      border: `1px solid ${colors.danger}40`,
      borderRadius: '12px',
      padding: '12px 16px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: colors.danger,
      fontSize: '14px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    inputIcon: {
      position: 'absolute',
      left: '14px',
      color: colors.textSecondary,
      pointerEvents: 'none'
    },
    input: {
      width: '100%',
      padding: '12px 16px 12px 44px',
      background: `${colors.bgDark}80`,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      fontSize: '14px',
      color: colors.textPrimary,
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    button: {
      width: '100%',
      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
      color: colors.textPrimary,
      padding: '14px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      marginTop: '8px'
    },
    footer: {
      textAlign: 'center',
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: `1px solid ${colors.border}`,
      fontSize: '12px',
      color: colors.textSecondary
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = colors.accent;
    e.target.style.boxShadow = `0 0 0 3px ${colors.accent}20`;
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = colors.border;
    e.target.style.boxShadow = 'none';
  };

  const handleButtonHover = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = `0 8px 20px ${colors.accent}60`;
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={styles.container}>
      {/* Decoración de fondo */}
      <div style={styles.backgroundDecoration}>
        <div style={styles.circle1} />
        <div style={styles.circle2} />
      </div>

      {/* Tarjeta de login */}
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={styles.logoText}>SmartPOS</h1>
          <p style={styles.subtitle}>Sistema de Punto de Venta</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <div style={styles.inputWrapper}>
              <User size={18} style={styles.inputIcon} />
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.inputIcon} />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            {loading ? (
              "Ingresando..."
            ) : (
              <>
                <LogIn size={18} />
                Ingresar
              </>
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p>SmartPOS © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
