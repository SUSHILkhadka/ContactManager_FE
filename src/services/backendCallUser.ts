import { URL_TO_BACKEND } from '../constants/common';
import { getAccessToken } from './localStorage';

export async function login(body: any): Promise<any> {

  const accessToken=await getAccessToken();
  const response = await fetch(URL_TO_BACKEND + '/login', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return await response.json();
}

export async function register(body: any): Promise<any> {
  const response = await fetch(URL_TO_BACKEND + '/register', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function editUser(body: any): Promise<any> {

  const accessToken=await getAccessToken();
  const response = await fetch(URL_TO_BACKEND + '/user', {
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return await response.json();
}
