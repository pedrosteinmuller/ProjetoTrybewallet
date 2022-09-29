const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
};

export const REQUEST_API = 'REQUEST_API';
export const GET_COINS = 'GET_COINS';

export const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case GET_COINS:
    return {
      ...state,
      currencies: action.coins,
      isLoading: false,
    };
  default:
    return state;
  }
};
