// Script para verificar permisos del usuario admin
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db', 'sanpaholmes.db');
const db = new Database(DB_PATH);

console.log('=== Permisos del usuario admin ===\n');

// Verificar rol y permisos
const query = `
  SELECT 
    r.id as role_id,
    r.nombre as role_nombre,
    GROUP_CONCAT(p.nombre) as permisos
  FROM usuarios u
  JOIN roles r ON u.role_id = r.id
  LEFT JOIN roles_permisos rp ON r.id = rp.role_id
  LEFT JOIN permisos p ON rp.permiso_id = p.id
  WHERE u.username = 'admin'
  GROUP BY r.id, r.nombre
`;

const result = db.prepare(query).get();

if (result) {
  console.log('Rol:', result.role_nombre);
  console.log('Role ID:', result.role_id);
  console.log('\nPermisos:', result.permisos ? result.permisos.split(',').join(', ') : 'NINGUNO');
  
  // Verificar si tiene el permiso necesario
  const permisos = result.permisos ? result.permisos.split(',') : [];
  const tieneGestionar = permisos.includes('gestionar_usuarios');
  const tieneVer = permisos.includes('ver_usuarios');
  
  console.log('\n✅ Tiene gestionar_usuarios:', tieneGestionar);
  console.log('✅ Tiene ver_usuarios:', tieneVer);
  
  if (!tieneGestionar && !tieneVer) {
    console.log('\n❌ PROBLEMA: Usuario admin no tiene permisos para gestionar usuarios');
  }
} else {
  console.log('❌ Usuario admin no encontrado');
}

// Listar todos los permisos disponibles
console.log('\n=== Permisos disponibles en la BD ===');
const todosPermisos = db.prepare('SELECT id, nombre, categoria FROM permisos ORDER BY categoria, nombre').all();
todosPermisos.forEach(p => {
  console.log(`  ${p.id}. [${p.categoria}] ${p.nombre}`);
});

db.close();
