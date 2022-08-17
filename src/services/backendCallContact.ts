import api from './api';

/**
 *
 * @param body request's body for adding new contact
 * @returns response from server
 */
export async function add(body: any): Promise<any> {
  const response = await api.post('/contacts', body);
  return response.data;
}

/**
 *
 * @returns all of user's contacts from contacts table
 */
export async function readMyContacts(): Promise<any> {
  const response = await api.get('/contacts');
  return response.data;
}

/**
 *
 * @param body request's body for editing existing contact
 * @returns response from server
 */
export async function editContact(body: any, contactId: number): Promise<any> {
  const response = await api.put(`/contacts/` + contactId, body);
  return response.data;
}

/**
 *
 * @param contactId key for targeting contact to delete from contact's table
 * @returns response from server
 */
export async function deleteContact(contactId: number): Promise<any> {
  const response = await api.delete(`/contacts/` + contactId);
  return response.data;
}
