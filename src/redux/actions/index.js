export const LOGIN_INFO = 'LOGIN_INFO';
export const CURRENCIES = 'CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const RMV_EXPENSES = 'RMV_EXPENSES';
export const STARTING_EDIT_EXPENSES = 'STARTING_EDIT_EXPENSES';
export const ENDING_EDIT_EXPENSES = 'ENDING_EDIT_EXPENSES';

export const loginInfoAction = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

export const currenciesReceive = (payload) => ({
  type: CURRENCIES,
  payload,
});

export const exchangeRates = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

export const removeExpenses = (payload) => ({
  type: RMV_EXPENSES,
  payload,
});

export const startingEditExpenses = (payload) => ({
  type: STARTING_EDIT_EXPENSES,
  payload,
});

export const endingEditExpenses = (payload) => ({
  type: ENDING_EDIT_EXPENSES,
  payload,
});

export const dispatchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currencies = Object.keys(data);
  const coinsList = currencies.filter((coin) => coin !== 'USDT');
  dispatch(currenciesReceive(coinsList));
};
