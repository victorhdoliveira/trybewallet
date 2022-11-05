import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpenses } from '../redux/actions';

class Table extends Component {
  getConvertion = (value, exchangeRates) => Number(value * exchangeRates).toFixed(2);

  deleteExpense = (id) => {
    const { dispatch, expenses } = this.props;
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(removeExpenses(filteredExpenses));
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
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {this.getConvertion(
                  (expense.value), (
                    expense.exchangeRates[expense.currency].ask),
                ) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="submit"
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
