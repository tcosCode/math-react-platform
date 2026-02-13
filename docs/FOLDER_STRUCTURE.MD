# Estructura de Carpetas

Este documento proporciona una visión detallada de la organización de carpetas del proyecto.

## 📂 Estructura Completa

```
math-react-platform-front/
│
├── .github/                      # Configuración de GitHub
│   └── workflows/                # GitHub Actions
│       └── ci.yml               # CI/CD pipeline
│
├── docs/                         # Documentación del proyecto
│   ├── ARCHITECTURE.md          # Arquitectura y decisiones técnicas
│   └── FOLDER_STRUCTURE.md      # Este archivo
│
├── public/                       # Assets estáticos (servidos tal cual)
│   ├── favicon.ico
│   └── images/
│
├── src/                          # Código fuente
│   │
│   ├── features/                # Módulos de funcionalidad (organización por dominio)
│   │   │
│   │   ├── auth/                # Feature: Autenticación
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── store/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── exercises/           # Feature: Ejercicios matemáticos
│   │   │   ├── components/      # Componentes específicos de ejercicios
│   │   │   │   ├── ExerciseCard/
│   │   │   │   │   ├── ExerciseCard.tsx
│   │   │   │   │   ├── exercise-card.styles.ts
│   │   │   │   │   ├── exercise-card.types.ts
│   │   │   │   │   ├── exercise-card.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ExerciseList/
│   │   │   │   ├── ExerciseFilters/
│   │   │   │   └── ExerciseForm/
│   │   │   │       ├── ExerciseForm.tsx
│   │   │   │       ├── exercise-form.styles.ts
│   │   │   │       ├── exercise-form.schema.ts    # Validación Zod
│   │   │   │       └── index.ts
│   │   │   │
│   │   │   ├── hooks/           # Hooks específicos de ejercicios
│   │   │   │   ├── use-exercises.ts
│   │   │   │   ├── use-exercise-filters.ts
│   │   │   │   └── use-exercise-stats.ts
│   │   │   │
│   │   │   ├── pages/           # Páginas del feature
│   │   │   │   ├── ExercisesPage.tsx
│   │   │   │   └── ExerciseDetailPage.tsx
│   │   │   │
│   │   │   ├── store/           # Estado y API
│   │   │   │   ├── exercises-slice.ts      # Redux slice
│   │   │   │   └── exercises-api.ts        # RTK Query endpoints
│   │   │   │
│   │   │   ├── types/           # Tipos del dominio
│   │   │   │   └── exercise.types.ts
│   │   │   │
│   │   │   ├── constants/       # Constantes específicas
│   │   │   │   ├── difficulty.ts
│   │   │   │   └── categories.ts
│   │   │   │
│   │   │   ├── utils/           # Utilidades específicas
│   │   │   │   └── format-exercise.ts
│   │   │   │
│   │   │   └── index.ts         # Exports públicos del feature
│   │   │
│   │   ├── videoclases/         # Feature: Video clases
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   ├── store/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── dashboard/           # Feature: Dashboard principal
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   ├── store/
│   │   │   └── index.ts
│   │   │
│   │   └── home/                # Feature: Página de inicio (pública)
│   │       ├── components/
│   │       ├── pages/
│   │       └── index.ts
│   │
│   ├── shared/                  # Código compartido entre features
│   │   │
│   │   ├── components/          # Componentes reutilizables
│   │   │   │
│   │   │   ├── ui/              # Componentes UI básicos
│   │   │   │   ├── button/
│   │   │   │   ├── input/
│   │   │   │   ├── modal/
│   │   │   │   ├── LoadingScreen/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── forms/           # Componentes de formulario
│   │   │   │   ├── FormTextField/
│   │   │   │   ├── FormSelect/
│   │   │   │   ├── FormCheckbox/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── layout/          # Componentes de layout
│   │   │   │   ├── MainLayout/
│   │   │   │   │   ├── MainLayout.tsx
│   │   │   │   │   ├── main-layout.styles.ts
│   │   │   │   │   ├── header/
│   │   │   │   │   ├── footer/
│   │   │   │   │   ├── sidebar/
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── skeletons/       # Loading skeletons
│   │   │   │   ├── CardSkeleton.tsx
│   │   │   │   ├── ListSkeleton.tsx
│   │   │   │   ├── TableSkeleton.tsx
│   │   │   │   ├── PageSkeleton.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── errors/          # Error boundaries y fallbacks
│   │   │   │   ├── GlobalErrorBoundary.tsx
│   │   │   │   ├── FeatureErrorBoundary.tsx
│   │   │   │   ├── ErrorFallback.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── SEO.tsx          # Componente SEO reutilizable
│   │   │
│   │   ├── hooks/               # Custom hooks globales
│   │   │   ├── useDebounce.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/               # Utilidades globales
│   │   │   ├── formatters/
│   │   │   │   ├── format-date.ts
│   │   │   │   ├── format-number.ts
│   │   │   │   └── index.ts
│   │   │   ├── validators/
│   │   │   │   └── index.ts
│   │   │   └── helpers/
│   │   │       └── index.ts
│   │   │
│   │   ├── types/               # Types globales
│   │   │   ├── utils.ts         # Utility types (Nullable, Optional, etc.)
│   │   │   ├── api.ts           # Types de API
│   │   │   └── index.ts
│   │   │
│   │   └── constants/           # Constantes globales
│   │       ├── routes.ts        # Rutas de la aplicación
│   │       ├── api.ts           # Configuración de API
│   │       └── index.ts
│   │
│   ├── store/                   # Configuración de Redux
│   │   ├── index.ts             # Configuración del store
│   │   ├── hooks.ts             # Typed hooks (useAppDispatch, useAppSelector)
│   │   ├── api/                 # RTK Query base
│   │   │   └── index.ts         # API base configuration
│   │   └── middleware/          # Middleware personalizado
│   │       └── error-middleware.ts
│   │
│   ├── routes/                  # Configuración de rutas
│   │   ├── index.tsx            # Router principal y definición de rutas
│   │   ├── PublicRoute.tsx      # Guard para rutas públicas
│   │   └── PrivateRoute.tsx     # Guard para rutas privadas (Clerk)
│   │
│   ├── App.tsx                  # Componente raíz
│   ├── main.tsx                 # Entry point (ReactDOM.render)
│   └── vite-env.d.ts            # Types de Vite
│
├── .env                         # Variables de entorno (no commitear)
├── .env.example                 # Ejemplo de variables de entorno
├── .gitignore                   # Archivos ignorados por Git
├── eslint.config.js             # Configuración de ESLint
├── prettier.config.mjs          # Configuración de Prettier
├── tsconfig.json                # Configuración raíz de TypeScript
├── tsconfig.app.json            # Configuración TS para la app
├── tsconfig.node.json           # Configuración TS para Node
├── vite.config.ts               # Configuración de Vite
├── package.json                 # Dependencias y scripts
├── pnpm-lock.yaml              # Lock file de pnpm
├── README.md                    # Documentación principal
├── CONTRIBUTING.md              # Guía de contribución
└── CHANGELOG.md                 # Historial de cambios
```

## 📖 Descripción de Directorios Principales

### `/src/features/`

Contiene todos los módulos de funcionalidad organizados por dominio. Cada feature es **autónomo** y encapsula toda su lógica relacionada.

**Características de un feature:**

- ✅ Independiente de otros features
- ✅ Tiene su propio estado (Redux slice)
- ✅ Tiene sus propios componentes
- ✅ Puede tener sus propias páginas
- ✅ Define sus propios tipos
- ✅ Exporta una API pública a través de `index.ts`

**Ejemplo de imports entre features:**

```typescript
// ✅ Correcto: usar la API pública del feature
import { ExerciseCard, useExercises } from '@/features/exercises';

// ❌ Incorrecto: acceder directamente a internals
import { ExerciseCard } from '@/features/exercises/components/ExerciseCard';
```

### `/src/shared/`

Código que es **reutilizable** entre múltiples features.

**¿Cuándo mover algo a shared?**

- ✅ Cuando el código es usado por 2+ features
- ✅ Cuando es genérico y no pertenece a un dominio específico
- ❌ No mover prematuramente (esperar a que se repita el uso)

**Subcarpetas importantes:**

#### `/shared/components/`

- **`ui/`**: Componentes básicos reutilizables (botones, inputs, modales)
- **`forms/`**: Wrappers de formularios integrados con react-hook-form + Zod
- **`layout/`**: Estructuras de layout (header, footer, sidebar)
- **`skeletons/`**: Loading states con Skeletons de MUI
- **`errors/`**: Error boundaries y páginas de error

#### `/shared/hooks/`

Custom hooks que pueden usarse en cualquier parte:

```typescript
// Ejemplos:
useDebounce();
useLocalStorage();
useMediaQuery();
usePrevious();
```

#### `/shared/utils/`

Funciones de utilidad puras:

```typescript
// Ejemplos:
formatDate();
formatCurrency();
validateEmail();
debounce();
```

#### `/shared/types/`

Types y utility types globales:

```typescript
// utils.ts
export type Nullable = T | null;
export type Optional = T | undefined;
export type ID = string;
```

#### `/shared/constants/`

Constantes usadas en múltiples features:

```typescript
// routes.ts
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  EXERCISES: '/exercises',
};

// api.ts
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL,
};
```

### `/src/store/`

Configuración central de Redux y RTK Query.

**Archivos clave:**

#### `index.ts` - Store configuration

```typescript
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    exercises: exercisesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
```

#### `hooks.ts` - Typed hooks

```typescript
export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook = useSelector;
```

#### `api/index.ts` - RTK Query base

Configuración base que todos los features extienden con `.injectEndpoints()`.

#### `middleware/` - Custom middleware

Middleware personalizado como el de manejo de errores global.

### `/src/routes/`

Configuración de React Router.

**Archivos:**

#### `index.tsx` - Definición de rutas

```typescript
export const AppRoutes = () => (

    } />



    } />

);
```

#### `PrivateRoute.tsx` - Guard con Clerk

Protege rutas que requieren autenticación.

#### `PublicRoute.tsx` - Guard para rutas públicas

Redirecciona si ya está autenticado.

### `/docs/`

Documentación técnica del proyecto.

**Archivos:**

- `ARCHITECTURE.md` - Decisiones arquitectónicas, patrones, convenciones
- `FOLDER_STRUCTURE.md` - Este archivo
- Futuros: `API.md`, `DEPLOYMENT.md`, etc.

## 🎯 Convenciones de Organización

### Estructura de un Componente

```
ComponentName/
├── ComponentName.tsx         # Componente principal
├── component-name.styles.ts   # Estilos (Emotion/styled-components)
├── component-name.types.ts    # Types específicos (opcional)
├── component-name.schema.ts   # Schema de validación Zod (si aplica)
├── component-name.test.tsx    # Tests (si aplica)
└── index.ts                  # Re-export
```

**Ejemplo:**

```
ExerciseCard/
├── ExerciseCard.tsx
├── exercise-card.styles.ts
├── exercise-card.types.ts
├── exercise-card.test.tsx
└── index.ts
```

### Barrel Exports (index.ts)

**✅ Usar en:**

- Puntos de entrada de features (`/features/exercises/index.ts`)
- Carpetas con múltiples componentes relacionados
- Carpetas de utilities

**❌ No usar en:**

- Todas las carpetas indiscriminadamente (puede causar imports circulares)
- Carpetas con un solo archivo

```typescript
// ✅ features/exercises/index.ts
export { ExerciseCard } from './components/ExerciseCard';
export { ExerciseList } from './components/ExerciseList';
export { useExercises } from './hooks/useExercises';
export type { Exercise, ExerciseFilters } from './types/exercise.types';
```

## 🔍 Búsqueda Rápida

### "¿Dónde va mi archivo?"

| Pregunta                           | Respuesta                        |
| ---------------------------------- | -------------------------------- |
| ¿Componente usado en 1 feature?    | `features/[feature]/components/` |
| ¿Componente usado en 2+ features?  | `shared/components/ui/`          |
| ¿Hook específico de feature?       | `features/[feature]/hooks/`      |
| ¿Hook usado en múltiples features? | `shared/hooks/`                  |
| ¿Tipo de dominio del feature?      | `features/[feature]/types/`      |
| ¿Tipo global o utility type?       | `shared/types/`                  |
| ¿Constante de un feature?          | `features/[feature]/constants/`  |
| ¿Constante global?                 | `shared/constants/`              |
| ¿Utilidad específica?              | `features/[feature]/utils/`      |
| ¿Utilidad reutilizable?            | `shared/utils/`                  |
| ¿Redux slice?                      | `features/[feature]/store/`      |
| ¿RTK Query endpoints?              | `features/[feature]/store/`      |
| ¿Configuración del store?          | `store/`                         |
| ¿Página/vista?                     | `features/[feature]/pages/`      |
| ¿Schema de validación?             | Junto al componente o `schemas/` |

## 📝 Ejemplos Prácticos

### Agregar un Nuevo Feature

```bash
# 1. Crear estructura del feature
mkdir -p src/features/profile/{components,hooks,pages,store,types,utils}

# 2. Crear archivos base
touch src/features/profile/index.ts
touch src/features/profile/store/profileSlice.ts
touch src/features/profile/store/profileApi.ts
touch src/features/profile/types/profile.types.ts
touch src/features/profile/pages/ProfilePage.tsx
```

### Agregar un Componente Compartido

```bash
# 1. Crear carpeta del componente
mkdir -p src/shared/components/ui/Avatar

# 2. Crear archivos
touch src/shared/components/ui/Avatar/Avatar.tsx
touch src/shared/components/ui/Avatar/Avatar.styles.ts
touch src/shared/components/ui/Avatar/index.ts

# 3. Exportar en barrel
# Editar src/shared/components/ui/index.ts
```

### Agregar una Utilidad

```bash
# Si es específica de un feature:
touch src/features/exercises/utils/calculateScore.ts

# Si es reutilizable:
touch src/shared/utils/helpers/calculatePercentage.ts
```

## 🚀 Mejores Prácticas

1. **Mantén features independientes**: Un feature no debería importar componentes internos de otro feature
2. **Usa la API pública**: Importa desde `@/features/[name]` no desde subcarpetas
3. **Evita acoplamiento**: Shared components no deberían conocer features específicos
4. **Co-localiza código relacionado**: Mantén juntos archivos que cambian juntos
5. **Mueve a shared solo cuando sea necesario**: No prematuramente
6. **Usa path aliases**: `@/` para imports limpios

---

**Última actualización**: Enero 2026
