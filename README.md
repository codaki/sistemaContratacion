# Sistema de Contratación - Guía de Uso

Este repositorio contiene el código fuente de un sistema de contratación, que consta de un backend (server) y un frontend (sistemaContratacion-main).

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado Node.js en tu sistema. Además, debes contar con una instancia de PostgreSQL para la base de datos.

## Backend (Server)

### Pasos para configurar y ejecutar el backend:

1. Navega a la carpeta 'server': `cd server`.
2. Instala las dependencias: `npm install`.
3. Crea un archivo de configuración '.env' en la carpeta 'server' con las variables de entorno necesarias, como la configuración de la base de datos y cualquier otra información sensible.
4. Ejecuta el servidor: `npm start`.

El backend estará disponible en http://localhost:3000.

## Frontend (sistemaContratacion-main)

### Pasos para configurar y ejecutar el frontend:

1. Navega a la carpeta 'sistemaContratacion-main': `cd sistemaContratacion-main`.
2. Instala las dependencias: `npm install`.
3. Inicia la aplicación: `npm start`.

El frontend estará disponible en http://localhost:8080.

## Base de Datos

### Pasos para configurar la base de datos:

1. Abre pgAdmin o cualquier otra herramienta para gestionar PostgreSQL.
2. Crea una nueva base de datos llamada 'SistemaPostulacion'.
3. Haz clic en 'Restore' o 'Restaurar' y selecciona el archivo que contiene el script de la base de datos. Asegúrate de que el script sea compatible con la versión de PostgreSQL que estás utilizando.

## ¡Listo!

Ahora deberías tener el backend, el frontend y la base de datos configurados y funcionando. Accede al frontend desde tu navegador y comienza a utilizar el sistema de contratación.

Si encuentras algún problema durante la configuración o el uso, consulta la documentación proporcionada en cada carpeta o ponte en contacto con el equipo de soporte.

¡Gracias por utilizar nuestro sistema de contratación!
