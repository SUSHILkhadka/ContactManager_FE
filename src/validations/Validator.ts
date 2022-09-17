import * as yup from "yup";
const Validator = (inputs: any, schema: yup.ObjectSchema<any>): string[] => {
  try {
    schema.validateSync(inputs, {
      abortEarly: false,
    });
    return [];
  } catch (err: any) {
    let allCombinedError: string = "";
    err.inner.forEach((error: any) => {
      allCombinedError += error.message + ", ";
    });
    throw allCombinedError;
  }
};

export default Validator;
