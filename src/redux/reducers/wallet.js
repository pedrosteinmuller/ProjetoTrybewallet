import { REQUEST_API, GET_COINS, ADD_EXPENSES, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  expenses: [],
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
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
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
