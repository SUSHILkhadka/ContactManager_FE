import { URL_TO_BACKEND } from '../constants/common';
import { getAccessToken } from './localStorage';
import axios from 'axios';
axios.defaults.baseURL = URL_TO_BACKEND;
axios.defaults.headers.common['Authorization'] = "Bearer "+getAccessToken();

  export async function add(body: any): Promise<any> {
  const response = await axios.post('/contact',body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.data;
}

export async function readMyContacts(): Promise<any> {
  const response = await axios.get('/contact', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.data;
}

export async function editContact(body:any,contactId: number): Promise<any> {
  const response = await axios.put(`/contact/`+contactId,body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.data;
}

export async function deleteContact(contactId: number): Promise<any> {
  const accessToken=await getAccessToken();
  const response = await axios.delete(`/contact/`+contactId, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.data;
}