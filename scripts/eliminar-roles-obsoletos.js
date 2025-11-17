// Script para eliminar roles obsoletos (vendor y readonly)
// Estos roles quedaron obsoletos, ahora usamos: admin, vendedor, visitador
// Ejecutar después de asegurarnos de que no hay usuarios asignados a estos roles

const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db', 'sanpaholmes.db');
const db = new Database(DB_PATH);

console.log('🗑️  Eliminando roles obsoletos...\n');

try {
  // Verificar usuarios con roles obsoletos
  console.log('1️⃣ Verificando usuarios con roles obsoletos...');
  const usuariosVendor = db.prepare(`
    SELECT u.id, u.username, r.nombre as role 
    FROM usuarios u 
    JOIN roles r ON u.role_id = r.id 
    WHERE r.nombre IN ('vendor', 'readonly')
  `).all();
  
  if (usuariosVendor.length > 0) {
    console.log('\n⚠️  ADVERTENCIA: Hay usuarios con roles obsoletos:');
    usuariosVendor.forEach(u => {
      console.log(`   - ${u.username} (role: ${u.role})`);
    });
    
    // Migrar automáticamente
    console.log('\n2️⃣ Migrando usuarios a roles nuevos...');
    
    // vendor → vendedor
    const vendedorRole = db.prepare("SELECT id FROM roles WHERE nombre = 'vendedor'").get();
    if (vendedorRole) {
      db.prepare(`
        UPDATE usuarios 
        SET role_id = ? 
        WHERE role_id IN (SELECT id FROM roles WHERE nombre = 'vendor')
      `).run(vendedorRole.id);
      console.log('   ✅ Usuarios "vendor" migrados a "vendedor"');
    }
    
    // readonly → visitador
    const visitadorRole = db.prepare("SELECT id FROM roles WHERE nombre = 'visitador'").get();
    if (visitadorRole) {
      db.prepare(`
        UPDATE usuarios 
        SET role_id = ? 
        WHERE role_id IN (SELECT id FROM roles WHERE nombre = 'readonly')
      `).run(visitadorRole.id);
      console.log('   ✅ Usuarios "readonly" migrados a "visitador"');
    }
  } else {
    console.log('   ✅ No hay usuarios con roles obsoletos');
  }
  
  // Eliminar relaciones en roles_permisos
  console.log('\n3️⃣ Eliminando permisos de roles obsoletos...');
  const deletedPermisos = db.prepare(`
    DELETE FROM roles_permisos 
    WHERE role_id IN (SELECT id FROM roles WHERE nombre IN ('vendor', 'readonly'))
  `).run();
  console.log(`   ✅ Eliminadas ${deletedPermisos.changes} relaciones de permisos`);
  
  // Eliminar roles
  console.log('\n4️⃣ Eliminando roles obsoletos...');
  const deletedRoles = db.prepare(`
    DELETE FROM roles 
    WHERE nombre IN ('vendor', 'readonly')
  `).run();
  console.log(`   ✅ Eliminados ${deletedRoles.changes} roles`);
  
  // Mostrar roles actuales
  console.log('\n5️⃣ Roles actuales en el sistema:');
  const rolesActuales = db.prepare(`
    SELECT id, nombre, descripcion 
    FROM roles 
    WHERE activo = 1 
    ORDER BY id
  `).all();
  
  rolesActuales.forEach(r => {
    console.log(`   ${r.id}. ${r.nombre} - ${r.descripcion}`);
  });
  
  console.log('\n✅ Roles obsoletos eliminados exitosamente');
  
} catch (error) {
  console.error('\n❌ Error al eliminar roles:', error.message);
} finally {
  db.close();
}
