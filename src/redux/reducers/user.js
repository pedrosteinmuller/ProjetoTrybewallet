const INITIAL_STATE = {
  email: '',
};

export const USER_EMAIL = 'USER_EMAIL';

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};
