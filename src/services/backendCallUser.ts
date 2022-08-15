import axios from 'axios';
import { URL_TO_BACKEND } from '../constants/common';
import { getAccessToken } from './localStorage';
axios.defaults.baseURL = URL_TO_BACKEND;
axios.defaults.headers.common['Authorization'] = "Bearer "+getAccessToken();
export async function login(body: any): Promise<any> {

  // const response = await fetch(URL_TO_BACKEND + '/login', {
  //   method: 'POST',
  //   body,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // return await response.json();

  
  const response = await axios.post('/login',body,{
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return await response.data;

}

export async function register(body: any): Promise<any> {
  const response = await axios.post('/register', body,{
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.data;


}

export async function editUser(body: any): Promise<any> {
  const accessToken=await getAccessToken();
  const response = await axios.put('/user',body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.data;
}
