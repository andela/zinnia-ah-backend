const emptyUser = {
  username: '',
  email: '',
  fullName: '',
  password: '',
  passwordConfirmation: '',
};

const userWithInvalidEmail = {
  username: 'igbominadeveloper',
  email: 'igbominadeveloper@',
  fullName: 'Igbomina Developer',
  password: 'password1',
  passwordConfirmation: 'password1',
};

const userMissingEmail = {
  username: 'igbominadeveloper',
  email: '',
  fullName: 'Igbomina Developer',
  password: 'password1',
  passwordConfirmation: 'password1',
};

const userWithExistingEmail = {
  username: 'igbominadeveloper',
  email: 'igbominadeveloper@ah.com',
  fullName: 'Igbomina Developer',
  password: 'password1',
  passwordConfirmation: 'password1',
};

const userWithUsernameNotAlphanum = {
  username: 'igb##o&&))',
  email: 'igbominadeveloper@ah.com',
  fullName: 'Igbomina Developer',
  password: 'password1',
  passwordConfirmation: 'password1',
};

const userMissingUsername = {
  username: '',
  email: 'igbominadeveloper@ah.com',
  fullName: 'Igbomina Developer',
  password: 'password1',
  passwordConfirmation: 'password1',
};

const userMissingPassword = {
  username: 'igbominadeveloper',
  email: 'igbominadeveloper@ah.com',
  fullName: 'Igbomina Developer',
  password: '',
  passwordConfirmation: 'password1',
};

const userWithPasswordLessThanEightChars = {
  username: 'igbominadeveloper',
  email: 'igbominadeveloper@ah.com',
  fullName: 'Igbomina Developer',
  password: 'passwor',
  passwordConfirmation: 'passwor',
};

const userMissingPasswordConfirmation = {
  username: 'igbominadeveloper',
  email: 'igbominadeveloper@ah.com',
  fullName: 'Igbomina Developer',
  password: 'password1',
  passwordConfirmation: '',
};

const userWithPasswordAndConfirmationMismatch = {
  username: 'igbominadeveloper',
  email: 'igbominadeveloper@ah.com',
  fullName: 'Igbomina Developer',
  password: 'password1',
  passwordConfirmation: 'password',
};

const validUser = {
  username: 'igbominadeveloper',
  email: 'igbominadeveloper@ah.com',
  fullName: 'Igbomina Developer',
  password: 'password1',
  passwordConfirmation: 'password1',
};

export {
  emptyUser,
  userWithInvalidEmail,
  userMissingEmail,
  userWithExistingEmail,
  userWithUsernameNotAlphanum,
  userMissingUsername,
  userMissingPassword,
  userWithPasswordLessThanEightChars,
  userMissingPasswordConfirmation,
  userWithPasswordAndConfirmationMismatch,
  validUser,
};
