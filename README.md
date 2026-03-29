# 🧾 SmartPOS

Sistema profesional de gestión de ventas, compras e inventario desarrollado con arquitectura moderna **Full Stack**.

---

## 🚀 Tecnologías

- **Frontend:** React + TailwindCSS  
- **Backend:** Django REST Framework  
- **Base de datos:** PostgreSQL  
- **Gráficos:** Recharts  
- **Animaciones:** Framer Motion  

---

## ⚙️ Funcionalidades

### 📦 Gestión de productos
- Crear, editar y eliminar productos
- Control de stock automático

### 🛒 Compras
- Registro de compras (aumenta inventario)
- Control de surtido

### 💰 Ventas
- Registro de ventas (reduce inventario)
- Validación de stock disponible

### 📊 Dashboard
- Ventas por día (gráficos)
- Productos más vendidos
- Ganancias totales
- Indicadores clave:
  - Ventas del día
  - Productos registrados
  - Stock bajo

### 🧾 POS (Punto de Venta)
- Interfaz rápida tipo caja registradora
- Carrito de compras
- Checkout inmediato

### 🌗 UI/UX
- Modo **Dark / Light**
- Animaciones suaves
- Diseño tipo SaaS (similar a Stripe)

---

## 🧠 Lógica de negocio

El sistema maneja inventario real:

```text
Stock = Compras - Ventas
```
⚙️ Instalación
-------------
Clonar el repositorio
----
```
$ git clone https://github.com/ElHackerDaniel/SmartPOS.git
```

```
$ cd SmartPOS
```

Crear entorno virtual (opcional)
----
```
$ python -m venv venv
```

Activarlo:

Windows

`$ venv\Scripts\activate`

Linux / Mac

`$ source venv/bin/activate`

Instalar dependencias
-------------
Backend
----
```
$ cd backend
```
```
$ pip install -r requirements.txt
```
```
$ python manage.py migrate
```
```
$ python manage.py runserver
```

Frontend
----
```
$ cd frontend
```
```
$ npm install
```
```
$ npm run dev
```
📈 Características técnicas destacadas
-------------
- Arquitectura desacoplada (API REST)
- Manejo de estado en React
- Consumo de API con Axios
- Validaciones en frontend y backend
- Diseño responsive
- Filtros por fecha en reportes

🧪 Demo
-------------
Puedes probar el flujo completo:
1. Crear productos
2. Registrar compras
3. Registrar ventas
4. Visualizar métricas en el dashboard
5. Usar el POS

📌 Posibles mejoras futuras
-------------
- Autenticación JWT completa
- Multiusuario (admin / vendedor)
- Exportación a Excel / PDF
- Facturación automática
- Sistema multiempresa (SaaS)

👨‍💻 Autor
----
Proyecto desarrollado como parte del proceso de aprendizaje en desarrollo web Full Stack, enfocado en la construcción de un sistema profesional de ventas, inventario y análisis de datos utilizando Python, Django REST Framework, React y PostgreSQL.

Att: ElHackerDaniel

🪬 Credenciales
----
Usuario: admin

Password: AdminEntero123!

🎥 Video
----
https://github.com/user-attachments/assets/3c00e436-486a-4199-8220-b81a10f951a1

