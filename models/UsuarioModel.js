// MODELO: Usuario
// Maneja todas las operaciones de base de datos relacionadas con usuarios
// Parte del patrón MVC - Modelo de datos para usuarios y autenticación

const { getDB } = require('./database');

/**
 * Obtener un usuario por username
 * @param {string} username - Nombre de usuario
 * @returns {Object|null} Usuario encontrado o null
 */
function obtenerUsuarioPorUsername(username) {
  const db = getDB();
  
  const usuario = db.prepare(`
    SELECT id, username, password_hash, nombre_completo, email, role, activo
    FROM usuarios
    WHERE username = ? AND activo = 1
  `).get(username);
  
  db.close();
  
  if (!usuario) return null;
  
  return {
    ...usuario,
    activo: Boolean(usuario.activo)
  };
}

/**
 * Verificar si un usuario existe y está activo
 * @param {string} username - Nombre de usuario
 * @returns {boolean} true si el usuario existe
 */
function existeUsuario(username) {
  const db = getDB();
  
  const result = db.prepare(`
    SELECT COUNT(*) as count
    FROM usuarios
    WHERE username = ? AND activo = 1
  `).get(username);
  
  db.close();
  
  return result.count > 0;
}

/**
 * Obtener estadísticas de usuarios
 * @returns {Object} Objeto con estadísticas de usuarios
 */
function obtenerEstadisticasUsuarios() {
  const db = getDB();
  
  const stats = {
    totalUsuarios: db.prepare('SELECT COUNT(*) as count FROM usuarios WHERE activo = 1').get().count,
    totalAdmins: db.prepare('SELECT COUNT(*) as count FROM usuarios WHERE role = "admin" AND activo = 1').get().count
  };
  
  db.close();
  
  return stats;
}

module.exports = {
  obtenerUsuarioPorUsername,
  existeUsuario,
  obtenerEstadisticasUsuarios
};
