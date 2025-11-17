// Script para probar las rutas de usuarios y roles
const http = require('http');

// Primero login para obtener token
async function login() {
  return new Promise((resolve, reject) => {
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
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response.token);
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Probar endpoint
async function testEndpoint(path, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log(`\n📍 ${path}`);
        console.log(`   Status: ${res.statusCode}`);
        try {
          const response = JSON.parse(data);
          console.log(`   Respuesta:`, JSON.stringify(response, null, 2));
          resolve(response);
        } catch (error) {
          console.log(`   Raw:`, data);
          reject(error);
        }
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  try {
    console.log('🔐 Haciendo login...');
    const token = await login();
    console.log('✅ Token obtenido:', token.substring(0, 30) + '...');
    
    console.log('\n🧪 Probando endpoints:\n');
    
    await testEndpoint('/api/usuarios', token);
    await testEndpoint('/api/roles', token);
    
    console.log('\n✅ Tests completados');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

runTests();
