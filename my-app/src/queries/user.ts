import { IUserSignUp } from './../types/user';
import { authDB } from './../utils/firebase-connect';
import {
  GoogleAuthProvider,
  linkWithPopup,
  signInWithPopup,
  updateProfile,
  UserCredential,
} from 'firebase/auth';

import { queryFirestore } from 'utils/db';

import { updateAccount, signin } from 'utils/helper';
import { signup, signout } from 'utils/helper';

import QueryData from './query';
var md5 = require('md5');
class UserService extends QueryData {
  signup = async (
    new_user: IUserSignUp,
    onSuccess = (message: string) => {},
    onError = (message: string) => {}
  ) => {
    await signup(new_user.email, new_user.password)
      .then(async (newUserCredential: UserCredential) => {
        const newUser = newUserCredential.user;
        const userInfo = {
          uid: newUser.uid,
          username: new_user.username,
          photoURL: `http://gravatar.com/avatar/${md5(newUser.email)}?d=identicon`,
          email: newUser.email,
          phoneNumber: new_user.phoneNumber,
          address: new_user.address,
          emailVerified: false,
          isActive: true,
        };

        console.log(userInfo);

        await updateAccount(newUser, new_user.username).then(() => {
          super.addDataDoc(userInfo, queryFirestore.docUser(newUser.uid)).then(() => {
            onSuccess('Tạo tài khoản thành công');
            this.logout();
          });
        });
      })
      .catch((e: Error) => {
        if (e.message.includes('auth/email-already-in-use')) {
          onError('Email đã tồn tại');
        }
      });
  };

  signin = async (
    values: {
      email: string;
      password: string;
    },
    onSuccess = (message: string) => {},
    onError = (message: string) => {}
  ) => {
    await signin(values.email, values.password)
      .then((res) => {
        onSuccess('Đăng nhập thành công');
      })
      .catch((e: Error) => {
        if (e.message.includes('auth/wrong-password')) {
          onError('Email hoặc password không hợp lệ!');
        }
      });
  };

  logout = async () => {
    signout();
  };

  getUser = async (id: string) => {
    const user = await super.getDataDocById(queryFirestore.docUser(id));
    return user;
  };

  linkedWithGoogle = async (
    onSuccess = (message: string) => {},
    onError = (message: string) => {}
  ) => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const currentUser = authDB.currentUser;
    if (currentUser) {
      await linkWithPopup(currentUser, provider)
        .then((res) => {
          const credential = GoogleAuthProvider.credentialFromResult(res);
          if (credential) {
            const user = res.user;
            super
              .updateData({ emailVerified: true }, queryFirestore.docUser(user.uid))
              .then((_) => {
                onSuccess('Liên kết Email thành công');
              })
              .catch((e: Error) => {
                onError('Liên kết Email thất bại');
              });
          }
        })
        .catch((e: Error) => {
          if (e.message.includes('auth/credential-already-in-use')) {
            onError('Email này đã liên kết với tài khoản khác');
          }
        });
    }
  };
  signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    await signInWithPopup(authDB, provider).then((res) => {
      const user = res.user;
      const userInfo = {
        uid: user.uid,
        username: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        emailVerified: true,
        isActive: true,
      };

      super.getDataDocById(queryFirestore.docUser(user.uid)).then((userFS) => {
        if (!userFS) {
          updateProfile(user, {
            displayName: user.displayName,
            photoURL: user.photoURL,
          }).then(() => {
            super.addDataDoc(userInfo, queryFirestore.docUser(user.uid));
          });
        }
      });
    });
  };

  updateInfo = async (
    feild: any,
    onSuccess = (message: string) => {},
    onError = (message: string) => {}
  ) => {
    if (authDB.currentUser) {
      await super
        .updateData(feild, queryFirestore.docUser(authDB.currentUser.uid))
        .then(() => {
          onSuccess('Lưu thành công');
        })
        .catch((e: Error) => {
          onError(e.message);
        });
    }
  };
}

export default UserService;
