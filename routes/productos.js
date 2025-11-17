// RUTAS: Productos
// Define las rutas HTTP para productos
// Parte del patrón MVC - Rutas que llaman a controladores

const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/ProductoController');
const { verificarAutenticacion, verificarPermiso } = require('../middleware/auth');

// 📋 GET /api/productos - Listar todos los productos activos (público)
router.get('/', ProductoController.listarProductos);

// 🔐 GET /api/productos/admin/all - Listar TODOS los productos (requiere autenticación)
router.get('/admin/all', verificarAutenticacion, ProductoController.listarTodosLosProductos);

// 🔍 GET /api/productos/:id - Obtener un producto específico
router.get('/:id', ProductoController.obtenerProductoPorId);

// ➕ POST /api/productos - Crear un nuevo producto (requiere autenticación y permisos)
router.post('/', verificarAutenticacion, verificarPermiso('gestionar_productos'), ProductoController.crearProducto);

// ✏️ PUT /api/productos/:id - Actualizar un producto (requiere autenticación y permisos)
router.put('/:id', verificarAutenticacion, verificarPermiso('gestionar_productos'), ProductoController.actualizarProducto);

// 🗑️ DELETE /api/productos/:id - Eliminar un producto (requiere autenticación y permisos)
router.delete('/:id', verificarAutenticacion, verificarPermiso('gestionar_productos'), ProductoController.eliminarProducto);

module.exports = router;
