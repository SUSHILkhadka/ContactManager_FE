import { URL_TO_BACKEND } from '../constants/common';

export async function login(body: any): Promise<any> {
  const response = await fetch(URL_TO_BACKEND + '/login', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
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