# SanpaHolmes – Sistema de pedidos y gestión de ventas para eventos

**Demo pública:** https://demo-sanpaholmes.vercel.app

Hola, soy **Marcos Toledo** y este es el sistema que desarrollé para resolver un problema muy concreto:  
cuando organizás un evento con mucha gente, los pedidos de comida y bebida se vuelven difíciles de ordenar y seguir.

Entre pedidos anotados en papel, mensajes sueltos por WhatsApp, cambios de último momento y poca visibilidad del stock real, es muy fácil cometer errores y perder dinero.  
SanpaHolmes nació justamente para eso: **ordenar el caos de los pedidos en eventos** y **dejar de anotar en papel**.

---

## ¿Qué es SanpaHolmes?

SanpaHolmes es un sistema web de carrito de compras pensado para eventos con alto volumen de ventas, donde se necesita:

- Tomar pedidos de comida y bebidas desde el celular.
- Gestionar ventas en tiempo real.
- Tener un control claro del stock disponible.
- Avisar a la persona cuando su pedido está listo para retirar.
- Cerrar el evento con estadísticas y números claros.

Lo utilicé en un evento Scout real, pero la solución es totalmente adaptable a otros contextos.

---

## ¿A quién le puede servir?

Aunque su origen es Scout, SanpaHolmes se puede aplicar a:

- **Organizaciones Scout** que gestionan campamentos, fogones, kermeses o festivales.
- **Centros de estudiantes** que organizan kioscos, peñas o ferias.
- **Comisiones de eventos** (clubes, parroquias, barrios, asociaciones civiles).
- **Pequeños comercios** que quieren un sistema simple para tomar y controlar pedidos.
- Cualquier equipo que quiera:
  - **ordenar el caos de los pedidos en eventos**
  - **dejar de anotar en papel**
  - y tener una visión clara de lo que se vende.

---

## Problema que resuelve

SanpaHolmes apunta a cuatro puntos clave:

1. **Orden en los pedidos**  
   Todos los pedidos quedan registrados en un solo lugar: quién pidió, qué pidió, cuánto debe pagar y en qué estado está el pedido.

2. **Control real de stock**  
   Cada venta descuenta stock en la base de datos.  
   Si alguien intenta vender más cantidad de la que hay disponible, el sistema lo bloquea y muestra un mensaje claro.

3. **Flujo de venta ágil en eventos masivos**  
   El sistema está pensado para manejar picos de demanda, con un flujo simple de:
   - selección de productos  
   - armado de carrito  
   - confirmación de compra  
   - actualización de stock  
   - seguimiento del pedido.

4. **Comunicación clara con las personas que compran**  
   Se integra con WhatsApp para notificar cuando un pedido está listo para retirar, evitando confusiones y tiempos muertos.

---

## Resumen de valor

En pocas palabras, SanpaHolmes te ayuda a:

- **ordenar el caos de los pedidos en eventos**  
- **dejar de anotar en papel**  
- mejorar la experiencia tanto de quienes organizan como de quienes compran  
- tener datos concretos para tomar decisiones en próximos eventos.

---

## Funcionalidades principales

### 1. Control de stock

- Configuración de stock por producto.
- Descuento automático de stock al confirmar una compra.
- Validación de stock suficiente antes de aprobar cada pedido.
- Prevención de ventas por encima de lo disponible.

### 2. Sistema de roles y permisos

El sistema diferencia claramente qué puede hacer cada tipo de usuario:

- **Admin**  
  - Gestiona productos.  
  - Gestiona compras.  
  - Gestiona usuarios, roles y permisos.

- **Vendedor**  
  - Gestiona productos y compras.  
  - Se enfoca en la operación diaria del evento.

- **Visitador**  
  - Solo lectura de productos y compras, sin capacidad de modificar datos.

Cada ruta crítica está protegida por middlewares de autenticación (JWT) y verificación de permisos, para garantizar que solo las personas autorizadas puedan realizar acciones sensibles.

### 3. Experiencia optimizada para mobile

El frontend está diseñado pensando en su uso desde teléfonos y tablets:

- Interfaz clara para seleccionar productos y cantidades.
- Carrito intuitivo.
- Proceso de checkout sencillo y guiado.
- Panel para el equipo organizador usable en tablets y notebooks.

Está preparado para funcionar cómodamente en el contexto real de un evento.

### 4. Agilidad en ventas masivas

El flujo completo está optimizado para:

- Ingresar pedidos rápidamente.
- Minimizar errores de carga.
- Visualizar de forma clara:
  - monto total,
  - método de pago,
  - estado de cada pedido (pendiente, listo, entregado).

Esto permite sostener un ritmo alto de ventas sin perder el control.

### 5. Integración con WhatsApp

SanpaHolmes se integra con WhatsApp para:

- Enviar avisos cuando el pedido está listo para retirar.
- Reducir la acumulación de personas esperando en el mismo lugar.
- Mejorar la comunicación sin desarrollar un sistema de notificaciones complejo desde cero.

### 6. Estadísticas de ventas

El sistema permite consultar:

- Total vendido en un período.
- Cantidad de pedidos realizados.
- Productos más vendidos.
- Información que ayuda a decidir:
  - qué comprar para el próximo evento,
  - qué productos funcionan mejor,
  - qué ajustes hacer en precios y stock.

---

## Tecnologías utilizadas

Aunque el foco del proyecto es resolver un problema práctico, también cuidé la arquitectura y las tecnologías elegidas.

**Backend**

- Node.js + Express  
- SQLite (mediante better-sqlite3)  
- JWT para autenticación y autorización  
- Bcrypt para hash de contraseñas  
- Patrón tipo MVC (modelos, controladores, rutas, middlewares)

**Frontend**

- React  
- TypeScript  
- Vite  
- Tailwind CSS  
- Context API para autenticación y carrito

El proyecto está desplegado en Vercel, considerando las particularidades de usar SQLite en ese entorno.

---

## Estado actual del proyecto

- Es un proyecto **listo para utilizar**, que **ya se usó en un evento real**.
- El flujo completo está implementado:
  - gestión de productos,  
  - carrito,  
  - creación de compras,  
  - control de stock,  
  - estadísticas.

Lo único que **no incluí en esta primera versión** es una **pasarela de pago real** (por ejemplo, Mercado Pago).  
En el evento donde se utilizó, los pagos se manejaron con efectivo, transferencia o QR mostrado aparte.  
La integración con una pasarela de pagos está pensada como trabajo futuro.

---

## ¿Se puede adaptar a otros contextos?

Sí. SanpaHolmes está pensado para ser adaptable:

- Podés cambiar productos, categorías y precios.
- Podés ajustar los roles según la estructura de tu organización.
- Podés usarlo en red local o desplegarlo online según la necesidad.

Si organizás eventos y querés profesionalizar la forma en que gestionás pedidos y stock, este proyecto es una base sólida para hacerlo.

---

Si te interesa ver el código, extenderlo o adaptarlo a tu propio contexto, todo está disponible en este repositorio.  
SanpaHolmes es el resultado de un caso real llevado a código, con el objetivo de que la organización de ventas en eventos sea mucho más clara, ordenada y medible.

---

## Información adicional para desarrolladores

Esta sección es opcional para quien solo quiere usar el sistema, pero útil para quienes quieran mirar el código o adaptarlo.

### Tecnologías principales

**Backend**

- Node.js + Express  
- SQLite (mediante better-sqlite3)  
- JWT para autenticación y autorización  
- Bcrypt para hash de contraseñas  
- Patrón tipo MVC (modelos, controladores, rutas, middlewares)

**Frontend**

- React  
- TypeScript  
- Vite  
- Tailwind CSS  
- Context API para autenticación y carrito

### Notas sobre deployment actual

- El proyecto está desplegado en **Vercel**.
- En ese entorno, la base de datos SQLite corre en `/tmp`, por lo que los datos pueden reiniciarse en cada deploy o reinicio frío.
- Para uso de producción a largo plazo, la recomendación natural es migrar a una base de datos persistente (por ejemplo, PostgreSQL o un servicio gestionado equivalente).

**Nota histórica:** En una versión anterior en producción se utilizó **PostgreSQL** (servicio Neon). En la rama/versión actual el proyecto corre con **SQLite**; esta migración se hizo intencionalmente para no afectar datos ni configuraciones en mi cuenta de Neon durante pruebas y despliegues. Si se desea restaurar la integración con PostgreSQL/Neon, hay scripts y notas de migración en el repositorio para hacerlo de forma segura.

Para más detalles técnicos de deploy, migraciones y scripts, se puede consultar la documentación interna del repositorio.
  role TEXT DEFAULT 'vendedor',
  activo INTEGER DEFAULT 1,
  creado_en TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## Deployment

### Vercel (Actual)

El proyecto está desplegado en **Vercel** con configuración serverless:

```json
// vercel.json
{
  "functions": {
    "server.js": {
      "maxDuration": 10
    }
  }
}
```

**Limitaciones en Vercel:**
- SQLite usa `/tmp` (se resetea en cada deploy o cold start)
- Operaciones de escritura bloqueadas en modo DEMO
- Banner de advertencia visible en producción
- Los datos no persisten entre deploys

**Variables de Entorno requeridas:**
```bash
JWT_SECRET=sanpaholmes-secret-key-2025
NODE_ENV=production
VERCEL=1
```

### Migración Recomendada

Para producción real, se recomienda migrar a base de datos persistente:

**Opciones:**
1. **Vercel Postgres** (Recomendado)
   - Integración nativa
   - Free tier: 256 MB
   - Auto-configuración

2. **Neon** (Serverless Postgres)
   - Free tier: 3 GB
   - Excelente rendimiento
   - Connection string simple

3. **Supabase**
   - Free tier: 500 MB
   - Backend-as-a-Service
   - Auth incluido

Ver `FIX_VERCEL_SQLITE.md` para más detalles sobre la migración.

---

## Uso del Sistema

### Para compradores
1. Navegar al catálogo
2. Agregar productos al carrito
3. Revisar el carrito
4. Completar checkout con datos personales
5. Confirmar pedido

### Para administradores
1. Login en `/vendor/login`
   - Usuario: `admin`
   - Contraseña: `admin123`
2. Visualizar productos y ventas en tiempo real
3. Filtrar compras por nombre, teléfono o mesa
4. Marcar pedidos como listos
5. Enviar notificaciones por WhatsApp
6. Exportar datos a Google Sheets

**Roles del panel:**
- **Admin**: acceso total, gestiona usuarios, roles, productos y operaciones.
- **Vendedor**: administra catálogo y flujo de compras, sin modificar usuarios.
- **Visitador**: acceso de solo lectura para monitorear el estado de ventas.

**Nota**: En versión DEMO (Vercel), las operaciones de crear/editar/eliminar productos están bloqueadas.

---

## Scripts Disponibles

### Desarrollo
```bash
# Frontend (Vite dev server)
npm run dev              # http://localhost:5173

# Backend (Express server)
node server.js           # http://localhost:3000

# Build para producción
npm run build            # Genera carpeta dist/

# Preview del build
npm run preview          # Previsualiza build de producción
```

### Base de Datos
```bash
# Inicializar DB desde cero
node db/init.js

# Resetear DB (elimina y recrea)
node db/reset.js

# Verificar conexión
node db/test-connection.js

# Verificar usuario admin
node db/verificar-admin.js
```

### Notas personales de verificación backend
- Cada vez que ajusto autenticación corro `node scripts/check-login-roles.js` porque me da visibilidad inmediata de qué role devuelve `/api/auth/login` para admin, vendedor y visitador. Prefiero esta prueba end-to-end antes de tocar el frontend.
- Cuando no tengo el backend local levantado, tiro el mismo POST contra `https://demo-sanpaholmes.vercel.app/api/auth/login` y reviso que:
  - `admin` reciba `roles: ["admin"]`
  - `vendedor1` reciba `roles: ["vendedor"]`
  - `visitador1` reciba `roles: ["visitador"]`
- Este checklist está directamente alineado con la consigna del TP (“Integración con sistema de permisos...”), porque valida que el backend responda con los roles actualizados antes de seguir con las otras capas.

### Migraciones
```bash
# Agregar campo "listo" a compras
node scripts/add-listo-field.js

# Migrar comprobante de BLOB a TEXT
node scripts/migrate-comprobante-to-text.js

# Actualizar contraseña de admin
node scripts/update-admin-password.js
```

---

## Tecnologías y Dependencias

### Backend
```json
{
  "express": "^4.18.2",
  "better-sqlite3": "^9.2.2",
  "jsonwebtoken": "^9.0.2",
  "bcrypt": "^5.1.1",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.21.1",
  "typescript": "^5.3.3",
  "vite": "^5.0.11",
  "tailwindcss": "^3.4.1",
  "lucide-react": "^0.309.0"
}
```

---

## Características Implementadas

**Sistema de Carrito**
- Agregar/quitar productos
- Actualizar cantidades
- Calcular total automático
- Persistencia en localStorage

**Autenticación JWT**
- Login seguro con bcrypt
- Tokens con expiración
- Refresh automático
- Logout con limpieza de sesión

**Panel de Administración**
- Vista de productos (solo lectura en DEMO)
- Lista de ventas en tiempo real
- Filtrado por nombre/teléfono/mesa
- Estadísticas de ventas
- Exportación a Google Sheets

**Modo DEMO en Vercel**
- Bloqueo de operaciones de escritura
- Banner de advertencia visible
- Base de datos en /tmp (temporal)
- Solo lectura de productos y ventas

**Diseño Responsive**
- Mobile-first approach
- Adaptado a tablets y desktop
- Navegación táctil optimizada
- Scroll to top en carrito

**Integraciones**
- WhatsApp para notificaciones
- Google Sheets para exportación
- Imágenes con fallback automático

---

## Documentación Adicional

- **[FIX_VERCEL_SQLITE.md](./FIX_VERCEL_SQLITE.md)** - Solución a problemas de SQLite en Vercel y guía de migración a PostgreSQL
- **[VERIFICACION_FINAL.md](./VERIFICACION_FINAL.md)** - Checklist de verificación del proyecto completo
- **[google-apps-script.js](./google-apps-script.js)** - Script para integración con Google Sheets

---

## Contacto y Soporte

**Desarrollado para**: Grupo Scout San Patricio - Evento SanpaHolmes 2025

**Demo en Vivo**: https://demo-sanpaholmes.vercel.app

**Repositorio**: https://github.com/marcostoledo96/demo_sanpaholmes

---

## Licencia

Proyecto desarrollado para el evento Scout SanpaHolmes 2025.
Todos los derechos reservados - Grupo Scout San Patricio.
