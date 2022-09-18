import { IContact } from '../interface/IContact';

export const getReduxContactInfoFromDatabaseData = (Obj: IContact) => {
  const body = {
    id: Obj.id,
    name: Obj.name,
    email: Obj.email,
    workNumber: Obj.workNumber ? Obj.workNumber : '',
    homeNumber: Obj.homeNumber ? Obj.homeNumber : '',
    phoneNumber: Obj.phoneNumber ? Obj.phoneNumber : '',
    photograph: Obj.photograph,
    favourite: Obj.favourite,
  };
  return body;
};
export const getContactBodyFromForm = (values: any) => {
  const body = {
    name: values.name.trim(),
    email: values.email,
    phoneNumber: values.phoneNumber ? values.phoneNumber.trim() : '',
    workNumber: values.workNumber ? values.workNumber.trim() : '',
    homeNumber: values.homeNumber ? values.homeNumber.trim() : '',
    favourite: Boolean(values.favourite),
  };
  return body;
};

export const getEditContactBodyFromForm = (values: any) => {
  const body = {
    name: values.name.trim(),
    email: values.email,
    phoneNumber: values.phoneNumber ? values.phoneNumber.trim() : '',
    workNumber: values.workNumber ? values.workNumber.trim() : '',
    homeNumber: values.homeNumber ? values.homeNumber.trim() : '',
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
    name: values.name.trim(),
    email: values.email,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };
  return body;
};

export const getEditBodyFromForm = (values: any) => {
  const body = {
    name: values.name.trim(),
    password: values.newPassword1,
    confirmPassword: values.newPassword2,
    oldPassword: values.oldPassword,
  };
  return body;
};
