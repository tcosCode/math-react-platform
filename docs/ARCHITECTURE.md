# Arquitectura del Proyecto

## 📐 Principios de Arquitectura

Este proyecto sigue una arquitectura **basada en features/dominios**, donde cada funcionalidad principal está encapsulada en su propio módulo con sus componentes, lógica de estado, y servicios relacionados.

## 📁 Estructura de Carpetas

```
src/
├── features/              # Módulos principales de la aplicación
│   ├── auth/             # Autenticación con Clerk
│   ├── exercises/        # Ejercicios matemáticos
│   ├── videoclases/      # Video clases
│   ├── dashboard/        # Panel principal
│   └── home/             # Página de inicio (pública)
│
├── shared/               # Código compartido entre features
│   ├── components/       # Componentes reutilizables
│   │   ├── ui/          # Componentes UI básicos
│   │   ├── forms/       # Form wrappers y helpers
│   │   ├── layout/      # Componentes de layout
│   │   ├── skeletons/   # Skeletons reutilizables
│   │   └── errors/      # Error boundaries y fallbacks
│   ├── hooks/           # Custom hooks compartidos
│   ├── utils/           # Utilidades y helpers
│   ├── types/           # Types/interfaces globales
│   │   └── utils.ts     # Utility types (Nullable, Optional, ID, etc.)
│   └── constants/       # Constantes globales
│       ├── routes.ts
│       └── api.ts
│
├── store/               # Configuración de Redux
│   ├── index.ts         # Store configuration
│   ├── api/             # RTK Query API base
│   └── middleware/      # Middleware personalizado (error handling)
│
├── routes/              # Configuración de rutas
│   ├── index.tsx        # Router principal
│   ├── PublicRoute.tsx  # Guard para rutas públicas
│   └── PrivateRoute.tsx # Guard para rutas privadas
│
├── App.tsx              # Componente raíz
└── main.tsx             # Entry point
```

### Estructura de un Feature

Cada feature sigue esta estructura consistente:

```
features/[feature-name]/
├── components/          # Componentes específicos del feature
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── component-name.styles.ts
│       ├── component-name.types.ts    (si tiene tipos específicos)
│       ├── component-name.schema.ts   (validación Zod si aplica)
│       ├── component-name.test.tsx    (tests si aplica)
│       └── index.ts
├── hooks/              # Hooks específicos del feature
│   └── useSomething.ts
├── pages/              # Páginas del feature
│   └── ExercisesPage.tsx
├── services/           # Lógica de negocio (si no usa RTK Query)
├── store/              # Redux slice y RTK Query endpoints
│   ├── [feature]Slice.ts
│   └── [feature]Api.ts
├── types/              # Types específicos del feature
│   └── [feature].types.ts
├── constants/          # Constantes específicas del feature
│   └── difficulty.ts
├── utils/              # Utilidades específicas del feature
└── index.ts            # Exports públicos del feature
```

## 🗂️ Gestión de Estado

### Redux Toolkit

- **Patrón**: Un slice por cada feature
- **Ubicación**: `src/store/` para configuración global, `src/features/[feature]/store/` para slices específicos
- **Naming**: `[feature]Slice.ts` (ej: `exercisesSlice.ts`, `dashboardSlice.ts`)

**Ejemplo de estructura del store:**

```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authReducer from '@/features/auth/store/authSlice';
import exercisesReducer from '@/features/exercises/store/exercisesSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    exercises: exercisesReducer,
    // ... otros slices
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType;
export type AppDispatch = typeof store.dispatch;
```

### RTK Query

- **Uso**: Todas las peticiones HTTP se manejan con RTK Query
- **API Base**: `src/store/api/index.ts` - configuración base de RTK Query
- **Endpoints**: Cada feature define sus propios endpoints en `features/[feature]/store/[feature]Api.ts`
- **Retry**: Configurado con retry automático en errores de red
- **Cache**: Mantener defaults (60s), ajustar según necesidad específica

**Ejemplo de API base:**

```typescript
// src/store/api/index.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT || 30000,
  }),
  tagTypes: ['Exercises', 'VideosClasses', 'User'],
  endpoints: () => ({}),
});
```

**Ejemplo de endpoints por feature:**

```typescript
// src/features/exercises/store/exercisesApi.ts
import { api } from '@/store/api';
import type { Exercise } from '../types/exercise.types';

interface ExercisesResponse {
  data: Exercise[];
  meta?: {
    timestamp: number;
  };
}

export const exercisesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query({
      query: () => '/exercises',
      transformResponse: (response: ExercisesResponse) => response.data,
      providesTags: ['Exercises'],
    }),
    getExerciseById: builder.query({
      query: (id) => `/exercises/${id}`,
      transformResponse: (response: { data: Exercise }) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Exercises', id }],
    }),
    createExercise: builder.mutation>({
      query: (body) => ({
        url: '/exercises',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: Exercise }) => response.data,
      invalidatesTags: ['Exercises'],
    }),
    updateExercise: builder.mutation }>({
      query: ({ id, data }) => ({
        url: `/exercises/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: { data: Exercise }) => response.data,
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Exercises', id }],
    }),
    deleteExercise: builder.mutation({
      query: (id) => ({
        url: `/exercises/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Exercises'],
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useGetExerciseByIdQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
} = exercisesApi;
```

**Naming de endpoints**: Seguir patrón RESTful explícito:

- Queries: `getExercises`, `getExerciseById`
- Mutations: `createExercise`, `updateExercise`, `deleteExercise`

## 🛣️ Sistema de Rutas

### Estructura de Rutas

**Rutas Públicas:**

- `/` - Página de inicio (landing page)

**Rutas Privadas** (requieren autenticación con Clerk):

- `/dashboard` - Panel principal del usuario
- `/exercises` - Listado y gestión de ejercicios
- `/exercises/:id` - Detalle de un ejercicio específico
- `/videoclases` - Video clases disponibles
- `/videoclases/:id` - Reproductor de video clase

### Layout

- **Layout único**: Todas las rutas privadas comparten el mismo layout
- **Ubicación**: `src/shared/components/layout/MainLayout.tsx`
- **Componentes**: Header, Sidebar (opcional), Footer, contenido principal

### Guards de Autenticación

```typescript
// src/routes/PrivateRoute.tsx
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { MainLayout } from '@/shared/components/layout/MainLayout';
import { LoadingScreen } from '@/shared/components/ui/LoadingScreen';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return;
  if (!isSignedIn) return;

  return { children };
};
```

### Code Splitting

Todas las rutas deben usar lazy loading:

```typescript
// src/routes/index.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageSkeleton } from '@/shared/components/skeletons/PageSkeleton';

const ExercisesPage = lazy(() => import('@/features/exercises/pages/ExercisesPage'));
const VideoclasesPage = lazy(() => import('@/features/videoclases/pages/VideoclasesPage'));

export const AppRoutes = () => (

    }>




      }
    />
    {/* Más rutas */}

);
```

## 🎨 UI y Componentes

### Material-UI

- **Theme**: Se utiliza el theme por defecto de MUI sin customización
- **Componentes**: Uso directo de componentes MUI sin wrappers a menos que sea necesario para lógica específica

### Estilos

**Preferencia: Styled Components (Emotion)**

- **Librería**: `@emotion/styled` (ya incluido con MUI)
- **Patrón**: Los estilos personalizados deben ir en archivos separados
- **Naming**: `[nombre-del-componente].styles.ts`

**Estructura recomendada:**

```
components/
├── ExerciseCard/
│   ├── ExerciseCard.tsx        # Componente
│   ├── exercise-card.styles.ts  # Estilos
│   ├── exercise-card.types.ts   # Types (si los hay)
│   └── index.ts                # Export
```

**Ejemplo de uso:**

```typescript
// exercise-card.styles.ts
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

export const CardTitle = styled('h3')(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));
```

```typescript
// ExerciseCard.tsx
import { StyledCard, CardTitle } from './exercise-card.styles';

export const ExerciseCard = ({ title, description }) => {
  return (

      {title}
      {description}

  );
};
```

**Reglas de estilos:**

- ✅ Usar styled components para estilos personalizados complejos
- ✅ Aprovechar el theme de MUI para spacing, colores y breakpoints
- ✅ Archivos `.styles.ts` separados del componente
- ✅ Named exports para múltiples styled components
- ✅ Verificar contraste de colores manualmente en colores custom
- ⚠️ Usar `sx` prop de MUI solo para estilos one-off o muy simples
- ❌ Evitar CSS modules o archivos `.css` separados

### Sistema de Componentes

**Niveles de componentes:**

1. **Componentes UI básicos** (`src/shared/components/ui/`)
   - Wrappers simples de MUI cuando se requiere lógica adicional
   - Componentes de propósito general reutilizables

2. **Componentes de formularios** (`src/shared/components/forms/`)
   - Form wrappers integrados con react-hook-form
   - Field components con validación de Zod
   - Helpers para formularios comunes

3. **Componentes de skeletons** (`src/shared/components/skeletons/`)
   - `CardSkeleton`, `ListSkeleton`, `TableSkeleton`, `FormSkeleton`
   - Deben imitar la estructura visual del componente real

4. **Componentes de error** (`src/shared/components/errors/`)
   - `GlobalErrorBoundary` - Catch-all global
   - `FeatureErrorBoundary` - Para features específicos
   - `ErrorFallback` - UI cuando hay error

5. **Componentes de feature** (`src/features/[feature]/components/`)
   - Componentes específicos de cada feature
   - No se reutilizan fuera del feature

## 🚨 Manejo de Errores

### Error Boundaries

- **Error Boundary Global**: Captura errores críticos de toda la aplicación
- **Feature Error Boundaries**: Opcional para features específicos si se requiere manejo especial
- **Ubicación**: `src/shared/components/errors/`

### Middleware de RTK Query

```typescript
// src/store/middleware/errorMiddleware.ts
// Intercepta errores de RTK Query y muestra toasts automáticamente
```

**Niveles de error:**

- **Errores críticos (500, network)** → Error Boundary muestra página de error
- **Errores de validación (400, 422)** → Toast de Sonner (warning/error)
- **Errores de autenticación (401, 403)** → Redirect + toast (no cierra sesión automáticamente)
- **Errores de feature específicos** → Manejados en el componente
- **Errores de red sin conexión** → Sin tratamiento especial, toast estándar

### Toasts con Sonner

```typescript
import { toast } from 'sonner';

// Tipos de toast según error:
toast.error('Error al cargar ejercicios'); // Errores graves
toast.warning('Revisa los campos del formulario'); // Validaciones
toast.info('Recuerda guardar tus cambios'); // Información
toast.success('Ejercicio guardado'); // Éxito
```

**Mensajes de error**: Inline en componentes, no archivo de constantes centralizado.

## ⏳ Gestión de Loading States

### Jerarquía de Loading

1. **Full page loading** → `<CircularProgress />` centrado (solo carga inicial de app)
2. **Section/Feature loading** → `<Skeleton />` componentes de MUI
3. **Button loading** → `<Button loading>` (prop de MUI)
4. **Inline loading** → `<CircularProgress size="small" />`

### Pattern con RTK Query

```typescript
const { data, isLoading, isFetching } = useGetExercisesQuery();

// Primera carga - mostrar skeleton
if (isLoading) return;

// Refetch en background - mostrar data actual + indicator sutil (opcional)
// No bloquear UI completa

// Data lista
return;
```

**Reglas de loading:**

- ✅ Preferir siempre Skeletons de MUI (más elegantes que spinners)
- ✅ Skeleton debe imitar la estructura visual del contenido real
- ✅ Tiempo mínimo de skeleton para evitar "flashing" en cargas rápidas
- ✅ Animación de entrada (fade-in, slide-up) después del skeleton
- ❌ Evitar estados de loading anidados múltiples

## 📝 Formularios y Validación

### Stack de Formularios

- **React Hook Form**: Gestión del estado del formulario
- **Zod**: Validación de esquemas y tipos
- **@hookform/resolvers**: Integración entre ambas librerías
- **MUI Components**: Componentes visuales del formulario

### Patrón Recomendado

```typescript
// ExerciseForm.schema.ts
import { z } from 'zod';

export const exerciseSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  description: z.string().optional(),
});

export type ExerciseFormData = z.infer;
```

```typescript
// ExerciseForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { exerciseSchema, type ExerciseFormData } from './ExerciseForm.schema';

export const ExerciseForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      title: '',
      difficulty: 'medium',
    },
  });

  const onSubmit = (data: ExerciseFormData) => {
    // Lógica de submit
  };

  return {
    /* Más campos */
  };
};
```

### Schemas de Validación

- **Ubicación**:
  - `ComponentName.schema.ts` si el schema es específico de un componente
  - `features/[feature]/schemas/` si se reutiliza en múltiples componentes
- **Derivar tipos**: Siempre usar `z.infer<typeof schema>` para evitar duplicación

### Form Wrappers y Helpers

Crear componentes wrapper en `src/shared/components/forms/`:

- `FormTextField` - TextField integrado con react-hook-form
- `FormSelect` - Select integrado con react-hook-form
- `FormCheckbox` - Checkbox integrado con react-hook-form
- Helpers para manejo de errores y validación

### Convenciones de Accesibilidad

- ✅ Labels siempre visibles (no solo placeholders)
- ✅ Required indicator visual
- ✅ Errores comunicados con helperText (react-hook-form lo hace automáticamente)
- ✅ Navegación por teclado verificada (focus trap en modales)

## 🔐 Autenticación

### Acceso Abierto

- **Estado actual**: La aplicación es de acceso abierto (Open Access).
- **Autenticación**: No se requiere inicio de sesión para acceder a ningún recurso.
- **Rutas**: Todas las rutas son públicas.

## 🔄 Flujo de Datos

1. **Componente** llama a un hook de RTK Query
2. **RTK Query** realiza la petición HTTP al backend con retry automático
3. **Middleware** intercepta errores y muestra toasts según el tipo
4. **transformResponse** convierte respuesta envuelta (`{ data, meta }`) al tipo esperado
5. **Respuesta** se cachea automáticamente
6. **Componente** se re-renderiza con los datos
7. **Mutaciones** invalidan el cache según los tags definidos

## 🌐 API y Backend

### Estructura de Respuestas

El backend responde con formato envuelto:

```typescript
// Respuesta exitosa
{
  "data": {
    "id": "1",
    "title": "Ecuaciones lineales",
    "difficulty": "medium"
  },
  "meta": {
    "timestamp": 1234567890
  }
}

// Respuesta con paginación
{
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 100
  }
}
```

### Transformación de Datos

Usar `transformResponse` en RTK Query para extraer `data` del wrapper:

```typescript
getExercises: builder.query({
  query: () => '/exercises',
  transformResponse: (response: { data: Exercise[] }) => response.data,
}),
```

Si el backend usa `snake_case`, transformar a `camelCase` en `transformResponse`.

## 📊 SEO y Meta Tags

### React Helmet Async

**Componente SEO reutilizable:**

```typescript
// src/shared/components/SEO.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export const SEO = ({ title, description, keywords }: SEOProps) => {
  return (

      {title} | Math Platform

      {keywords && }

  );
};
```

**Meta tags globales:**

```typescript
// src/App.tsx
import { HelmetProvider, Helmet } from 'react-helmet-async';

export const App = () => (


      Math Platform




    {/* App content */}

);
```

**Meta tags dinámicos:**

```typescript
export const ExerciseDetailPage = () => {
  const { id } = useParams();
  const { data: exercise, isLoading } = useGetExerciseByIdQuery(id!);

  if (isLoading) return ;
  if (!exercise) return ;

  return (
    <>

      {/* Contenido */}
    </>
  );
};
```

## ♿ Accesibilidad (a11y)

### Nivel de Accesibilidad

**Nivel intermedio** - Balance entre esfuerzo y UX:

- Botones sin texto deben tener `aria-label`
- Inputs deben tener labels asociados (siempre visibles)
- Imágenes deben tener `alt`
- Roles ARIA donde MUI no los provee
- `aria-describedby` para errores de formulario (automático con react-hook-form)
- Estados de loading/disabled comunicados
- Navegación completa por teclado verificada
- Focus trap en modales/drawers

### Contraste de Colores

- MUI maneja esto bien por defecto
- **Verificación manual** de colores custom en styled components
- Herramientas: Chrome DevTools, WebAIM Contrast Checker

## 📦 Gestión de Dependencias

### Aliases de Importación

El proyecto usa path alias `@/` para importaciones limpias:

```typescript
// ❌ Evitar
import { Button } from '../../../shared/components/ui/Button';

// ✅ Preferir
import { Button } from '@/shared/components/ui/Button';
```

**Configuración en `tsconfig.app.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Organización de Imports

**Orden estricto:**

```typescript
// 1. React y dependencias core
import { useState, useEffect } from 'react';

// 2. Librerías externas (node_modules) - alfabético
import { Box, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// 3. Imports internos con alias (@/) - alfabético por carpeta
import { useExercises } from '@/features/exercises/hooks/useExercises';
import { Button as CustomButton } from '@/shared/components/ui/Button';
import { ROUTES } from '@/shared/constants/routes';

// 4. Imports relativos (mismo feature) - alfabético
import { ExerciseCard } from './ExerciseCard';
import { ExerciseFilters } from './ExerciseFilters';

// 5. Imports de tipos (agrupados)
import type { Exercise } from '../types/exercise.types';
import type { ExerciseFilters as Filters } from './ExerciseFilters.types';

// 6. Imports de estilos (al final)
import { StyledContainer, StyledHeader } from './ExerciseList.styles';

// Línea en blanco antes del código
```

**Reglas adicionales:**

- ✅ Usar `import type` para tipos (mejor tree-shaking)
- ✅ Barrel exports (`index.ts`) solo en puntos de entrada de features
- ❌ Evitar barrel exports en todas las carpetas (puede causar imports circulares)

## 🧩 Convenciones de Código

### Nomenclatura de Archivos

- **Componentes**: `PascalCase.tsx` (ej: `ExerciseCard.tsx`)
- **Hooks**: `camelCase.ts` con prefijo `use` (ej: `useExercises.ts`)
- **Utils**: `camelCase.ts` (ej: `formatDate.ts`)
- **Types**: `[feature].types.ts` para dominio (ej: `exercise.types.ts`)
- **Types específicos**: `ComponentName.types.ts` (ej: `ExerciseCard.types.ts`)
- **Estilos**: `ComponentName.styles.ts`
- **Schemas**: `ComponentName.schema.ts` (específico) o `schemas/[name].schema.ts` (reutilizable)
- **Tests**: `ComponentName.test.tsx`
- **Constantes**: `routes.ts`, `validation.ts`, `api.ts` (sin sufijo `.constants`)
- **Configuración**: `[nombre].config.ts` (ej: `clerk.config.ts`)
- **Servicios**: `[nombre].service.ts` (ej: `auth.service.ts`)

### Nomenclatura de Código

**Variables y Funciones:**

- `camelCase` para variables y funciones
- `PascalCase` para componentes y clases
- `UPPER_SNAKE_CASE` para constantes primitivas y objetos congelados

```typescript
// ✅ Correcto
const maxAttempts = 3;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const DIFFICULTY_COLORS = {
  easy: '#4caf50',
  medium: '#ff9800',
  hard: '#f44336',
} as const;

// Configuraciones mutables
const paginationConfig = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
};
```

**Types e Interfaces:**

- Sin prefijo `I` (ej: `User`, no `IUser`)
- Sufijos descriptivos:
  - `UserResponse` - Respuesta de API
  - `UserDTO` - Data Transfer Object
  - `UserCardProps` - Props de componente
  - `UserFormData` - Datos de formulario

**Enums y Constantes:**

- Preferir **const objects** sobre enums de TypeScript (mejor tree-shaking):

```typescript
// ✅ Preferir const objects
export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

// ✅ O union types directos para casos simples
export type Difficulty = 'easy' | 'medium' | 'hard';
export const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];
```

**Rutas:**

```typescript
// src/shared/constants/routes.ts
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  EXERCISES: '/exercises',
  EXERCISE_DETAIL: (id: string) => `/exercises/${id}`,
  VIDEOCLASES: '/videoclases',
  VIDEOCLASS_DETAIL: (id: string) => `/videoclases/${id}`,
} as const;
```

### Estructura de Componentes

**Orden de elementos dentro de un archivo:**

```typescript
// 1. Imports (ver sección de organización de imports)
import { useState } from 'react';
import { Box } from '@mui/material';
import type { Exercise } from '../types/exercise.types';
import { StyledCard } from './ExerciseCard.styles';

// 2. Types/Interfaces del componente
interface ExerciseCardProps {
  exercise: Exercise;
  onSelect: (id: string) => void;
}

// 3. Constantes del componente (si las hay)
const MAX_DESCRIPTION_LENGTH = 150;

// 4. Componentes helper (fuera del componente principal para evitar recreación)
const ExerciseCardHeader = ({ title }: { title: string }) => (
  <h3>{title}</h3>
);

// 5. Componente principal
export const ExerciseCard = ({ exercise, onSelect }: ExerciseCardProps) => {
  // 5.1 Hooks de estado (useState, useReducer)
  const [isExpanded, setIsExpanded] = useState(false);

  // 5.2 Custom hooks
  const { data, isLoading } = useExerciseStats(exercise.id);

  // 5.3 Funciones del componente
  const handleSelect = () => {
    onSelect(exercise.id);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // 5.4 useEffect (al final de los hooks)
  useEffect(() => {
    // Side effects
  }, [exercise.id]);

  // 5.5 Early returns (loading, error, empty states)
  if (isLoading) return <CardSkeleton />;
  if (!data) return null;

  // 5.6 Render
  return (
    <StyledCard>
      <ExerciseCardHeader title={exercise.title} />
      {/* Más JSX */}
    </StyledCard>
  );
};
```

**Props:**

- ✅ Destructuring en la firma del componente (más conciso)
- ⚠️ Props object solo si necesitas pasar `props` completo a otro componente

```typescript
// ✅ Preferir
export const ExerciseCard = ({ title, difficulty, onSelect }: Props) => {

// ⚠️ Solo si necesitas pasar props completo
export const ExerciseCard = (props: Props) => {
  return <AnotherComponent {...props} />;
};
```

**Event Handlers:**

- Inline para lógica trivial (1 línea)
- Función separada para lógica compleja o con parámetros

```typescript
// ✅ Inline para trivial
<Button onClick={() => setOpen(true)}>Open</Button>

// ✅ Función separada para complejo
const handleSubmit = (data: FormData) => {
  // Lógica compleja...
  validateData(data);
  sendToAPI(data);
  showToast('Success');
};

<Button onClick={handleSubmit}>Submit</Button>
```

### TypeScript

**Interface vs Type:**

- `interface` para props de componentes y objetos/entidades
- `type` para unions, intersections, utilities

```typescript
// ✅ Interface
interface User {
  id: string;
  name: string;
}

interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
}

// ✅ Type
type UserRole = 'student' | 'teacher' | 'admin';
type ApiResponse<T> = { data: T; error?: string };
type UserWithRole = User & { role: UserRole };
```

**Co-locación de tipos:**

- Props de componentes: En el mismo archivo del componente (si es simple)
- Props con muchos tipos auxiliares (5+): Archivo separado `ComponentName.types.ts`
- Tipos de dominio: `[feature].types.ts`

```typescript
// ExerciseCard.tsx - Props simples en el mismo archivo
interface ExerciseCardProps {
  exercise: Exercise;
  onSelect: (id: string) => void;
}

export const ExerciseCard = ({ exercise, onSelect }: ExerciseCardProps) => {
  // ...
};
```

**Utility Types Globales:**

```typescript
// src/shared/types/utils.ts
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string;
export type Timestamp = number;
export type ApiError = {
  message: string;
  code: string;
};
```

### Exports

- **Named exports**: Para componentes normales, hooks, utils, tipos
- **Default exports**: Solo para páginas principales

```typescript
// ✅ Named exports (preferir)
export const ExerciseCard = () => { ... };
export const useExercises = () => { ... };

// ✅ Default export (solo páginas)
// ExercisesPage.tsx
const ExercisesPage = () => { ... };
export default ExercisesPage;
```

**Barrel Exports:**

- ✅ Usar en puntos de entrada de features
- ❌ No usar en todas las carpetas (puede causar imports circulares)

```typescript
// features/exercises/index.ts
export { ExerciseCard } from './components/ExerciseCard';
export { ExerciseList } from './components/ExerciseList';
export { useExercises } from './hooks/useExercises';
export type { Exercise, ExerciseFilters } from './types/exercise.types';
```

## ⚡ Performance

### React Memoization

**Patrón preventivo en casos conocidos:**

```typescript
// ✅ Siempre memo en items de lista
export const ExerciseListItem = React.memo(({ exercise, onSelect }) => {
  return <StyledCard onClick={() => onSelect(exercise.id)}>...</StyledCard>;
});

// ✅ Siempre memo en componentes pesados
export const ExerciseChart = React.memo(({ data }) => {
  return <Recharts>...</Recharts>;
});

// ✅ useCallback para funciones pasadas a children memoizados
const handleSelect = useCallback((id: string) => {
  setSelected(id);
}, []);

// ✅ useMemo para cálculos costosos
const filteredExercises = useMemo(() => {
  return exercises.filter(e => e.difficulty === selectedDifficulty);
}, [exercises, selectedDifficulty]);

// ❌ No optimizar prematuramente todo
export const SimpleButton = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### Code Splitting

**Lazy loading de rutas:**

Todas las rutas deben usar lazy loading desde el inicio:

```typescript
// src/routes/index.tsx
import { lazy, Suspense } from 'react';
import { PageSkeleton } from '@/shared/components/skeletons/PageSkeleton';

const ExercisesPage = lazy(() => import('@/features/exercises/pages/ExercisesPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));

// Uso en Routes
<Route
  path="/exercises"
  element={
    <Suspense fallback={<PageSkeleton />}>
      <ExercisesPage />
    </Suspense>
  }
/>
```

**Lazy loading de componentes pesados:**

Especialmente para Recharts y componentes de visualización:

```typescript
const ExerciseChart = lazy(() => import('./ExerciseChart'));

export const Dashboard = () => (
  <Suspense fallback={<ChartSkeleton />}>
    <ExerciseChart data={data} />
  </Suspense>
);
```

### Optimización de Imágenes

```typescript
// Lazy loading nativo
<img src="..." loading="lazy" alt="..." />
```

### Bundle Analysis

Agregar script para analizar tamaño del bundle:

```json
// package.json
{
  "scripts": {
    "analyze": "vite-bundle-visualizer"
  }
}
```

Ejecutar periódicamente para detectar dependencias pesadas.

## 🔄 Git y Control de Versiones

### Conventional Commits

**Formato**: `<type>(<scope>): <subject>`

**Types disponibles:**

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Formato de código (no CSS)
- `refactor`: Refactorización sin cambios funcionales
- `test`: Tests
- `chore`: Tareas de mantenimiento
- `perf`: Mejoras de performance
- `ci`: Cambios en CI/CD

**Scopes basados en features:**

```bash
feat(exercises): add difficulty filter to exercise list
fix(auth): resolve token refresh issue
docs(architecture): update component structure guidelines
style(components): format ExerciseCard with prettier
refactor(store): simplify exercises slice
test(hooks): add tests for useExercises
chore(deps): update dependencies to latest versions
perf(dashboard): optimize chart rendering
```

### Estrategia de Branching

```
main (producción)
  ├── feature/exercise-difficulty-filter
  ├── feature/video-player-controls
  ├── fix/form-validation-bug
  └── refactor/simplify-store
```

**Flujo de trabajo:**

1. Crear branch desde `main`: `git checkout -b feature/new-feature`
2. Desarrollar y hacer commits (conventional commits)
3. Crear PR hacia `main`
4. Code review obligatorio
5. Merge a `main` cuando esté aprobado y CI pase

**Naming de branches:**

- Formato: `<type>/<description-in-kebab-case>`
- Ejemplos:
  - `feature/exercise-difficulty-filter`
  - `fix/auth-token-refresh`
  - `docs/update-architecture`
  - `refactor/simplify-store-structure`

### Pull Requests

- **Obligatorios** para todos los cambios
- **Code review obligatorio** antes de merge
- PR debe incluir:
  - Descripción clara del cambio
  - Screenshots si hay cambios visuales
  - Tests (cuando aplique)
  - Actualización de documentación (si es necesario)

### Commits

**Buenos commits:**

```bash
feat(exercises): add difficulty filter to exercise list
fix(auth): resolve infinite loop in token refresh
docs(readme): add environment setup instructions
```

**Malos commits (evitar):**

```bash
update
fix bug
wip
changes
```

**Enforcement**: Solo convención por ahora (sin commitlint), pero se puede agregar más adelante.

## 🔧 CI/CD

### GitHub Actions

El proyecto usa GitHub Actions para verificar calidad del código en cada PR y push:

**Checks automáticos:**

- Type checking (`pnpm type-check`)
- Linting (`pnpm lint`)
- Format checking (`pnpm format:check`)
- Build (`pnpm build`)

Los workflows están configurados en `.github/workflows/` y se ejecutan automáticamente en cada pull request y push a `main`.

## 📚 Documentación

### Estructura de Documentación

```
/
├── README.md              # Introducción y quick start
├── CONTRIBUTING.md        # Guía de contribución
├── .env.example          # Variables de entorno ejemplo
└── docs/
    ├── ARCHITECTURE.md    # Este documento
    ├── FOLDER_STRUCTURE.md
    └── [futuros docs]
```

### JSDoc para funciones complejas

```typescript
/**
 * Hook personalizado para gestionar formularios de ejercicios
 * @param defaultValues - Valores iniciales del formulario
 * @returns Métodos y estado del formulario con validación de Zod
 * @example
 * const { handleSubmit, errors } = useExerciseForm({
 *   title: '',
 *   difficulty: 'medium'
 * });
 */
export const useExerciseForm = (defaultValues: ExerciseFormData) => {
  // ...
};
```

## 🔍 Decisiones Pendientes

Las siguientes decisiones arquitectónicas están pendientes de definir a medida que el proyecto evolucione:

- [ ] Estrategia de testing (Jest, Vitest, React Testing Library)
- [ ] Estructura de i18n si se requiere múltiples idiomas
- [ ] Estrategia de error boundary y manejo de errores global (refinamiento)
- [ ] Monitoreo y analytics
- [ ] PWA y Service Workers (si se requiere funcionalidad offline)
- [ ] Estrategia de caché más avanzada con RTK Query
- [ ] Implementación de feature flags
- [ ] Optimización de SEO técnico (prerendering, SSR)

## 📝 Checklist de Revisión de PR

Antes de crear un PR, verificar:

- [ ] ✅ Código sigue convenciones de naming
- [ ] ✅ Imports organizados correctamente
- [ ] ✅ Componentes tienen estructura correcta
- [ ] ✅ Props tipados correctamente
- [ ] ✅ Estilos en archivo `.styles.ts` separado
- [ ] ✅ Schemas de Zod para validaciones
- [ ] ✅ Loading states con skeletons
- [ ] ✅ Error handling apropiado
- [ ] ✅ Accesibilidad básica (labels, aria-labels, alt)
- [ ] ✅ SEO si es página (componente SEO)
- [ ] ✅ Memoization en listas y componentes pesados
- [ ] ✅ Lazy loading si es ruta o componente pesado
- [ ] ✅ Conventional commit messages
- [ ] ✅ No hay console.logs olvidados
- [ ] ✅ Type check pasa (`pnpm type-check`)
- [ ] ✅ Lint pasa (`pnpm lint`)
- [ ] ✅ Format check pasa (`pnpm format:check`)

---

**Última actualización**: Enero 2026

**Nota**: Este documento es una guía viva y debe actualizarse a medida que el proyecto evoluciona y se toman nuevas decisiones arquitectónicas.
