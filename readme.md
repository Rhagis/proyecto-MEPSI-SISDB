 # API de la biblioteca

API REST para gestionar usuarios y publicaciones. Está desarrollada con Node.js, Express y PostgreSQL.

## Tecnologías

- Node.js y Express
- PostgreSQL mediante `pg`
- JWT para autenticación
- bcrypt para cifrar contraseñas
- CORS
- Jest para pruebas

## Instalación y ejecución

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Ejecutar las pruebas:

```bash
npm test
```

El servidor se inicia en:

```text
http://localhost:3000
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto con las credenciales de PostgreSQL y la clave para firmar los tokens:

```env
DB_USER=usuario_postgres
DB_HOST=localhost
DB_NAME=nombre_base_datos
DB_PASSWORD=contraseña
DB_PORT=5432
JWT_SECRET=clave_secreta
```

La aplicación comprueba la conexión con PostgreSQL al iniciarse.

## Respuesta inicial

### `GET /`

Comprueba que la API está disponible.

Respuesta:

```text
Bienvenido a la API de la biblioteca
```

## Autenticación

Las rutas protegidas requieren un token JWT obtenido mediante `POST /usuarios/login`.

El token debe enviarse utilizando el encabezado:

```http
Authorization: Bearer <token>
```

También se acepta el encabezado `token`:

```http
token: <token>
```

El token contiene el identificador y el nombre del usuario, y tiene una duración de una hora.

Si no se envía un token:

```json
{
	"message": "Token no proporcionado"
}
```

Código HTTP: `401 Unauthorized`.

Si el token es inválido o ha expirado:

```json
{
	"message": "Credenciales inválidas"
}
```

Código HTTP: `401 Unauthorized`.

## Usuarios

Ruta base: `/usuarios`

### Registrar usuario

#### `POST /usuarios/registrar`

No requiere autenticación.

Cuerpo de la petición:

```json
{
	"usuario": "juan",
	"email": "juan@example.com",
	"password": "Clave123"
}
```

La contraseña debe tener al menos ocho caracteres, una letra y un número. Solo se permiten letras y números.

Respuesta exitosa:

```json
{
	"message": "Usuario registrado exitosamente"
}
```

Código HTTP: `201 Created`.

Si faltan campos obligatorios:

```json
{
	"message": "Faltan campos obligatorios"
}
```

Código HTTP: `400 Bad Request`.

Si la contraseña no cumple las reglas:

```json
{
	"message": "La contraseña debe tener al menos 8 caracteres, al menos una letra y un número"
}
```

Código HTTP: `400 Bad Request`.

### Iniciar sesión

#### `POST /usuarios/login`

No requiere autenticación.

Cuerpo de la petición:

```json
{
	"usuario": "juan",
	"password": "Clave123"
}
```

Respuesta exitosa:

```json
{
	"message": "Login exitoso",
	"token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Código HTTP: `200 OK`.

Si el usuario no existe, la respuesta utiliza el código `404 Not Found`. Si la contraseña es incorrecta, utiliza `401 Unauthorized`. En ambos casos el mensaje es:

```json
{
	"message": "Credenciales incorrectas"
}
```

### Obtener usuario autenticado

#### `GET /usuarios/usuario`

Requiere autenticación.

Ejemplo:

```bash
curl http://localhost:3000/usuarios/usuario \
	-H "Authorization: Bearer <token>"
```

Respuesta:

```json
{
	"usuario": {
		"usuario": "juan",
		"email": "juan@example.com",
		"activo": true
	}
}
```

Código HTTP: `200 OK`.

### Eliminar usuario

#### `PUT /usuarios/eliminar`

Requiere autenticación. La eliminación es lógica: el usuario se conserva en la base de datos y su campo `activo` cambia a `false`.

Ejemplo:

```bash
curl -X PUT http://localhost:3000/usuarios/eliminar \
	-H "Authorization: Bearer <token>"
```

Respuesta exitosa:

```json
{
	"message": "Usuario eliminado exitosamente",
	"usuario": {
		"id": 1,
		"usuario": "juan",
		"email": "juan@example.com",
		"activo": false
	}
}
```

Código HTTP: `200 OK`.

## Publicaciones

Ruta base: `/publicaciones`. Todas sus rutas requieren autenticación JWT.

### Crear publicación

#### `POST /publicaciones/add`

Cuerpo de la petición:

```json
{
	"titulo": "Mi primera publicación",
	"contenido": "Contenido de la publicación"
}
```

Ejemplo:

```bash
curl -X POST http://localhost:3000/publicaciones/add \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <token>" \
	-d '{"titulo":"Mi primera publicación","contenido":"Contenido de la publicación"}'
```

Respuesta exitosa:

```json
{
	"message": "Publicación añadida correctamente"
}
```

Código HTTP: `201 Created`.

### Obtener publicaciones

#### `GET /publicaciones/all`

Ejemplo:

```bash
curl http://localhost:3000/publicaciones/all \
	-H "Authorization: Bearer <token>"
```

Respuesta:

```json
[
	{
		"titulo": "Mi primera publicación",
		"contenido": "Contenido de la publicación",
		"autor_nombre": "juan"
	}
]
```

La consulta obtiene el nombre del autor mediante una combinación (`INNER JOIN`) con la tabla `usuarios`. Actualmente, la respuesta no incluye el identificador de la publicación ni el identificador numérico del autor.

Código HTTP: `200 OK`.

### Eliminar publicación

#### `DELETE /publicaciones/delete/:id`

Requiere autenticación. Solo el autor de la publicación puede eliminarla.

Ejemplo:

```bash
curl -X DELETE http://localhost:3000/publicaciones/delete/1 \
	-H "Authorization: Bearer <token>"
```

Respuesta exitosa:

```json
{
	"message": "Publicación eliminada correctamente"
}
```

Código HTTP: `200 OK`.

Si el usuario no es el autor:

```json
{
	"message": "No tienes permiso para borrar la publicacion"
}
```

Código HTTP: `401 Unauthorized`.

## Modelo de datos

### Tabla `usuarios`

| Campo | Descripción |
| --- | --- |
| `id` | Identificador del usuario |
| `usuario` | Nombre de usuario |
| `email` | Correo electrónico |
| `contrasena` | Contraseña cifrada |
| `activo` | Estado lógico del usuario |

### Tabla `publicaciones`

| Campo | Descripción |
| --- | --- |
| `id` | Identificador de la publicación |
| `titulo` | Título de la publicación |
| `contenido` | Contenido de la publicación |
| `autor_id` | Identificador del usuario autor |

La relación entre las tablas es `usuarios.id` y `publicaciones.autor_id`.

Las consultas de publicaciones muestran el nombre del autor con el campo `autor_nombre`, pero no exponen `autor_id` en la respuesta de `GET /publicaciones/all`.

## Flujo de uso

1. Registrar un usuario con `POST /usuarios/registrar`.
2. Iniciar sesión con `POST /usuarios/login`.
3. Guardar el token JWT recibido.
4. Enviar el token en las rutas protegidas.
5. Crear, consultar o eliminar publicaciones.
6. El middleware valida el token antes de ejecutar las operaciones protegidas.

