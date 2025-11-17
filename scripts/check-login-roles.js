const creds = [
  { username: 'admin', password: 'admin123' },
  { username: 'vendedor1', password: 'vend123' },
  { username: 'visitador1', password: 'visit123' }
];

async function run() {
  for (const cred of creds) {
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: cred.username, password: cred.password })
      });

      const data = await res.json();
      console.log(`\nUsuario: ${cred.username}`);
      console.log(`  status: ${res.status}`);
      console.log(`  success: ${data.success}`);
      console.log(`  rol devuelto: ${data.usuario?.role}`);
      if (Array.isArray(data.usuario?.roles)) {
        console.log(`  roles array: ${data.usuario.roles.join(', ')}`);
      }
      if (!data.success) {
        console.log('  detalle:', data.mensaje || 'sin mensaje');
      }
    } catch (error) {
      console.error(`\nUsuario: ${cred.username}`);
      console.error('  ❌ Error al invocar /api/auth/login:', error.message);
    }
  }
}

run();
