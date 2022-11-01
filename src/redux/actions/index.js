export const LOGIN_INFO = 'LOGIN_INFO';
export const CURRENCIES_REQ = 'CURRENCIES_REQ';
export const CURRENCIES_RECEIVE = 'CURRENCIES_RECEIVE';

export const loginInfoAction = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

// export const currenciesRequest = () => ({
//   type: CURRENCIES_REQ,
// });

export const currenciesReceive = (payload) => ({
  type: CURRENCIES_RECEIVE,
  payload,
});

export const dispatchCurrencies = () => async (dispatch) => {
  // dispatch(currenciesRequest());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currencies = Object.keys(data);
  const coinsList = currencies.filter((coin) => coin !== 'USDT');
  dispatch(currenciesReceive(coinsList));
};
