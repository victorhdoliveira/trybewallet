import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpenses, startingEditExpenses } from '../redux/actions';

class Table extends Component {
  getConvertion = (value, exchangeRates) => Number(value * exchangeRates).toFixed(2);

  deleteExpense = (id) => {
    const { dispatch, expenses } = this.props;
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(removeExpenses(filteredExpenses));
  };

  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(startingEditExpenses(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td data-testid="description-table">{expense.description}</td>
              <td data-testid="tag-table">{expense.tag}</td>
              <td data-testid="method-table">{expense.method}</td>
              <td data-testid="value-table">{Number(expense.value).toFixed(2)}</td>
              <td data-testid="currency-table">
                {expense.exchangeRates[expense.currency].name}
              </td>
              <td data-testid="exchange-table">
                {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td data-testid="conversionValue-table">
                {this.getConvertion(
                  (expense.value), (
                    expense.exchangeRates[expense.currency].ask),
                ) }
              </td>
              <td data-testid="conversionCurrency-table">Real</td>
              <td data-testid="button-table">
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.editExpense(expense.id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deleteExpense(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => wallet;

export default connect(mapStateToProps)(Table);
