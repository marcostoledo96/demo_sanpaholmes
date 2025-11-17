// RUTAS: Compras
// Define las rutas HTTP para compras/ventas
// Parte del patrón MVC - Rutas que llaman a controladores

const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/CompraController');
const { verificarAutenticacion, verificarPermiso } = require('../middleware/auth');
const multer = require('multer');

// Configuración de multer para mantener archivo en MEMORIA
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 3 * 1024 * 1024 // Máximo 3MB
  },
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png|webp/;
    const mimetype = tiposPermitidos.test(file.mimetype);
    
    if (mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen (JPG, PNG, WEBP)'));
    }
  }
});

// 🛍️ POST /api/compras - Crear una nueva compra (público)
router.post('/', upload.single('comprobante'), CompraController.crearCompra);

// 📋 GET /api/compras - Listar todas las compras (requiere autenticación y permisos)
router.get('/', verificarAutenticacion, verificarPermiso('ver_compras'), CompraController.listarCompras);

// 📊 GET /api/compras/estadisticas/ventas - Obtener estadísticas (requiere autenticación y permisos)
router.get('/estadisticas/ventas', verificarAutenticacion, verificarPermiso('ver_compras'), CompraController.obtenerEstadisticas);

// 🔍 GET /api/compras/:id - Obtener detalle de una compra (requiere autenticación y permisos)
router.get('/:id', verificarAutenticacion, verificarPermiso('ver_compras'), CompraController.obtenerCompraPorId);

// 🔄 PATCH /api/compras/:id/estado - Actualizar estado de una compra (requiere autenticación y permisos)
router.patch('/:id/estado', verificarAutenticacion, verificarPermiso('editar_compras'), CompraController.actualizarEstadoCompra);

// 🗑️ DELETE /api/compras/:id - Eliminar una compra (requiere autenticación y permisos)
router.delete('/:id', verificarAutenticacion, verificarPermiso('eliminar_compras'), CompraController.eliminarCompra);

module.exports = router;
