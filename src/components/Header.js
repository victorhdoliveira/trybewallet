import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  sum = (expenses) => {
    const usedCoins = expenses.map((coin) => coin.currency).pop([]);
    const list = expenses.map((coin) => coin.exchangeRates)[0];
    let total = 0;
    expenses.forEach((e) => {
      const convertion = list[usedCoins].ask;
      total += Number(e.value * convertion);
    });
    return total.toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <header data-testid="email-field">
        <div>{ email }</div>
        <div data-testid="total-field">{ this.sum(expenses) }</div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
