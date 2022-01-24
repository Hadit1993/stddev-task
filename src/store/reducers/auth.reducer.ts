import {ReduxAction} from '..';
import User from '../../utils/dtos/user.dto';
import AuthActionType from '../actions/actionTypes/auth.action-type';

type AUTH_STATUS = 'authenticated' | 'unauthenticated' | 'unknown';

type SignInKey = 'email' | 'password' | 'submit';

type SignUpKey =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'submit';

interface AuthState {
  status: AUTH_STATUS;
  signIn: {
    errors: {
      [K in SignInKey]?: string;
    };

    values: {
      [K in SignInKey]: string;
    };

    isSubmitting: boolean;
  };

  signUp: {
    errors: {
      [K in SignUpKey]?: string;
    };

    values: {
      [K in SignUpKey]: string;
    };
    isSubmitting: boolean;
  };

  authenticatedUser?: User;
}

const authInitialState: AuthState = {
  status: 'unknown',
  signIn: {
    errors: {},
    isSubmitting: false,
    values: {email: '', password: '', submit: ''},
  },
  signUp: {
    errors: {},
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      submit: '',
    },
    isSubmitting: false,
  },
};

function AuthReducer(
  state: AuthState = authInitialState,
  action: ReduxAction<AuthActionType>,
): AuthState {
  switch (action.type) {
    case 'change-signed-in-user':
      return {...state, authenticatedUser: action.payload};

    case 'on-signin-start':
      return {...state, signIn: {...state.signIn, isSubmitting: true}};

    case 'on-signin-success':
      return {
        ...state,
        status: 'authenticated',
        signIn: {...state.signIn, errors: {}, isSubmitting: false},
        authenticatedUser: action.payload,
      };

    case 'on-signup-start':
      return {...state, signUp: {...state.signUp, isSubmitting: true}};

    case 'on-signup-success':
      return {
        ...state,
        signUp: {...state.signUp, errors: {}, isSubmitting: false},
      };

    case 'update-auth-status':
      return {...state, status: action.payload};

    case 'update-signin-error':
      return {
        ...state,
        signIn: {
          ...state.signIn,
          isSubmitting: false,
          errors: {...state.signIn.errors, ...action.payload},
        },
      };

    case 'update-signup-error':
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isSubmitting: false,
          errors: {...state.signUp.errors, ...action.payload},
        },
      };

    case 'update-signin-value':
      return {
        ...state,
        signIn: {
          ...state.signIn,
          values: {...state.signIn.values, ...action.payload},
        },
      };

    case 'update-signup-value':
      return {
        ...state,
        signUp: {
          ...state.signUp,
          values: {...state.signUp.values, ...action.payload},
        },
      };

    case 'logout':
      return {
        ...state,
        authenticatedUser: undefined,
        status: 'unauthenticated',
      };

    default:
      return state;
  }
}

export {authInitialState, AuthReducer};
export type {AuthState, AUTH_STATUS, SignInKey, SignUpKey};
