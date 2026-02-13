# Math React Platform - Frontend

Plataforma educativa de ejercicios matemáticos para nivel medio.

## 📋 Requisitos Previos

- **Node.js**: v22.20.0
- **pnpm**: Gestor de paquetes requerido

## 🚀 Instalación

```bash
# Instalar dependencias
pnpm install
```

## ⚙️ Configuración

1. Copia el archivo de variables de entorno de ejemplo:

```bash
cp .env.example .env
```

2. Configura las variables necesarias en `.env` (principalmente la URL del backend cuando esté disponible)

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia el servidor de desarrollo

# Build
pnpm build            # Compila el proyecto para producción
pnpm preview          # Preview del build de producción

# Linting y Formato
pnpm lint             # Ejecuta ESLint
pnpm lint:fix         # Ejecuta ESLint y corrige automáticamente
pnpm format           # Formatea el código con Prettier
pnpm format:check     # Verifica el formato sin modificar

# Type Checking
pnpm type-check       # Verifica los tipos de TypeScript
```

## 🏗️ Stack Tecnológico

### Core

- **React** 19.2.0 - Librería UI
- **TypeScript** ~5.9.3 - Tipado estático
- **Vite** 7.2.4 - Build tool y dev server

### UI/UX

- **Material-UI (MUI)** 7.3.6 - Framework de componentes
- **Emotion** 11.14.0 - CSS-in-JS
- **Recharts** 3.6.0 - Gráficos y visualizaciones

### Estado y Datos

- **Redux Toolkit** 2.11.2 - Gestión de estado global
- **React Redux** 9.2.0 - Bindings de Redux para React

### Routing

- **React Router DOM** 7.11.0 - Enrutamiento de la aplicación

### Formularios y Validación

- **React Hook Form** 7.70.0 - Gestión de formularios
- **Zod** 4.3.5 - Validación de esquemas
- **@hookform/resolvers** 5.2.2 - Integración Zod + React Hook Form

### Utilidades

- **Sonner** 2.0.7 - Sistema de notificaciones toast
- **React Helmet Async** 2.0.5 - Gestión de meta tags

### Herramientas de Desarrollo

- **ESLint** 9.39.1 - Linter de código
- **Prettier** 3.7.4 - Formateador de código
- **TypeScript ESLint** 8.46.4 - Reglas de ESLint para TypeScript

## 📁 Estructura del Proyecto

```
math-react-platform-front/
├── src/                  # Código fuente
├── public/               # Archivos estáticos
├── docs/                 # Documentación adicional
├── .env.example          # Ejemplo de variables de entorno
└── README.md            # Este archivo
```

Para más detalles sobre la arquitectura y organización del código, consulta la [documentación de arquitectura](./docs/ARCHITECTURE.md).

## 🤝 Contribución

Por favor lee [CONTRIBUTING.md](./CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviarnos pull requests.

## 📝 Documentación Adicional

- [Arquitectura del Proyecto](./docs/ARCHITECTURE.md)
- [Guía de Contribución](./CONTRIBUTING.md)
- [Estructura de Carpetas](./docs/FOLDER_STRUCTURE.md)

## 📄 Licencia

[Información de licencia pendiente]

---

**Nota**: Este proyecto está en desarrollo activo. El backend aún no está implementado.
