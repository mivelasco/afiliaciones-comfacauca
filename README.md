# Sistema de Afiliaciones - Comfacauca (Work In Progress)

Aplicación web desarrollada para la gestión digital del proceso de afiliación de trabajadores y beneficiarios, permitiendo el registro de información personal, clasificación del tipo de afiliado y almacenamiento de documentos asociados.

---

## Funcionalidades actuales

* Registro de afiliaciones
* Clasificación por tipo de afiliado y subtipo
* Subida y almacenamiento de documentos:
  * Documento de identidad (PDF, PNG, JPG)
  * Certificado escolar
  * Certificado de discapacidad
  * Otros posibles documentos en desarrollo
* Almacenamiento de información en MongoDB
* Procesamiento inicial mediante OCR utilizando Tesseract.js (en fase experimental)

---

## Tecnologías utilizadas

### Frontend

* React
* Vite

### Backend

* Node.js
* Express.js
* Multer (manejo de archivos)
* Tesseract.js (OCR)
* Sharp (preprocesamiento de imágenes)

### Base de datos

* MongoDB
* Mongoose

### Contenedores

* Docker
* Docker Compose

---

## Estado actual del proyecto

Actualmente el sistema permite registrar afiliaciones y almacenar la información del usuario junto con sus documentos.

El módulo OCR se encuentra en desarrollo. Se ha logrado la detección y extracción de texto desde documentos de identidad; sin embargo, se siguen realizando mejoras para aumentar la precisión del reconocimiento y la extracción automática de datos.

---

## Funcionalidades pendientes

* Mejorar la precisión del OCR
* Validación automática de documentos
* Implementación de sistema de autenticación y usuarios
* Consulta y administración de afiliaciones
* Mejoras generales de interfaz y corrección de errores

---

## Instalación y ejecución

### Requisitos

* Docker instalado
* Docker Compose instalado

### Ejecutar el proyecto

Desde la carpeta raíz del proyecto:

```
docker compose up --build
```

El sistema levantará los siguientes servicios:

* Frontend (Vite): http://localhost:5173
* Backend (API Express): http://localhost:3000
* Base de datos MongoDB (contenedor Docker)

---

## Estructura del proyecto

```
seminario-web/
│
├── frontend/      # Aplicación React
├── backend/       # API Express, OCR y lógica del servidor
├── uploads/       # Archivos cargados por los usuarios
├── docker-compose.yml
└── README.md
```

---

## Notas

Este proyecto se encuentra en fase de desarrollo activo. Algunas funcionalidades están en proceso de implementación y pueden presentar cambios durante el avance del proyecto.
