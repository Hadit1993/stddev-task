type AuthActionType =
  | 'update-auth-status'
  | 'update-signin-error'
  | 'update-signin-value'
  | 'update-signup-error'
  | 'update-signup-value'
  | 'on-signin-start'
  | 'on-signin-success'
  | 'on-signup-start'
  | 'on-signup-success'
  | 'change-signed-in-user'
  | 'logout';

export default AuthActionType;
