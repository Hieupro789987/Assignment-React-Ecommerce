export interface IUserSignUp {
  username: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IUserAuth {
  uid: string;
  email: string | null;
  username: string | null;
  photoURL: string;
  emailVerified: boolean;
}

export interface InfomationCustomer {
  username: string | null;
  address: string;
  email: string | null;
  phoneNumber: string;
  emailVerified: boolean;
  uid: string;
  photoURL: string;
  isActive: boolean;
}


export interface IIformmationEdit {
    username: string;
    phoneNumber: string;
    address: string;
}