import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute: React.FC = ({ children }: any) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('ProtectedRoute needs to be inside an AuthProvider');
  }
  const { user } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.verified) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
