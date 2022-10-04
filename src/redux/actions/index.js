export const REQUEST_API = 'REQUEST_API';
export const GET_COINS = 'GET_COINS';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const USER_EMAIL = 'USER_EMAIL';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const VERIFY_EDIT = 'VERIFY_EDIT';

export const getEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const saveExpensesGlobalState = (expenses, data) => ({
  type: ADD_EXPENSES,
  payload: { ...expenses,
    exchangeRates: data,
  } });

export const removeExpenseGlobalState = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: expense,
});

export const editExpense = (expId) => ({
  type: EDIT_EXPENSE,
  payload: expId,
});

export const verifyEdit = (expId) => ({
  type: VERIFY_EDIT,
  expId,
});

export const requestAPI = () => ({ type: REQUEST_API });

const addCurrence = (coins) => ({
  type: GET_COINS,
  coins,
});

export const fetchApi = () => async (dispatch) => {
  dispatch(requestAPI());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const coins = Object.keys(data).filter((e) => e !== 'USDT');
  dispatch(addCurrence(coins));
};

export const fetchAddExpenses = (expenses) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(saveExpensesGlobalState(expenses, data));
};
