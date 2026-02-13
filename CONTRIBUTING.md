# Guía de Contribución

Gracias por tu interés en contribuir a Math React Platform. Este documento proporciona las directrices y mejores prácticas para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Comenzando](#comenzando)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Convenciones de Código](#convenciones-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Revisión de Código](#revisión-de-código)

## 🤝 Código de Conducta

Este proyecto se adhiere a un código de conducta profesional. Se espera que todos los contribuyentes:

- Sean respetuosos y considerados
- Acepten críticas constructivas
- Se enfoquen en lo que es mejor para el proyecto
- Muestren empatía hacia otros miembros de la comunidad

## 🚀 Comenzando

### Requisitos Previos

- Node.js v22.20.0
- pnpm (gestor de paquetes)
- Git

### Setup Inicial

1. **Clona el repositorio:**

```bash
git clone [url-del-repositorio]
cd math-react-platform-front
```

2. **Instala dependencias:**

```bash
pnpm install
```

3. **Configura las variables de entorno:**

```bash
cp .env.example .env
# Edita .env con tus valores
```

4. **Verifica que todo funcione:**

```bash
pnpm type-check
pnpm lint
pnpm format:check
pnpm dev
```

## 🔄 Flujo de Trabajo

### Estrategia de Branching

El proyecto usa la siguiente estructura:

```
main (producción)
  ├── feature/nueva-funcionalidad
  ├── fix/correccion-bug
  └── refactor/mejora-codigo
```

### Crear una Nueva Branch

1. **Asegúrate de estar actualizado:**

```bash
git checkout main
git pull origin main
```

2. **Crea tu branch desde main:**

```bash
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/nombre-descriptivo
```

**Naming de branches:**

- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bugs
- `refactor/` - Refactorización de código
- `docs/` - Cambios en documentación
- `test/` - Agregar o modificar tests
- `chore/` - Tareas de mantenimiento

**Ejemplos:**

```bash
feature/exercise-difficulty-filter
fix/auth-token-refresh
refactor/simplify-store-structure
docs/update-readme
```

## 📝 Convenciones de Código

### Nomenclatura de Archivos

| Tipo        | Convención                       | Ejemplo                  |
| ----------- | -------------------------------- | ------------------------ |
| Componentes | `PascalCase.tsx`                 | `ExerciseCard.tsx`       |
| Hooks       | `camelCase.ts` con prefijo `use` | `useExercises.ts`        |
| Utils       | `camelCase.ts`                   | `formatDate.ts`          |
| Types       | `[name].types.ts`                | `exercise.types.ts`      |
| Estilos     | `ComponentName.styles.ts`        | `ExerciseCard.styles.ts` |
| Schemas     | `ComponentName.schema.ts`        | `ExerciseForm.schema.ts` |
| Tests       | `ComponentName.test.tsx`         | `ExerciseCard.test.tsx`  |
| Constantes  | `name.ts`                        | `routes.ts`, `api.ts`    |

### Estructura de Componentes

```typescript
// 1. Imports (orden: React → externos → internos → relativos → tipos → estilos)
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useExercises } from '@/features/exercises/hooks/useExercises';
import { ExerciseCard } from './ExerciseCard';
import type { Exercise } from '../types/exercise.types';
import { StyledContainer } from './ExerciseList.styles';

// 2. Types/Interfaces
interface ExerciseListProps {
  filters?: ExerciseFilters;
}

// 3. Constantes (si las hay)
const ITEMS_PER_PAGE = 10;

// 4. Componentes helper (fuera del componente principal)
const EmptyState = () => No hay ejercicios;

// 5. Componente principal
export const ExerciseList = ({ filters }: ExerciseListProps) => {
  // 5.1 Hooks de estado
  const [page, setPage] = useState(1);

  // 5.2 Custom hooks
  const { data, isLoading } = useExercises(filters);

  // 5.3 Funciones
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // 5.4 useEffect
  useEffect(() => {
    // ...
  }, []);

  // 5.5 Early returns
  if (isLoading) return ;
  if (!data?.length) return ;

  // 5.6 Render
  return (

      {/* JSX */}

  );
};
```

### TypeScript

- ✅ Usar `interface` para props y objetos
- ✅ Usar `type` para unions, intersections y utilities
- ✅ Usar `import type` para importar solo tipos
- ✅ Derivar tipos de schemas Zod con `z.infer<>`
- ❌ Evitar `any`, usar `unknown` cuando sea necesario
- ❌ No usar prefijo `I` en interfaces

```typescript
// ✅ Correcto
interface ButtonProps {
  label: string;
  onClick: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

import type { Exercise } from './types';

// ❌ Evitar
interface IButtonProps { ... }
const data: any = response;
```

### Estilos

- ✅ Usar Styled Components (Emotion) en archivos `.styles.ts`
- ✅ Aprovechar el theme de MUI
- ✅ Usar `sx` prop solo para estilos one-off simples
- ❌ No usar CSS modules o archivos `.css`

```typescript
// ExerciseCard.styles.ts
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));
```

### Organización de Imports

```typescript
// 1. React y core
import { useState, useEffect } from 'react';

// 2. Externos (alfabético)
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

// 3. Internos con @ (alfabético)
import { useExercises } from '@/features/exercises/hooks/useExercises';
import { ROUTES } from '@/shared/constants/routes';

// 4. Relativos (alfabético)
import { ExerciseCard } from './ExerciseCard';

// 5. Types
import type { Exercise } from '../types/exercise.types';

// 6. Estilos
import { StyledContainer } from './ExerciseList.styles';
```

## 💬 Commits

### Conventional Commits

Usa el formato: `<type>(<scope>): <subject>`

**Types:**

- `feat` - Nueva funcionalidad
- `fix` - Corrección de bug
- `docs` - Documentación
- `style` - Formato de código
- `refactor` - Refactorización
- `test` - Tests
- `chore` - Mantenimiento
- `perf` - Performance

**Ejemplos:**

```bash
feat(exercises): add difficulty filter to list
fix(auth): resolve token refresh infinite loop
docs(readme): update installation instructions
style(components): format with prettier
refactor(store): simplify exercises slice
test(hooks): add tests for useExercises
chore(deps): update dependencies
perf(dashboard): optimize chart rendering
```

**Reglas:**

- ✅ Presente imperativo: "add" no "added" o "adds"
- ✅ Primera letra minúscula
- ✅ Sin punto final
- ✅ Mensaje descriptivo y claro
- ❌ Evitar commits vagos como "update", "fix", "wip"

### Commits Atómicos

- Cada commit debe representar un cambio lógico único
- Si necesitas usar "y" en el mensaje, probablemente debas dividirlo
- Commits pequeños y frecuentes > commits grandes y poco frecuentes

## 🔀 Pull Requests

### Antes de Crear un PR

Ejecuta estos comandos para verificar calidad:

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Format checking
pnpm format:check

# Build
pnpm build
```

Si hay errores, corrígelos antes de crear el PR:

```bash
# Auto-fix lint
pnpm lint:fix

# Auto-format
pnpm format
```

### Crear un Pull Request

1. **Push tu branch:**

```bash
git push origin feature/tu-feature
```

2. **Crea el PR hacia `main`**

3. **Completa la información del PR:**

**Título:** Usa conventional commits

```
feat(exercises): add difficulty filter
```

**Descripción:** Debe incluir:

- **¿Qué cambia?** - Descripción clara del cambio
- **¿Por qué?** - Motivación y contexto
- **¿Cómo probarlo?** - Pasos para verificar el cambio
- **Screenshots** - Si hay cambios visuales
- **Notas** - Cualquier información adicional relevante

**Ejemplo de descripción:**

```markdown
## ¿Qué cambia?

Agrega un filtro de dificultad en la lista de ejercicios que permite filtrar por easy, medium o hard.

## ¿Por qué?

Los usuarios necesitan poder filtrar ejercicios según su nivel para una mejor experiencia de aprendizaje.

## ¿Cómo probarlo?

1. Ve a `/exercises`
2. Selecciona un nivel de dificultad en el filtro
3. Verifica que solo se muestren ejercicios de ese nivel

## Screenshots

[Adjuntar capturas de pantalla]

## Notas

- Se añadió nuevo endpoint en RTK Query
- Se actualizó el estado del store para incluir el filtro activo
```

### Checklist de PR

Antes de marcar como "Ready for review":

- [ ] ✅ Código sigue convenciones de naming
- [ ] ✅ Imports organizados correctamente
- [ ] ✅ TypeScript sin errores
- [ ] ✅ ESLint sin errores
- [ ] ✅ Prettier aplicado
- [ ] ✅ Componentes con estructura correcta
- [ ] ✅ Estilos en archivos `.styles.ts`
- [ ] ✅ Loading states implementados
- [ ] ✅ Error handling apropiado
- [ ] ✅ Accesibilidad básica
- [ ] ✅ No hay console.logs olvidados
- [ ] ✅ Build exitoso
- [ ] ✅ Funcionalidad probada localmente

## 👀 Revisión de Código

### Como Autor

- Responde a los comentarios de manera constructiva
- Si no estás de acuerdo, explica tu razonamiento
- Haz los cambios solicitados o discute alternativas
- Marca conversaciones como resueltas cuando corresponda

### Como Reviewer

**Qué revisar:**

1. **Funcionalidad**
   - ¿El código hace lo que dice hacer?
   - ¿Hay edge cases no manejados?

2. **Calidad del Código**
   - ¿Sigue las convenciones del proyecto?
   - ¿Es legible y mantenible?
   - ¿Hay duplicación innecesaria?

3. **Performance**
   - ¿Hay optimizaciones innecesarias?
   - ¿Falta alguna optimización crítica?

4. **Seguridad**
   - ¿Hay vulnerabilidades potenciales?
   - ¿Los datos sensibles están protegidos?

5. **Tests** (cuando aplique)
   - ¿Los tests cubren casos importantes?
   - ¿Los tests son claros y mantenibles?

**Cómo dar feedback:**

- ✅ Sé específico y constructivo
- ✅ Sugiere alternativas concretas
- ✅ Explica el "por qué" de tus comentarios
- ✅ Usa preguntas para explorar el razonamiento
- ✅ Reconoce el buen trabajo

```markdown
# ✅ Buen feedback

"Esta función podría simplificarse usando un `useMemo` aquí para evitar
recalcular en cada render. ¿Qué opinas?"

# ❌ Mal feedback

"Esto está mal."
```

## 🐛 Reportar Bugs

Si encuentras un bug:

1. Verifica que no exista un issue similar
2. Crea un nuevo issue con:
   - Título descriptivo
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots/videos si aplica
   - Información del entorno (navegador, OS)

## ✨ Sugerir Mejoras

Para sugerir nuevas funcionalidades:

1. Abre un issue de tipo "Feature Request"
2. Describe el problema que resuelve
3. Propón una solución
4. Discute con el equipo antes de implementar

## 📚 Recursos Adicionales

- [Arquitectura del Proyecto](./docs/ARCHITECTURE.md)
- [Estructura de Carpetas](./docs/FOLDER_STRUCTURE.md)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [MUI Documentation](https://mui.com/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

## ❓ Preguntas

Si tienes preguntas sobre cómo contribuir, puedes:

- Abrir un issue con la etiqueta "question"
- Contactar a los maintainers del proyecto

---

¡Gracias por contribuir a Math React Platform! 🚀
