import api from './api';

/**
 *
 * @param formData contains files appended to FormData from UploadImage component
 * @returns response i.e url of image after successfully uploading
 */
export async function uploadToCloud(formData: FormData): Promise<any> {
  //mode nocors is required , which inturn don't allow authorication header in fetch.
  //So fetch doesn't work here

  //cors works here
  const response = await api.post('/upload', formData, {});
  return response.data;
}
