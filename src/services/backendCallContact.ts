import { URL_TO_BACKEND } from '../constants/common';
import { getAccessToken } from './localStorage';

  export async function add(body: any): Promise<any> {
  const accessToken=await getAccessToken();
  const response = await fetch(URL_TO_BACKEND + '/contact', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return await response.json();
}

export async function readMyContacts(): Promise<any> {
  const accessToken=await getAccessToken();
  const response = await fetch(URL_TO_BACKEND + '/contact', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return await response.json();
}

export async function editContact(body:any,contactId: number): Promise<any> {
  const accessToken=await getAccessToken();
  const response = await fetch(URL_TO_BACKEND + `/contact/`+contactId, {
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return await response.json();
}

export async function deleteContact(contactId: number): Promise<any> {
  
  const accessToken=await getAccessToken();
  const response = await fetch(URL_TO_BACKEND + `/contact/`+contactId, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return await response.json();
}