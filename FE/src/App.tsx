/* eslint-disable no-underscore-dangle */
import NotFound from './pages/NotFound';
import React, { Suspense, lazy } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import AuthProvider from './context/AuthProvider';
import './App.css';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoute';
import GuestRoute from './context/GuestRoute';
import * as api from './apis/api';

function App() {
  const Home = lazy(() => import('./pages/Home'));
  const Login = lazy(() => import('./pages/Login'));
  const Register = lazy(() => import('./pages/Register'));
  const ProfileDetail = lazy(() => import('./pages/ProfileDetail'));

  const theme = createTheme();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<CircularProgress className="loading" />}>
          <SnackbarProvider>
            <Routes>
              <Route element={<NotFound />} path="*" />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileDetail />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route
                path="/login"
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                }
              />
            </Routes>
          </SnackbarProvider>
        </Suspense>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
