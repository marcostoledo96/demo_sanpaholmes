// Script para verificar el rol del usuario admin
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db', 'sanpaholmes.db');
const db = new Database(DB_PATH);

console.log('=== Base de datos SQLite ===');
console.log('📁 Path:', DB_PATH);
console.log();

console.log('=== Tablas disponibles ===');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log('Tablas:', tables.map(t => t.name).join(', '));
console.log();

console.log('=== Verificando usuario admin ===');

// Intentar con tabla usuarios (nueva)
try {
  const queryUsuarios = `
    SELECT 
      u.id,
      u.username,
      u.nombre_completo,
      u.role_id,
      r.nombre as role_nombre
    FROM usuarios u
    LEFT JOIN roles r ON u.role_id = r.id
    WHERE u.username = 'admin'
    LIMIT 1
  `;
  
  const admin = db.prepare(queryUsuarios).get();
  if (admin) {
    console.log('✅ Usuario encontrado en tabla usuarios:');
    console.log(JSON.stringify(admin, null, 2));
  } else {
    console.log('❌ Usuario admin no encontrado en tabla usuarios');
  }
} catch (error) {
  console.log('❌ Error al consultar tabla usuarios:', error.message);
  
  // Intentar con tabla users (vieja)
  try {
    const queryUsers = `
      SELECT 
        id,
        username,
        role
      FROM users
      WHERE username = 'admin'
      LIMIT 1
    `;
    
    const admin = db.prepare(queryUsers).get();
    if (admin) {
      console.log('✅ Usuario encontrado en tabla users:');
      console.log(JSON.stringify(admin, null, 2));
    } else {
      console.log('❌ Usuario admin no encontrado en tabla users');
    }
  } catch (error2) {
    console.log('❌ Error al consultar tabla users:', error2.message);
  }
}

db.close();
