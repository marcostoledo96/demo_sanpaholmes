// Módulo de conexión a SQLite
// Proporciona una función reutilizable para obtener la conexión a la base de datos

const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db', 'sanpaholmes.db');

/**
 * Obtener conexión a la base de datos SQLite
 * @returns {Database} Instancia de la base de datos
 */
function getDB() {
  const db = new Database(DB_PATH, { 
    // verbose: console.log // Descomentar para debug
  });
  db.pragma('foreign_keys = ON');
  return db;
}

module.exports = { getDB };
