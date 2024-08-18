import * as Yup from 'yup';

export interface IFormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  terms?: string;
  image?: string;
  country?: string;
  [key: string]: string | undefined;
}

export type ImageType = string | File;

const schema = Yup.object().shape({
  name: Yup.string()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name should start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .positive('Age must be a positive number')
    .required('Age is required'),
  email: Yup.string()
    .email('Invalid email address, you should use @ symbol')
    .required('Email is required'),
  password: Yup.string()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      'Password should include 1 number, 1 uppercase, 1 lowercase letter, 1 special character. Your password is weak',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string()
    .oneOf(['male', 'female'], 'Select your gender')
    .required('Gender is required'),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the Terms and Conditions')
    .required('Terms is required'),
  image: Yup.mixed<ImageType>()
    .required('Image is required')
    .test('fileSize', 'File too large must be <2 MB', (value) => {
      const MAX_SIZE_MB = 2;
      const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

      if (typeof value === 'string') {
        const base64Prefix = 'data:image/';
        if (value.startsWith(base64Prefix)) {
          const base64Data = value.split(',')[1];
          const sizeBytes =
            (base64Data.length * 3) / 4 -
            (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);
          return sizeBytes <= MAX_SIZE_BYTES;
        }
        return false;
      }

      if (value instanceof File) {
        return value.size <= MAX_SIZE_BYTES;
      }

      return false;
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      if (typeof value === 'string') {
        const base64Regex = /^data:image\/(jpeg|png);base64,/;
        return base64Regex.test(value);
      }
      return false;
    }),

  country: Yup.string().required('Country is required'),
});

export default schema;
