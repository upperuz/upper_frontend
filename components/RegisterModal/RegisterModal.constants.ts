import { TFormFields } from 'types';

import { TField, TValidityRequirement } from './RegisterModal.types';

export const REGISTER_FORM_FIELDS: TFormFields<TField> = {
  name: {
    name: 'name',
    options: {
      required: 'Blog nomi bo`sh bo`lishi mumkin emas',
      maxLength: {
        value: 60,
        message: 'Blog nomi o`ta uzun',
      },
    },
  },
  bio: {
    name: 'bio',
    options: {
      maxLength: {
        value: 60,
        message: 'Bio o`ta uzun',
      },
    },
  },
  login: {
    name: 'login',
    options: {
      required: 'Login bo`sh bo`lishi mumkin eams',
      minLength: {
        value: 8,
        message: 'Login 8 harfdan kam bo`lmasligi kerak',
      },
      maxLength: {
        value: 20,
        message: 'Login o`ta uzun',
      },
    },
  },
  password: {
    name: 'password',
    options: {
      required: 'Parol bo`sh bo`lishi mumkin emas',
      minLength: {
        value: 8,
        message: 'Parol 8 harfdan kam bo`lmasligi kerak',
      },
      maxLength: {
        value: 30,
        message: 'Parol o`ta uzun',
      },
      validate: (value) => /[A-ZА-Я]/.test(value) && /[a-zа-я]/.test(value) && /[0-9]/.test(value),
    },
  },
};

export const VALIDITY_REQUIREMENTS = {
  length: 'length',
  upperLowerCase: 'upperLowerCase',
  numberContains: 'numberContains',
};

export const PASSWORD_VALIDITY_REQUIREMENTS: Record<TValidityRequirement, string> = {
  length: 'Parol 8 harfdan kam bo`lmasligi kerak',
  upperLowerCase: 'Kamida bitta katta va kichik harf bo`lishi kerak',
  numberContains: 'Kamida bitta raqam bo`lishi kerak',
};
