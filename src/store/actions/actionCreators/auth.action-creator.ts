import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {dispatchAction} from '../..';
import {BASE_URL} from '../../../utils/constants';
import User from '../../../utils/dtos/user.dto';
import useGlobalState from '../../../utils/hooks/useGlobalState';
import {AUTH_STATUS, SignInKey, SignUpKey} from '../../reducers/auth.reducer';
import AuthActionType from '../actionTypes/auth.action-type';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const signup = useCallback(async () => {
    onSignupStart();
    const data = {
      first_name: signUp.values.firstName,
      last_name: signUp.values.lastName,
      email: signUp.values.email.trim().toLocaleLowerCase(),
      password: signUp.values.password,
    };

    try {
      const result = await fetch('http://localhost:3000/users', {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      onSignupSuccess();
      return true;
    } catch (error) {
      updateSignupError({submit: 'unknown error. try again later '});
      return false;
    }
  }, [
    onSignupStart,
    onSignupSuccess,
    signUp.values.email,
    signUp.values.firstName,
    signUp.values.lastName,
    signUp.values.password,
    updateSignupError,
  ]);

  const logout = useCallback(() => dispatcher({type: 'logout'}), [dispatcher]);

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
  };
};

export default useAuthActions;
