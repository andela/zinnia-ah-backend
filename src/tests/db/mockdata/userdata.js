const emptyUser = {
  username: '',
  email: '',
  fullName: '',
  password: '',
  passwordConfirmation: '',
};

const userWithInvalidEmail = {
  username: 'janesmith',
  email: 'jsmith@com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

const userMissingEmail = {
  username: 'janesmith',
  email: '',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

const userWithExistingEmail = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

const userWithExistingUserName = {
  username: 'janesmith',
  email: 'jsmith@gm.com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

const userWithUsernameNotAlphanum = {
  username: 'janesmit=---h',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

const userMissingUsername = {
  username: '',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

const userMissingPassword = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  fullName: 'Igbomina Developer',
  password: '',
  passwordConfirmation: 'password1',
};

const userWithPasswordLessThanEightChars = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  fullName: 'Igbomina Developer',
  password: 'passwor',
  passwordConfirmation: 'passwor',
};

const userMissingPasswordConfirmation = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: '',
};

export {
  emptyUser,
  userWithInvalidEmail,
  userMissingEmail,
  userWithExistingEmail,
  userWithExistingUserName,
  userWithUsernameNotAlphanum,
  userMissingUsername,
  userMissingPassword,
  userWithPasswordLessThanEightChars,
  userMissingPasswordConfirmation,
};
