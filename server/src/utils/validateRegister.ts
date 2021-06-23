import { EMAIL_REGEX } from '../constants';
import { UsernamePasswordInput } from '../resolvers/UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!EMAIL_REGEX.test(String(options.email).toLocaleLowerCase())) {
    return [
      {
        field: 'email',
        message: 'Invalid email!',
      },
    ];
  }
  if (options.username.length <= 3) {
    return [
      {
        field: 'username',
        message: 'Username lenght must be grater than 3!',
      },
    ];
  }
  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'Username cannot include an @!',
      },
    ];
  }
  if (options.password.length <= 3) {
    return [
      {
        field: 'password',
        message: 'Password lenght must be grater than 3!',
      },
    ];
  }

  return null;
};
