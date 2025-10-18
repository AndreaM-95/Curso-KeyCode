# 📘 Documentación del Backend (NestJS)

**Nombre del proyecto:** API Backend (NestJS)  
**Versión actual:** v2.3.3
**Última actualización:** 13/10/2025  
**Autora:** Andrea Mejía  

---

## 🧾 Descripción general

API desarrollada con **NestJS** que gestiona usuarios y productos alimenticios.  
Incluye autenticación mediante **JWT** y encriptación de contraseñas con **bcrypt**.  
Conectada a base de datos **MySQL**, administrada con **DBeaver**.  
Las pruebas se realizan mediante **Postman**.

---

## ⚙️ Tecnologías utilizadas

- **NestJS** (Framework principal)
- **TypeScript**
- **MySQL** (Base de datos)
- **DBeaver** (Cliente de administración de BD)
- **Postman** (Pruebas de endpoints)
- **bcrypt** (Encriptación de contraseñas)
- **JWT** (Autenticación por tokens)

---

## 📂 Estructura del proyecto

```
src/
 ├── common/
 │   ├── exceptions
 │   │   └── bussines.exception.ts
 │   ├── filters
 │   │   └── http-exception.filter.ts
 │   ├── pipes
 │   │   └── parse-uppertrim.pipe.ts
 │   ├── utils
 ├── dto/
 │   ├── create-product.dto.ts
 │   ├── create-user.dto.ts
 │   ├── login.dto.ts
 │   ├── update-product.dto.ts
 │   └── update-user.dto.ts
 ├── entities/
 │   ├── product.entity.ts
 │   └── user.entity.ts
 ├── interfaces/
 │   ├── index.ts
 │   ├── IProducts.ts
 │   └── IUsers.ts
 ├── migrations/
 │   ├── 1759368651000-SeedUsers.ts
 │   ├── 1760043458506-InitMigration.ts
 │   ├── 1760317037889-AddRoleColumn.ts
 │   └── 1760333441173-ProductsMigration.ts
 ├── modules/
 |   ├── auth/
 │   |   ├── auth.controller.ts
 │   |   ├── auth.module.ts
 │   |   ├── auth.service.spec.ts
 │   |   ├── auth.service.ts
 |   |   ├── jwt.guard.ts
 │   |   ├── jwt.strategy.ts
 │   |   ├── roles.decorator.ts
 │   |   ├── roles.guard.spec.ts
 │   |   └── roles.guard.ts
 |   ├── products/
 │   |   ├── products.controller.spec.ts
 │   |   ├── products.controller.ts
 │   |   ├── products.module.ts
 │   |   ├── products.service.spec.ts
 │   |   └── products.service.ts
 │   └── users/
 │   |   ├── users.controller.spec.ts
 │   |   ├── users.controller.ts
 │   |   ├── users.module.ts
 │   |   ├── users.service.spec.ts
 │   |   └── users.service.ts
 ├── resources/
 │   └── ducumentation.md
 ├── app.controller.spec.ts
 ├── app.controller.ts
 ├── app.module.ts
 ├── app.service.ts
 ├── jest.config.ts
 └── main.ts
```

---

## 🚀 Endpoints principales

### 🔐 Autenticación
| Método | Ruta | Descripción | Requiere Token |
|--------|-------|--------------|----------------|
| `POST` | `/auth/register` | Registra un nuevo usuario | ❌ |
| `POST` | `/auth/login` | Inicia sesión y devuelve token JWT | ❌ |
| `GET` | `/auth/profile` | Inicia sesión y devuelve un request | ✅ |

---

### 👤 Usuarios
| Método | Ruta | Descripción | Requiere Token | Rol permitido |
|--------|-------|--------------|----------------|----------------|
| `GET` | `/users` | Obtiene todos los usuarios | ✅ | Admin |
| `GET` | `/users/:id` | Obtiene un usuario por ID | ✅ | Admin |
| `POST` | `/users` | Crea un usuario | ✅ | Admin |
| `PUT` | `/users/:id` | Actualiza un usuario | ✅ | Admin |
| `DELETE` | `/users/:id` | Elimina un usuario | ✅ | Admin |

---

### 🛍️ Productos
| Método | Ruta | Descripción | Requiere Token | Rol permitido |
|--------|-------|--------------|----------------|----------------|
| `GET` | `/products` | Lista todos los productos | ❌ | Libre |
| `GET` | `/products/available` | Obtiene un producto por su estado | ❌ | Libre |
| `GET` | `/products/:id` | Obtiene un producto por ID | ✅ | Admin - User |
| `GET` | `/products/by-name/:name` | Obtiene un producto por nombre | ❌ | Libre |
| `POST` | `/products` | Crea un nuevo producto | ✅ | Admin |
| `PUT` | `/products/:id` | Edita un producto existente | ✅ | Admin |
| `DELETE` | `/products/:id` | Cambia el estado del producto | ✅ | Admin |
| `DELETE` | `/products/:id` | Elimina un producto | ✅ | Admin |

---

## 🔑 Autenticación

- Los endpoints protegidos requieren un **token JWT** en el header:  
  ```
  Authorization: Bearer <token>
  ```
- Los tokens se generan al iniciar sesión (`/auth/login`).  
- Las contraseñas se almacenan **encriptadas con bcrypt** antes de guardarse en la base de datos.

---

## 🧪 Pruebas con Postman

- **Colección:** `Consultas-UsuariosProductos.postman_collection.json`
- **Variable de entorno:**  
  ```
  {{BASE_URL}} = http://localhost:4000
  ```

### Ejemplo de flujo de prueba

1. Registrar un usuario (`/auth/register`)
2. Iniciar sesión (`/auth/login`)
3. Copiar el token JWT devuelto
4. Usar el token para acceder a `/products` o `/users`

**Ejemplo de Login Request:**
```json
{
  "email": "user@ejemplo.com",
  "password": "123456"
}
```

**Ejemplo de Login Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## ⚙️ Configuración del entorno

Archivo `.env`:
```
PORT = 4000
APP_NAME= ManagerUsers
DB_HOST= localhost
DB_PORT= 3306
DB_USERNAME= nombre_de_usuario
DB_PASSWORD= contraseña
DB_NAME= nombre_base_de_datos
JWT_SECRET_KEY= llave_secreta
JWT_EXPIRES_IN= tiempo_expiracion_token
```

---

## 🧱 Versionamiento

| Versión | Fecha | Cambios |
|----------|--------|----------|
| v1.0.0 | 17/09/2025 | API En memoria |
| v1.1.0 | 17/09/2025 | Módulo de usuarios |
| v1.1.1 | 17/09/2025 | Crear usuarios |
| v1.1.2 | 17/09/2025 | Actualizar usuarios |
| v1.1.3 | 17/09/2025 | Listar usuarios |
| v1.1.4 | 17/09/2025 | Eliminar usuarios |
| v1.2.0 | 27/09/2025 | Módulo de productos |
| v1.2.1 | 27/09/2025 | Crear productos |
| v1.2.2 | 27/09/2025 | Actualizar productos |
| v1.2.3 | 27/09/2025 | Listar productos |
| v1.2.4 | 27/09/2025 | Eliminar productos |
| | | |
| v2.0.0 | 30/09/2025 | API En Base de datos |
| v2.1.0 | 30/09/2025 | Módulo de usuarios |
| v2.1.1 | 30/09/2025 | Crear usuarios |
| v2.1.2 | 30/09/2025 | Actualizar usuarios |
| v2.1.3 | 30/09/2025 | Listar usuarios |
| v2.1.4 | 30/09/2025 | Eliminar usuarios |
| v2.2.0 | 13/10/2025 | Módulo de productos |
| v2.2.1 | 13/10/2025 | Crear productos |
| v2.2.2 | 13/10/2025 | Actualizar productos |
| v2.2.3 | 13/10/2025 | Listar productos |
| v2.2.4 | 13/10/2025 | Eliminar productos |
| v2.3.0 | 13/10/2025 | Módulo de autenticación |
| v2.3.1 | 13/10/2025 | Inicio de sesión |
| v2.3.2 | 13/10/2025 | Registro de usuario |
| v2.3.3 | 13/10/2025 | Encriptación |
| v2.3.3 | 13/10/2025 | Rutas protegidas |
| v2.4.0 | 18/10/2025 | Testing de la API |
| v2.5.0 | 18/10/2025 | Documentación en swagger |

---

## 🧩 Notas adicionales

- Proyecto probado con **Postman** localmente.  
- Base de datos administrada con **DBeaver**.  
- Las rutas están protegidas con `JwtAuthGuard` excepto `/auth/register` y `/auth/login`.  
- Documentación de la API en Swagger.

---

📄 **Fin de la documentación**