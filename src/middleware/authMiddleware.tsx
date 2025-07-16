import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRoles?: string[];
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true, 
  requiredRoles = [] 
}) => {
  const { state } = useAppContext();
  const location = useLocation();

  if (requireAuth && !state.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    state.isAuthenticated && 
    requiredRoles.length > 0 && 
    state.user && 
    !requiredRoles.includes(state.user.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export const GuestGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useAppContext();

  if (state.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};