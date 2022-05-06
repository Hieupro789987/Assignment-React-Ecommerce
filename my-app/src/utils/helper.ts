import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';

import { authDB } from './firebase-connect';
var md5 = require('md5');

export const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(authDB, email, password);
};

export const signin = (email: string, password: string) => {
  return signInWithEmailAndPassword(authDB, email, password);
};

export const signout = () => {
  return signOut(authDB);
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(authDB, provider);
};

export const updateAccount = async (newUser: User, name: string) => {
  await updateProfile(newUser, {
    displayName: name,
    photoURL: `http://gravatar.com/avatar/${md5(newUser.email)}?d=identicon`,
  });
};
