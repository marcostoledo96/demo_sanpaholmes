# SanpaHolmes - Sistema de Carrito de Compras

Sistema web de e-commerce desarrollado para el evento Scout SanpaHolmes 2025.

---

## Descripción

SanpaHolmes es un sistema de carrito de compras para gestionar ventas durante eventos. Los compradores pueden hacer pedidos de comida y bebidas a través de una interfaz web, mientras los organizadores administran productos y visualizan ventas en tiempo real.

### Características

- Carrito de compras con gestión en tiempo real
- Sistema de autenticación JWT para administradores  
- Panel de administración para productos y ventas
- Proceso de checkout con validación
- Diseño responsive para móviles y tablets
- Integración con WhatsApp para notificaciones
- Exportación a Google Sheets
- Base de datos SQLite con CRUD completo

---

## Arquitectura

El proyecto usa el patrón **MVC (Modelo-Vista-Controlador)**:

- **Modelo**: Gestiona datos y operaciones de base de datos
- **Vista**: Maneja la interfaz de usuario
- **Controlador**: Procesa solicitudes y coordina modelo-vista

---

## Tecnologías

### Backend
- Node.js 18+
- Express 4.18
- SQLite (better-sqlite3)
- JWT (jsonwebtoken)
- Bcrypt

### Frontend
- React 18
- TypeScript
- Vite 5
- Tailwind CSS 3
- React Router DOM 6

---

## Estructura del Proyecto

```
demo_sanpaholmes/
│
├── models/              # Capa de datos
│   ├── database.js     
│   ├── ProductoModel.js
│   ├── CompraModel.js
│   └── UsuarioModel.js
│
├── controllers/         # Lógica de negocio
│   ├── ProductoController.js
│   ├── CompraController.js
│   └── AuthController.js
│
├── routes/              # Endpoints HTTP
│   ├── index.js
│   ├── productos.js
│   ├── compras.js
│   └── auth.js
│
├── middleware/          # Validación JWT
│   └── auth.js
│
├── server.js            # Servidor Express
│
├── src/
│   ├── views/          # Componentes UI de React
│   ├── controllers/    # Estado global (AuthContext, CartContext)
│   ├── config/         # Configuración API
│   ├── types/          # Tipos TypeScript
│   ├── App.tsx         
│   └── main.tsx        
│
├── db/
│   ├── sanpaholmes.db  # Base de datos SQLite
│   └── init.js         
│
└── public/             # Archivos estáticos
```

---

## Instalación

### Requisitos
- Node.js 18+
- npm o yarn

### Pasos

1. Clonar el repositorio
```bash
git clone https://github.com/marcostoledo96/demo_sanpaholmes.git
cd demo_sanpaholmes
```

2. Instalar dependencias
```bash
npm install
```

3. Inicializar base de datos
```bash
node db/init.js
```

4. Iniciar backend (terminal 1)
```bash
node server.js
```

5. Iniciar frontend (terminal 2)
```bash
npm run dev
```

6. Acceder a la aplicación
- Cliente: http://localhost:5173/
- Admin: http://localhost:5173/vendor/login

### Credenciales de administrador
- Usuario: `admin`
- Contraseña: `admin123`

---

## API Endpoints

### Productos
```
GET    /api/productos          # Listar productos activos
GET    /api/productos/:id      # Obtener producto por ID
POST   /api/productos          # Crear producto (auth)
PUT    /api/productos/:id      # Actualizar producto (auth)
DELETE /api/productos/:id      # Eliminar producto (auth)
```

### Compras
```
POST   /api/compras                     # Crear compra (público)
GET    /api/compras                     # Listar compras (auth)
GET    /api/compras/estadisticas/ventas # Estadísticas (auth)
GET    /api/compras/:id                 # Obtener compra (auth)
PATCH  /api/compras/:id/estado          # Actualizar estado (auth)
DELETE /api/compras/:id                 # Eliminar compra (auth)
```

### Autenticación
```
POST   /api/auth/login          # Login de administrador
```

---

## Base de Datos

### Esquema principal

**Tabla productos**
```sql
CREATE TABLE productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio REAL NOT NULL,
  categoria TEXT NOT NULL,
  imagen TEXT,
  activo INTEGER DEFAULT 1,
  creado_en TEXT DEFAULT CURRENT_TIMESTAMP
);
```

**Tabla compras**
```sql
CREATE TABLE compras (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero_orden TEXT UNIQUE NOT NULL,
  comprador_nombre TEXT NOT NULL,
  comprador_telefono TEXT NOT NULL,
  comprador_mesa TEXT,
  items TEXT NOT NULL,
  total REAL NOT NULL,
  metodo_pago TEXT NOT NULL,
  comprobante_archivo TEXT,
  estado TEXT DEFAULT 'pendiente',
  abonado INTEGER DEFAULT 0,
  listo INTEGER DEFAULT 0,
  entregado INTEGER DEFAULT 0,
  fecha TEXT DEFAULT CURRENT_TIMESTAMP
);
```

**Tabla usuarios**
```sql
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  nombre_completo TEXT,
  email TEXT,
  role TEXT DEFAULT 'vendor',
  activo INTEGER DEFAULT 1,
  creado_en TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## Uso del Sistema

### Para compradores
1. Navegar al catálogo
2. Agregar productos al carrito
3. Revisar el carrito
4. Completar checkout con datos personales
5. Confirmar pedido

### Para administradores
1. Login en `/vendor/login`
2. Gestionar productos (crear, editar, eliminar)
3. Visualizar ventas en tiempo real
4. Filtrar compras por nombre, teléfono o mesa
5. Marcar pedidos como listos
6. Enviar notificaciones por WhatsApp
7. Exportar datos a Google Sheets

---

## Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo frontend
npm run build     # Build para producción
npm run preview   # Preview de build

node server.js    # Servidor backend
node db/init.js   # Inicializar base de datos
```

---

## Deployment

El proyecto está configurado para Vercel (ver `vercel.json`).

Para producción, considerar migrar a PostgreSQL en lugar de SQLite.

---

## Solución de Problemas

**Backend no inicia**
- Verificar que puerto 3000 esté disponible
- Ejecutar `npm install`
- Revisar logs del servidor

**Error de base de datos**
- Ejecutar `node db/init.js` para recrear DB
- Verificar permisos de `db/sanpaholmes.db`

**Frontend no conecta**
- Verificar backend en http://localhost:3000
- Revisar `src/config/api.ts`

---

## Autor

Marcos Toledo  
GitHub: [@marcostoledo96](https://github.com/marcostoledo96)

---

## Licencia

Desarrollado para el evento Scout SanpaHolmes 2025.
