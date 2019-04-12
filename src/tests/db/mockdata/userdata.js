export const emptyUser = {
  username: '',
  email: '',
  fullName: '',
  password: '',
  passwordConfirmation: '',
};

export const userWithInvalidEmail = {
  username: 'janesmith',
  email: 'jsmith@com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

export const userMissingEmail = {
  username: 'janesmith',
  email: '',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

export const userWithExistingEmail = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

export const userWithExistingUserName = {
  username: 'janesmith',
  email: 'jsmith@gm.com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

export const userWithUsernameNotAlphanum = {
  username: 'janesmit=---h',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

export const userMissingUsername = {
  username: '',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: 'password1',
};

export const userMissingPassword = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  fullName: 'Igbomina Developer',
  password: '',
  passwordConfirmation: 'password1',
};

export const userWithPasswordLessThanEightChars = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  fullName: 'Igbomina Developer',
  password: 'passwor',
  passwordConfirmation: 'passwor',
};

export const userMissingPasswordConfirmation = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
  fullName: 'Igbomina Developer',
  passwordConfirmation: '',
};

export const loginCredentials = {
  email: 'roses@gmail.com',
  password: '16goingOn17',
};

export const nonExistentUser = {
  email: 'humpty@dumpty.com',
  password: 'not12database',
};

export const signupCredentials = {
  email: 'roses@gmail.com',
  password: '16goingOn17',
  username: 'flowergarden',
};
