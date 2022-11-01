import { CURRENCIES_RECEIVE } from '../actions';

const INITIAL_STATE = {
  total: 0,
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  currencies: [],
  expenses: [],
  description: '',
  methodPayment: 'Dinheiro',
  tag: 'Alimentação',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_RECEIVE:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
