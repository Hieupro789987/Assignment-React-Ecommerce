import { IUserSignUp } from './../types/user';
import { useState, ChangeEvent } from 'react';

interface IObject {
  [name: string]: any;
}

const checkEmail = (email: string): boolean => {
  let regex = /[a-z0-9]+@gmail.com$/;
  return regex.test(email);
};

export const errorRegister = (values: any) => {
  const errors: IObject = {};

  if (!values.username.trim()) {
    errors.username = 'Không được để trống';
  }
  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Không được để trống';
  }
  if (!values.address.trim()) {
    errors.address = 'Không được để trống';
  }

  if (!values.email) {
    errors.email = 'không được để trống';
  } else if (!checkEmail(values.email)) {
    errors.email = 'email không hợp lệ';
  }

  if (!values.password) {
    errors.password = 'không được để trống';
  } else if (values.password.length < 6) {
    errors.password = 'Mật khẩu cần ít nhất 6 kí tự';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'không được để trống';
  } else if (values.confirmPassword != values.password) {
    console.log(values.confirmPassword !== values.password);
    errors.confirmPassword = 'Mật khẩu không trùng khớp';
  }

  return errors;
};
export const errorLogin = (values: any) => {
  const errors: IObject = {};

  if (!values.email) {
    errors.email = 'không được để trống';
  } else if (!checkEmail(values.email)) {
    errors.email = 'email không hợp lệ';
  }

  if (!values.password) {
    errors.password = 'không được để trống';
  } else if (values.password.length < 6) {
    errors.password = 'Mật khẩu cần ít nhất 6 kí tự';
  }


  return errors;
};


export const useForm = (data: any) => {
  const [values, setValues] = useState<any>({
    username: '',
    phoneNumber: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const isError = () => {
    setErrors(data(values));

    return Object.values(data(values)).length > 0;
  };

  return { handleChange, values, isError, errors };
};
