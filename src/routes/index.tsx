import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PageSkeleton } from '@/shared/components/skeletons';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

// Lazy load pages
const HomePage = lazy(() =>
  import('@/features/home/pages').then((module) => ({
    default: module.HomePage,
  })),
);
const DashboardPage = lazy(
  () => import('@/features/dashboard/pages/DashboardPage'),
);
const ExercisesPage = lazy(
  () => import('@/features/exercises/pages/ExercisesPage'),
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        {/* Rutas Públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Rutas Privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          {/* Add more private routes here */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
