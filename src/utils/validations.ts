const validateEmail = (email: string) => {
  if (email.trim().length === 0) {
    return 'email is required';
  }
  const isValid = email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  if (!isValid) {
    return 'email is invalid';
  }
};

const validatePassword = (password: string) => {
  if (password.trim().length === 0) {
    return 'password is required';
  }

  if (password.length < 8) {
    return 'password must be at least 8 characters long';
  }
};

export {validateEmail, validatePassword};
