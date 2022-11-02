export const LOGIN_INFO = 'LOGIN_INFO';
export const CURRENCIES_RECEIVE = 'CURRENCIES_RECEIVE';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const loginInfoAction = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

export const currenciesReceive = (payload) => ({
  type: CURRENCIES_RECEIVE,
  payload,
});

export const exchangeRates = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

export const dispatchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currencies = Object.keys(data);
  const coinsList = currencies.filter((coin) => coin !== 'USDT');
  dispatch(currenciesReceive(coinsList));
};
