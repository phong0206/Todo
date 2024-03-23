/* eslint-disable @typescript-eslint/dot-notation */
import axios, { AxiosRequestConfig } from 'axios';
import { USER_TOKEN, API_URL } from '../utils/config';

interface Props {
  email?: string,
  password?: string,
  name?: string,
  token?: string
  age?: number
  todoId?: string,
  title?: string,
  description?: string,
  status?: string
  phoneNumber?: string
}
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10 * 1000,
  validateStatus: (status) => status < 500,
});

export const apiProtected = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10 * 1000,
  validateStatus: (status) => status < 500,
});

//user
export const login = async ({ email, password }: Props) => {
  try {
    const res = await api.post(
      '/user/auth/login',
      {
        email,
        password,
      },
      { withCredentials: true });
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const register = async ({ email, password, name }: Props) => {
  try {

    const res = await api.post(
      '/user/auth/register',
      {
        email,
        password,
        name,
      },
      {
        withCredentials: true,
      }
    );
    console.log(1231231, res)
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const updateUser = async ({ name, email, age, phoneNumber }: Props) => {
  try {

    const res = await apiProtected.put(
      '/user/auth/update',
      {
        name, email, age, phoneNumber
      },
      {
        withCredentials: true,
      }
    );
    console.log(1231231, res)
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const logout = async () => {
  try {
    const res = await apiProtected.post('/user/auth/logout');
    console.log(11111111, res)
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};


export const me = async () => {
  try {
    const res = await apiProtected.get('/user/auth/profile');
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

// todo

export const addTodo = async ({ title, description }: Props) => {
  try {
    const res = await apiProtected.post(
      '/todo/add-todo',
      {
        title,
        description,
      },
      { withCredentials: true });
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const getAllTodos = async (status: Props) => {
  try {
    const res = await apiProtected.post(
      '/todo/get-all-todos',
      {
        status
      },
      { withCredentials: true });
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const updateTodo = async (todoId: string, description: string) => {
  try {
    const res = await apiProtected.post(
      `/todo/update-todo/${todoId}`,
      {
        description
      },
      { withCredentials: true });
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    const res = await apiProtected.delete(`/todo/delete-todo/${todoId}`);
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const markTodo = async (todoId: string) => {
  try {
    const res = await apiProtected.get(`/todo/mark-todo/${todoId}`);
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

















export const setAccessToken = (token: Props) => {
  apiProtected.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
