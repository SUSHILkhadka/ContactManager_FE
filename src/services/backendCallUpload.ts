import api from './api';
export async function uploadToCloud(formData: any): Promise<any> {
  //mode nocors is required , which inturn don't allow authorication header in fetch
  // const response = await fetch(URL_TO_BACKEND+"/user/all", {
  //   // mode: "no-cors",
  //   method: "GET",
  //   // body: formData,
  //   headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${accessToken}`,
  //     },
  // });
  // return await response.json();

  //cors works here
  const response = await api.post('/upload', formData, {});
  return await response.data;
}
