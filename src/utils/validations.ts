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

const validateFirstname = (name: string) => {
  if (name.trim().length === 0) {
    return 'firstname is required';
  }

  if (name.length < 3) {
    return 'firstname must be at least 3 characters long';
  }
};

const validateLastname = (name: string) => {
  if (name.trim().length === 0) {
    return 'lastname is required';
  }

  if (name.length < 3) {
    return 'lastname must be at least 3 characters long';
  }
};

const validateConfirmPassword = (confirmPassword: string, password: string) => {
  if (confirmPassword.trim().length === 0) {
    return 'confirm password is required';
  }

  if (confirmPassword !== password) {
    return 'confirm password do not match with password';
  }
};

const validatePostTitle = (title: string | undefined = '') => {
  if (!title.trim().length) {
    return 'title is required';
  }
  if (title.length > 50) {
    return 'title must be maximum 50 characters';
  }
};

const validatePostDescription = (description: string | undefined = '') => {
  if (!description.trim().length) {
    return 'description is required';
  }
  if (description.length > 50) {
    return 'description must be maximum 50 characters';
  }
};

const validatePostCategory = (category: string | undefined = '') => {
  if (!category.trim().length) {
    return 'category is required';
  }
};

export {
  validateEmail,
  validatePassword,
  validateFirstname,
  validateLastname,
  validateConfirmPassword,
  validatePostTitle,
  validatePostDescription,
  validatePostCategory,
};
