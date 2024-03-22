/* eslint-disable no-underscore-dangle */
import NotFound from './pages/NotFound';
import Info from './components/Home/Info';
import React, { Suspense, lazy } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import AuthProvider from './context/AuthProvider';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoute';
import GuestRoute from './context/GuestRoute';
import * as api from './apis/api';
import UseMarkdown from './pages/UseMarkdown';

function App() {
  const Home = lazy(() => import('./pages/Home'));
  const Login = lazy(() => import('./pages/Login'));
  const Post = lazy(() => import('./pages/Post'));
  const DetailBlog = lazy(() => import('./pages/DetailBlog'));
  const DeleteBlog = lazy(() => import('./pages/DeleteBlog'));
  const CardBlog = lazy(() => import('./pages/CardBlog'));
  const AddUnit = lazy(() => import('./pages/AddUnit'));

  const theme = createTheme();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<CircularProgress className="loading" />}>
          <SnackbarProvider>
            <Router>
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<NotFound />} path="*" />
                <Route
                  path="/admin/login"
                  element={
                    <GuestRoute>
                      <Login />
                    </GuestRoute>
                  }
                />

                <Route
                  path="/admin/post"
                  element={
                    <ProtectedRoute>
                      <Post />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/delete"
                  element={
                    <ProtectedRoute>
                      <DeleteBlog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/add-unit-category"
                  element={
                    <ProtectedRoute>
                      <AddUnit />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/use-markdown"
                  element={
                    <ProtectedRoute>
                      <UseMarkdown />
                    </ProtectedRoute>
                  }
                />
                <Route path="/blog/:slug" element={<DetailBlog />} />
                <Route path="/unit/:unitId" element={<CardBlog />} />
                <Route path="/category/:categoryId" element={<CardBlog />} />
              </Routes>
            </Router>
          </SnackbarProvider>
        </Suspense>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
