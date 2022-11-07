import {
  ADD_EXPENSES, CURRENCIES, ENDING_EDIT_EXPENSES,
  RMV_EXPENSES, STARTING_EDIT_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case RMV_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };
  case STARTING_EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case ENDING_EDIT_EXPENSES:
    return {
      ...state,
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
};

export default wallet;
