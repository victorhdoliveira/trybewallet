import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaCoins, FaUserCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import logo from '../images/logo-verde.jpeg';

class Header extends Component {
  sum = (expenses) => {
    const list = expenses.map((coin) => coin.exchangeRates)[0];
    let total = 0;
    expenses.forEach((e, i) => {
      const usedCoins = expenses.map((coin) => coin.currency);
      const coinsIndex = usedCoins[i];
      const convertion = list[coinsIndex].ask;
      total += Number(e.value * convertion);
    });
    return total.toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <header data-testid="email-field" className="header-wallet">
        <div
          data-testid="total-field"
          className="count-wallet"
        >
          <FaCoins className="coinsIcon" />
          { this.sum(expenses) }
          {' '}
          BRL
        </div>
        {/* <div data-testid="header-currency-field" className="count-wallet">BRL</div> */}
        <div className="logoName">
          <img src={ logo } alt="logo" className="header-logo" />
          <h2>e-Wallet</h2>
        </div>
        <div className="email-wallet">
          {' '}
          <FaUserCircle className="profileIcon" />
          { email }
        </div>
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
