/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect, createContext } from 'react';
import * as api from '../apis/api';

export const AuthContext = createContext(null);

interface Props {
  token: string;
}
const AuthProvider = React.memo((props: any) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  const updateToken = async (token: Props['token']) => {
    localStorage.setItem('access_token', token);
    api.setAccessToken(token);
    let res = await api.me();
    if (res.status === 200 && res.data) {
      setUser(res.data[0]);
    }
  };

  const updateUser = async (data: any) => {
    setUser(data);
  };

  const clear = async () => {
    localStorage.clear();
    setUser(null);
  };

  const value = {
    user,
    updateToken,
    updateUser,
    clear,
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        api.setAccessToken(token);
        let res = await api.me();
        if (res.data) {
          setUser(res.data[0]);
        }
      }
      setLoaded(true);
    };
    getUserInfo();
  }, []);
  if (!isLoaded) {
    return <div>Loading....</div>;
  }
  return <AuthContext.Provider value={value} {...props} />;
});

export default AuthProvider;
