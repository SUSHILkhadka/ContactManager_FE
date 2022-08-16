import api from './api';
import { getRefreshToken } from './localStorage';

export async function login(body: any): Promise<any> {
  // const response = await fetch(URL_TO_BACKEND + '/login', {
  //   method: 'POST',
  //   body,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // return await response.json();

  const response = await api.post('/login', body);
  return await response.data;
}

export async function register(body: any): Promise<any> {
  const response = await api.post('/register', body);
  return await response.data;
}
export async function logout(): Promise<any> {
  const response = await api.post('/logout', {
    refreshToken: getRefreshToken(),
  });
  return await response.data;
}

export async function editUser(body: any): Promise<any> {
  const response = await api.put('/user', body);
  return await response.data;
}
