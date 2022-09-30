import { REQUEST_API, GET_COINS, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
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
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
