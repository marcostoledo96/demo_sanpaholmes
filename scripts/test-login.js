// Script para probar el login del usuario admin
const http = require('http');

const API_URL = 'http://localhost:3000/api/auth/login';

async function testLogin() {
  console.log('🔐 Probando login con usuario admin...\n');
  
  const postData = JSON.stringify({
    username: 'admin',
    password: 'admin123'
  });
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        console.log('✅ Login exitoso!');
        console.log('\n📦 Respuesta completa:');
        console.log(JSON.stringify(response, null, 2));
        
        if (response.usuario) {
          console.log('\n👤 Usuario:');
          console.log('  - ID:', response.usuario.id);
          console.log('  - Username:', response.usuario.username);
          console.log('  - Nombre:', response.usuario.nombre_completo);
          console.log('  - Roles:', response.usuario.roles);
          console.log('  - Token:', response.token ? '✓ Presente' : '✗ Ausente');
        }
      } catch (error) {
        console.error('❌ Error parseando respuesta:', error);
        console.error('Respuesta raw:', data);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('❌ Error en request:', error.message);
  });
  
  req.write(postData);
  req.end();
}

testLogin();
