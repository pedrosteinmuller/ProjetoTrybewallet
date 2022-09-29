import { USER_EMAIL } from '../reducers/user';
import { REQUEST_API, GET_COINS } from '../reducers/wallet';

export const getEmail = (email) => ({
  type: USER_EMAIL,
  email,
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
