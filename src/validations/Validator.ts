import * as yup from 'yup';

/**
 * inputs: is input object which is to be validated
 * schema: is yup object schema with constraints for validation defined
 * throws error
 */
const Validator = (inputs: any, schema: yup.ObjectSchema<any>): string[] => {
  try {
    schema.validateSync(inputs, {
      abortEarly: false,
    });
    return [];
  } catch (err: any) {
    let allCombinedError: string = '';
    err.inner.forEach((error: any) => {
      allCombinedError += error.message + ', ';
    });
    throw allCombinedError;
  }
};

export default Validator;
