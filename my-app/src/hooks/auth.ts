import UserService from 'queries/user';
import { useAppDispatch } from './../stores/hooks';
import { authDB } from 'utils/firebase-connect';

import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { updateInfomation } from 'stores/reducers/auth';
import { InfomationCustomer } from 'types/user';
import { showLoading, openFormAuth } from 'stores/reducers/actionReducer';

export const useStatusAuth = () => {
  const [currentUser, setCurrentUser] = useState<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userS = new UserService();
    let unMounted = false;
    const unsubscribe = onAuthStateChanged(authDB, async (user) => {
      if (unMounted) return;
      if (user) {
        await userS.getUser(user.uid).then((res: InfomationCustomer) => {
          dispatch(
            updateInfomation({
              username: res?.username,
              email: res?.email,
              address: res.address,
              phoneNumber: res.phoneNumber,
              emailVerified: user.emailVerified,
              uid: res.uid,
              photoURL: res?.photoURL,
              isActive: res.isActive,
            })
          );
          dispatch(showLoading(false));
          dispatch(openFormAuth({type:'login', value: false}));

          setCurrentUser(res);
        });
      } else {
        setCurrentUser(null);
        dispatch(
          updateInfomation({
            username: '',
            email: '',
            address: '',
            phoneNumber: '',
            emailVerified: false,
            uid: '',
            photoURL: '',
            isActive: false,
          })
        );
        return;
      }
    });

    return () => {
      unMounted = true;
      unsubscribe();
    };
  }, [dispatch]);

  return currentUser;
};
