import axios from "axios";
import { URL_TO_BACKEND } from "../constants/common";
import { getAccessToken } from "./localStorage";

export async function uploadToCloud(formData: any): Promise<any> {
  const accessToken = await getAccessToken();

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
  const response = await axios.post(URL_TO_BACKEND + "/upload", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.data;
}
