import {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {dispatchAction} from '../..';
import {AUTH_KEY, BASE_URL} from '../../../utils/constants';
import User from '../../../utils/dtos/user.dto';
import useGlobalState from '../../../utils/hooks/useGlobalState';
import {AUTH_STATUS, SignInKey, SignUpKey} from '../../reducers/auth.reducer';
import AuthActionType from '../actionTypes/auth.action-type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const useAuthActions = () => {
  const dispatch = useDispatch();
  const dispatcher = useMemo(
    () => dispatchAction<AuthActionType>(dispatch),
    [dispatch],
  );

  const {signIn, signUp} = useGlobalState(state => state.auth);

  const changeSignedInUser = useCallback(
    (user?: User) => dispatcher({type: 'change-signed-in-user', payload: user}),
    [dispatcher],
  );

  const updateAuthStatus = useCallback(
    (status: AUTH_STATUS) =>
      dispatcher({type: 'update-auth-status', payload: status}),
    [dispatcher],
  );

  const updateSigninError = useCallback(
    (error: {[k in SignInKey]?: string}) =>
      dispatcher({type: 'update-signin-error', payload: error}),
    [dispatcher],
  );

  const updateSigninValue = useCallback(
    (value: {[k in SignInKey]?: string}) =>
      dispatcher({type: 'update-signin-value', payload: value}),
    [dispatcher],
  );

  const updateSignupError = useCallback(
    (error: {[k in SignUpKey]?: string}) =>
      dispatcher({type: 'update-signup-error', payload: error}),
    [dispatcher],
  );

  const updateSignupValue = useCallback(
    (value: {[k in SignUpKey]?: string}) =>
      dispatcher({type: 'update-signup-value', payload: value}),
    [dispatcher],
  );

  const onSigninStart = useCallback(
    () => dispatcher({type: 'on-signin-start'}),
    [dispatcher],
  );

  const onSigninSuccess = useCallback(
    (user: User) => dispatcher({type: 'on-signin-success', payload: user}),
    [dispatcher],
  );

  const onSignupStart = useCallback(
    () => dispatcher({type: 'on-signup-start'}),
    [dispatcher],
  );

  const onSignupSuccess = useCallback(
    () => dispatcher({type: 'on-signup-success'}),
    [dispatcher],
  );

  const signin = useCallback(async () => {
    onSigninStart();

    try {
      const result = await fetch(
        `${BASE_URL}/users?email=${signIn.values.email
          .trim()
          .toLocaleLowerCase()}&password=${signIn.values.password}`,
      );
      if (result.status === 200) {
        const jsonResult: User[] = await result.json();
        if (jsonResult.length > 0) {
          onSigninSuccess(jsonResult[0]);
          return true;
        } else {
          updateSigninError({submit: 'no user with these credentials found'});
          return false;
        }
      } else {
        updateSigninError({submit: 'unknown error. try again later '});
      }
    } catch (error) {
      updateSigninError({submit: 'unknown error. try again later '});
      return false;
    }
  }, [
    onSigninStart,
    onSigninSuccess,
    signIn.values.email,
    signIn.values.password,
    updateSigninError,
  ]);

  const initConversations = useCallback(async (currentUser: User) => {
    const result = await fetch(`${BASE_URL}/users`);
    const users: [User] = await result.json();
    const filteredUsers = users.filter(user => user.id !== currentUser?.id);
    for (let user of filteredUsers) {
      try {
        const res = await firestore()
          .collection('Conversations')
          .add({
            users: [
              {
                id: currentUser!.id,
                name: `${currentUser?.first_name} ${currentUser?.last_name}`,
                email: currentUser.email,
              },
              {
                id: user.id,
                name: `${user?.first_name} ${user?.last_name}`,
                email: user.email,
              },
            ],
            messages: [],
          });
        console.log({res});
      } catch (error) {
        console.error({error});
      }
    }
  }, []);

  const signup = useCallback(async () => {
    onSignupStart();
    const data = {
      first_name: signUp.values.firstName,
      last_name: signUp.values.lastName,
      email: signUp.values.email.trim().toLocaleLowerCase(),
      password: signUp.values.password,
    };

    try {
      const result = await fetch(`${BASE_URL}/users`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.status === 201) {
        const createdUser: User = await result.json();
        await initConversations(createdUser);

        onSignupSuccess();
        return true;
      } else {
        updateSignupError({submit: 'unknown error. try again later '});
        return false;
      }
    } catch (error) {
      updateSignupError({submit: 'unknown error. try again later '});
      return false;
    }
  }, [
    initConversations,
    onSignupStart,
    onSignupSuccess,
    signUp.values.email,
    signUp.values.firstName,
    signUp.values.lastName,
    signUp.values.password,
    updateSignupError,
  ]);

  const checkAuthentication = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem(AUTH_KEY);

      if (userId) {
        console.log({userId});
        const result = await fetch(
          `http://192.168.1.106:3000/users?id=${userId}`,
        );
        if (result.status === 200) {
          const jsonResult: User[] = await result.json();
          if (jsonResult.length > 0) {
            updateAuthStatus('authenticated');
            changeSignedInUser(jsonResult[0]);
          } else {
            throw new Error();
          }
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log({error});
      updateAuthStatus('unauthenticated');
    }
  }, [changeSignedInUser, updateAuthStatus]);

  const logout = useCallback(() => {
    AsyncStorage.removeItem(AUTH_KEY);
    return dispatcher({type: 'logout'});
  }, [dispatcher]);

  return {
    changeSignedInUser,
    updateAuthStatus,
    updateSigninError,
    updateSignupError,
    updateSigninValue,
    updateSignupValue,
    signin,
    logout,
    signup,
    checkAuthentication,
  };
};

export default useAuthActions;
