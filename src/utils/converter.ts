export const getContactBodyFromForm = (values: any) => {
  const body = {
    name: values.name,
    email: values.email,
    phoneNumber: values.phoneNumber,
    workNumber: values.workNumber,
    homeNumber: values.homeNumber,
    favourite: Boolean(values.favourite),
  };
  return body;
};

export const getEditContactBodyFromForm = (values: any) => {
    const body = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        workNumber: values.workNumber,
        homeNumber: values.homeNumber,
        favourite: Boolean(values.favourite),
      };
    return body;
  };

export const getLoginBodyFromForm = (values: any) => {
  const body = {
    email: values.email,
    password: values.password,
  };
  return body;
};

export const getRegisterBodyFromForm = (values: any) => {
  const body = {
    name: values.name,
    email: values.email,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };
  return body;
};


export const getEditBodyFromForm = (values: any) => {
    const body = {
        name: values.name,
        password: values.newPassword1,
        confirmPassword: values.newPassword2,
        oldPassword: values.oldPassword,
      };
    return body;
  };
  