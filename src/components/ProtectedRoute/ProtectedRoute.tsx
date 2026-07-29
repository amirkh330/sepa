import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { usePlayerProfile } from '../../hooks/usePlayerProfile';
import { ROUTES } from '../../config/routes';

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { profile } = usePlayerProfile();
  // in first time profile is null after one sec profile available
  // if (!profile?.firstName) {
  //   return <Navigate to={ROUTES.welcome} replace />;
  // }

  return children ? <>{children}</> : <Outlet />;
}
