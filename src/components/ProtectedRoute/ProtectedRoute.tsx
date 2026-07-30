import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material'; // اضافه شده برای لودینگ
import { usePlayerProfile } from '../../hooks/usePlayerProfile';
import { ROUTES } from '../../config/routes';

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // فرض بر این است که isHydrated از هوک برمی‌گردد
  const { profile, isHydrated } = usePlayerProfile();

  // ۱. اگر هنوز در حال لود شدن از لوکال استوریج هستیم، لودینگ نمایش بده (نه ریدایرکت)
  if (!isHydrated) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress />
        <Typography>در حال بررسی هویت...</Typography>
      </Box>
    );
  }

  // ۲. حالا که لود شدن تمام شده، اگر پروفایل وجود ندارد، ریدایرکت کن
  if (!profile?.firstName) {
    return <Navigate to={ROUTES.welcome} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
