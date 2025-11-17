# TRABAJO FINAL INTEGRADOR

**Materia**: Desarrollo de Software Backend  
**Instituto**: Instituto de Formación Técnica Superior 16  
**Proyecto**: Extensión del Sistema de Usuarios, Roles y Permisos con Carrito de Compras

---

## Objetivo General

Ampliar el sistema existente de gestión de usuarios, roles y permisos, incorporando un **módulo de carrito de compras** que permita administrar productos, registrar compras y visualizar el historial de transacciones de cada usuario.

El propósito de esta ampliación es aplicar los conceptos de:
- Relaciones entre tablas
- Validaciones
- Vistas dinámicas
- Control de acceso mediante permisos

Todo dentro de un flujo práctico de compra y gestión de inventario.

---

## Objetivos Específicos

1. ✅ Implementar las tablas necesarias para gestionar productos, compras y detalles de compra
2. ✅ Crear un CRUD de productos con validaciones de stock y precio
3. ✅ Desarrollar un flujo de carrito que permita agregar, modificar y eliminar productos antes de confirmar una compra
4. ✅ Registrar las compras realizadas por cada usuario y generar los detalles correspondientes
5. ✅ Integrar el control de acceso mediante permisos para restringir la gestión de productos y las acciones de compra

---

## Consignas de Desarrollo

### 1. Ampliación de la Base de Datos

Agregar las tablas necesarias acorde a la arquitectura del proyecto existente.

**Consideraciones:**
- Un usuario puede tener muchas compras
- Una compra tiene muchos detalles_compra
- Cada detalle_compra pertenece a un producto

**Tablas implementadas:**
- `productos`: Catálogo de productos disponibles
- `compras`: Registro de transacciones por usuario
- `detalles_compra`: Items individuales de cada compra (relación muchos a muchos)

---

### 2. Gestión de Productos (ABM)

Crear un módulo de administración de productos que permita:

- ✅ **Listar productos disponibles** (`GET /productos`)
- ✅ **Crear nuevos productos** (`POST /productos`)
- ✅ **Editar productos existentes** (`PUT /productos/:id`)
- ✅ **Eliminar productos** (`DELETE /productos/:id`)

**Validaciones requeridas:**
- ❌ No permitir precios negativos
- ❌ No permitir stocks negativos
- ✅ Mostrar mensajes de error o confirmación al realizar operaciones

**Restricciones:**
Solo los usuarios con el permiso **"gestionar_productos"** podrán acceder a estas funciones.

---

### 3. Carrito de Compras (por Usuario)

Desarrollar un flujo de compra que contemple:

- ✅ Agregar productos al carrito
- ✅ Modificar la cantidad de productos seleccionados
- ✅ Eliminar productos del carrito
- ✅ Finalizar la compra → crear registro en `compras` y `detalles_compra`
- ✅ Actualizar el stock de los productos al confirmar la compra

**Requerimientos:**
- ✅ El carrito debe ser propio de cada usuario autenticado
- ✅ Solo usuarios con el permiso **"crear_compra"** podrán realizar una compra
- ✅ Validar que la cantidad solicitada no supere el stock disponible

---

### 4. Permisos Recomendados para el Módulo

| Permiso | Descripción | Estado |
|---------|-------------|--------|
| `ver_productos` | Permite visualizar el listado de productos | ✅ Implementado |
| `gestionar_productos` | Permite crear, editar y eliminar productos | ✅ Implementado |
| `crear_compra` | Permite realizar compras desde el carrito | ✅ Implementado |
| `ver_compras` | Permite ver el historial de compras | ✅ Implementado |
| `editar_compras` | Permite actualizar estado de compras | ✅ Implementado |
| `eliminar_compras` | Permite eliminar compras | ✅ Implementado |

Estos permisos deben poder asignarse desde la vista `/roles/:id/edit`, tal como en el sistema base.

---

## Entregables

### 1. Proyecto Funcionando ✅

- ✅ Gestión de productos (CRUD completo)
- ✅ Carrito de compras con Context API
- ✅ Registro e historial de compras por usuario
- ✅ Integración de permisos para controlar el acceso a cada módulo
- ✅ Panel de administración con estadísticas
- ✅ Interfaz responsive con React + TypeScript
- ✅ Backend con arquitectura MVC

### 2. Archivo README.md ✅

- ✅ Descripción breve del módulo de carrito
- ✅ Explicación de las tablas nuevas
- ✅ Permisos creados y su función
- ✅ Flujo de uso: cómo se agrega un producto al carrito y cómo se confirma la compra
- ✅ Arquitectura del proyecto
- ✅ API Endpoints documentados
- ✅ Scripts disponibles

---

## Criterios de Evaluación

| Criterio | Ponderación | Estado |
|----------|-------------|--------|
| Correcta implementación de las nuevas tablas y relaciones | 25% | ✅ Completo |
| CRUD de productos funcional y validado | 25% | ✅ Completo |
| Flujo de carrito y compras correctamente implementado | 25% | ✅ Completo |
| Integración con sistema de permisos, control de permisos y gestión de errores | 15% | ✅ Completo |
| README y presentación final clara y completa | 10% | ✅ Completo |

**Total**: 100% ✅

---

## Características Adicionales Implementadas

Más allá de los requisitos mínimos, se implementaron las siguientes mejoras:

### Frontend Moderno
- React 18 + TypeScript
- Vite como build tool
- Tailwind CSS para estilos
- Context API para estado global (Auth + Cart)
- React Router DOM para navegación
- Diseño responsive mobile-first

### Backend Robusto
- Arquitectura MVC completa
- Validaciones en múltiples capas
- Manejo de errores centralizado
- Logging de operaciones
- JWT para autenticación segura
- Bcrypt para hash de contraseñas

### Funcionalidades Extra
- Sistema de categorías para productos
- Búsqueda y filtrado de productos
- Exportación a Google Sheets
- Integración con WhatsApp
- Panel de estadísticas de ventas
- Upload de imágenes de productos
- Comprobantes de pago con imagen
- Estados de pedidos (pendiente, listo, entregado)
- Modo DEMO para presentación

### Deployment
- Desplegado en Vercel (Production)
- Variables de entorno configuradas
- API serverless
- Frontend estático optimizado

---

## Tecnologías Utilizadas

### Backend
- Node.js 18+
- Express 4.18
- SQLite (better-sqlite3)
- JWT (jsonwebtoken)
- Bcrypt
- Multer (upload de archivos)

### Frontend
- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- Lucide React (iconos)
- React Router DOM 6

### DevOps
- Git/GitHub
- Vercel (deployment)
- npm (package manager)

---

## URLs del Proyecto

- **Demo en Vivo**: https://demo-sanpaholmes.vercel.app
- **Panel Admin**: https://demo-sanpaholmes.vercel.app/vendor/login
- **Repositorio**: https://github.com/marcostoledo96/demo_sanpaholmes

### Credenciales de Prueba
- Usuario: `admin`
- Contraseña: `admin123`

### Roles del Panel
- **Admin**: acceso total a usuarios, roles, catálogo y compras.
- **Vendedor**: gestiona productos y seguimiento de pedidos.
- **Visitador**: monitorea ventas en modo solo lectura para control operativo.

---

## Conclusión

El proyecto cumple con todos los objetivos planteados y supera las expectativas al incluir:
- Interfaz de usuario moderna y profesional
- Deployment en producción
- Documentación completa
- Características adicionales que mejoran la experiencia del usuario

El sistema está listo para ser presentado y evaluado.
