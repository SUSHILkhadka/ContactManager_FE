import { contactArray } from "../../constants/common";
module.exports = {
  post: (url: string, body: any = "without any body") => {
    return {
      data: {
        data: body,
      },
    };
  },
  get: (url: string) => {
    return {
      data: {
        data: contactArray,
      },
    };
  },
  put: (url: string, body: any) => {
    return {
      data: {
        data: body,
      },
    };
  },
  delete: (url: string, body: any = "without any body") => {
    return {
      data: {
        data: body,
      },
    };
  },
};
