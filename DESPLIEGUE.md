# Instrucciones de Despliegue - Sistema de Préstamos entre Locales

Este documento contiene las instrucciones para desplegar la aplicación de gestión de préstamos entre locales en un servidor gratuito (Vercel para el frontend y Render para el backend).

## Preparación del Backend para Producción

1. Primero, necesitamos modificar el archivo `package.json` del backend para incluir los scripts de inicio:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "init-db": "node initDb.js"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

2. Crear un archivo `.gitignore` para excluir archivos innecesarios:

```
node_modules/
.env
*.log
db/*.db
```

3. Inicializar la base de datos antes del despliegue ejecutando:
```
npm run init-db
```

## Despliegue del Backend en Render

1. Crear una cuenta en [Render](https://render.com/) si aún no tienes una.

2. Desde el dashboard, selecciona "New Web Service".

3. Conecta tu repositorio de GitHub o sube el código directamente.

4. Configura el servicio:
   - **Nombre**: prestamos-app-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. En la sección "Environment Variables", agrega:
   - `NODE_ENV`: production
   - `PORT`: 10000 (Render asignará automáticamente un puerto)
   - `JWT_SECRET`: una_clave_secreta_larga_y_compleja

6. Haz clic en "Create Web Service" y espera a que se complete el despliegue.

7. Anota la URL del servicio (será algo como `https://prestamos-app-backend.onrender.com`).

## Preparación del Frontend para Producción

1. Modifica el archivo `package.json` del frontend para incluir la URL del backend:

```json
{
  "proxy": "https://prestamos-app-backend.onrender.com"
}
```

2. Actualiza el archivo `.env` en el directorio del frontend:

```
REACT_APP_API_URL=https://prestamos-app-backend.onrender.com
```

3. Construye la versión de producción del frontend:

```
npm run build
```

## Despliegue del Frontend en Vercel

1. Crear una cuenta en [Vercel](https://vercel.com/) si aún no tienes una.

2. Instala la CLI de Vercel:

```
npm install -g vercel
```

3. Desde el directorio del frontend, ejecuta:

```
vercel login
```

4. Despliega la aplicación:

```
vercel --prod
```

5. Sigue las instrucciones en pantalla:
   - Confirma el directorio del proyecto
   - Configura el nombre del proyecto (por ejemplo, "prestamos-app")
   - Confirma que es un proyecto de React

6. Una vez completado, Vercel proporcionará una URL para tu aplicación (por ejemplo, `https://prestamos-app.vercel.app`).

## Configuración de Cuentas para Cada Local

La aplicación viene preconfigurada con 6 cuentas para los locales:

| Local | Usuario | Contraseña |
|-------|---------|------------|
| Local 1 | local1 | local1 |
| Local 2 | local2 | local2 |
| Local 3 | local3 | local3 |
| Local 4 | local4 | local4 |
| Local 5 | local5 | local5 |
| Local 6 | local6 | local6 |

Para cambiar las contraseñas:

1. Accede a la aplicación con las credenciales predeterminadas.
2. Por seguridad, se recomienda cambiar estas contraseñas después del primer inicio de sesión.

## Verificación del Despliegue

1. Accede a la URL proporcionada por Vercel.
2. Inicia sesión con alguna de las cuentas de local.
3. Verifica que puedas:
   - Crear nuevos vales
   - Ver el historial de vales
   - Filtrar vales
   - Exportar a CSV

## Solución de Problemas Comunes

- **Error de conexión al backend**: Verifica que la URL del backend sea correcta en el archivo `.env` y en `package.json`.
- **Error de autenticación**: Asegúrate de que el `JWT_SECRET` esté configurado correctamente en el backend.
- **Base de datos vacía**: Ejecuta el script de inicialización de la base de datos en el servidor.

## Mantenimiento

- La versión gratuita de Render puede hibernar después de períodos de inactividad. La primera solicitud después de la hibernación puede tardar unos segundos.
- Vercel mantiene tu frontend siempre disponible en su plan gratuito.
- Realiza copias de seguridad periódicas de la base de datos SQLite.
