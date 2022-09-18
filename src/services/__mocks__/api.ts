export const contactArray = [
  {
    id: 1,
    name: "a",
    email: "string",
    workNumber: "string",
    homeNumber: "string",
    phoneNumber: "string",
    favourite: true,
    photograph: "string",
  },
  {
    id: 2,
    name: "b",
    email: "string",
    workNumber: "string",
    homeNumber: "string",
    phoneNumber: "string",
    favourite: false,
    photograph: "string",
  },
  {
    id: 3,
    name: "x",
    email: "string",
    workNumber: "string",
    homeNumber: "string",
    phoneNumber: "string",
    favourite: true,
    photograph: "string",
  },
];


module.exports = {
  post: (url: string, body: any = "without any body") => {
    return {
      data: {
        data: body,
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
  get: (url: string) => {
    return {
      data: {
        data: contactArray,
      },
    };
  },
};
