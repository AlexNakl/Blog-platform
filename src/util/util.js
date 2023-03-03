import { format, parseISO } from 'date-fns';
import * as yup from 'yup';

import iconFavorited from '../img/favorited.svg';
import iconUnfavorited from '../img/unfavorited.svg';

export const formatDate = (date) => (date ? format(parseISO(date), 'MMMM d, yyyy') : 'NA');
export const getIcon = (liked) => (liked ? iconFavorited : iconUnfavorited);
export const parseObjects = (tagList) => (tagList.length !== 0 ? tagList.map((tag) => ({ tag })) : []);
export const parseStrings = (tagList) =>
  tagList.length !== 0 ? tagList.filter((name) => name.tag).map((name) => name.tag) : [];

export const shortenText = (str, maxLen = 150) => {
  const separator = ' ';
  if (str.length <= maxLen) return str;
  return `${str.substr(0, str.lastIndexOf(separator, maxLen))} ...`;
};

export const signUpScheme = yup.object().shape({
  userName: yup
    .string()
    .required('The user name field is required')
    .min(3, 'The user name is less than 3 characters')
    .max(20, 'The user name is more than 20 characters'),
  email: yup.string().email('Email must be valid').required('The email field is required'),
  password: yup
    .string()
    .required('The password field is required')
    .min(6, 'The password is less than 6 characters')
    .max(40, 'The password is more than 40 characters'),
  confirmPassword: yup
    .string()
    .required('Accept terms and conditions here')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  confirmation: yup.boolean().oneOf([true], 'Must accept terms and conditions'),
});

export const signInScheme = yup.object().shape({
  email: yup.string().email('Email must be valid').required('The email field is required'),
  password: yup.string().required('The password field is required').max(40, 'The password is less than 40 characters'),
});

export const editProfileScheme = yup.object().shape({
  userName: yup
    .string()
    .required('The user name field is required')
    .min(3, 'The user name is less than 3 characters')
    .max(20, 'The user name is more than 20 characters'),
  email: yup.string().email('Email must be valid').required('The email field is required'),
  password: yup
    .string()
    .test('0 or min 6', 'The password is less than 6 characters', (value) => value.length === 0 || value.length >= 6)
    .max(40, 'The password is more than 40 characters'),
  image: yup.string().url('This does not look like an URL'),
});

export const createArticleScheme = (name, maxL, minL) => ({
  required: {
    value: true,
    message: `The ${name} field is required`,
  },
  pattern: {
    value: /\S+(.*)$/gi,
    message: `The ${name} must not start with a space.`,
  },
  maxLength: {
    value: maxL,
    message: `The ${name} is more than ${maxL} characters`,
  },
  minLength: {
    value: minL,
    message: `The ${name} is less than ${minL} characters`,
  },
});
