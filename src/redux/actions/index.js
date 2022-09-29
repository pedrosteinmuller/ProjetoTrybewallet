import { USER_EMAIL } from '../reducers/user';

const getEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export default getEmail;
