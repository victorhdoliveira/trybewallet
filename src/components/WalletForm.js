import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchCurrencies } from '../redux/actions/index';
import getExchangeRates from '../services/exchangeRates';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(dispatchCurrencies());
  }

  initialState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  addExpense = async (event) => {
    event.preventDefault();
    const { dispatch, expenses } = this.props;
    const exchange = await getExchangeRates();
    const data = this.state;
    data.id = expenses.length;
    dispatch({ type: 'ADD_EXPENSES',
      payload: { ...this.state, exchangeRates: exchange, id: data.id } });
    this.initialState();
  };

  editExpense = () => {
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, expenses, idToEdit } = this.props;
    const toEdit = expenses.map((expense) => {
      if (expense.id === idToEdit) {
        expense.value = value;
        expense.description = description;
        expense.currency = currency;
        expense.method = method;
        expense.tag = tag;
      }
      return expense;
    });
    dispatch({ type: 'ENDING_EDIT_EXPENSES',
      payload: { ...this.state, expenses: toEdit } });
    this.initialState();
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency,
      method, tag } = this.state;
    return (
      <form>
        <label htmlFor="expenses">
          Valor:
          <input
            data-testid="value-input"
            value={ value }
            type="number"
            id="expenses"
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            value={ description }
            type="text"
            id="description"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
          >
            { currencies.map((coin, index) => (
              <option key={ index }>{coin}</option>
            ))}
          </select>
        </label>
        <label htmlFor="type">
          Método de pagamento:
          <select
            data-testid="method-input"
            value={ method }
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        { editor ? (
          <button type="button" onClick={ this.editExpense }>Editar despesa</button>)
          : (
            <button type="button" onClick={ this.addExpense }>
              Adicionar despesa
            </button>) }
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = ({ wallet }) => wallet;

export default connect(mapStateToProps)(WalletForm);
