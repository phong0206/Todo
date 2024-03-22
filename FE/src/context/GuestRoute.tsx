import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const GuestRoute: React.FC = ({ children }: any) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('GuestRoute needs to be inside an AuthProvider');
  }
  const { user } = authContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.verified) {
      navigate('/admin/post');
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default GuestRoute;
