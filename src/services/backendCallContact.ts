import api from './api';

export async function add(body: any): Promise<any> {
  const response = await api.post('/contacts', body);
  return await response.data;
}

export async function readMyContacts(): Promise<any> {
  const response = await api.get('/contacts');
  return await response.data;

  //////////////////////

  //   const response = await api.get('/contacts', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // return await response.data;
}

export async function editContact(body: any, contactId: number): Promise<any> {
  const response = await api.put(`/contacts/` + contactId, body);
  return await response.data;
}

export async function deleteContact(contactId: number): Promise<any> {
  const response = await api.delete(`/contacts/` + contactId);
  return await response.data;
}
