import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header data-testid="email-field">
        <div>{ email }</div>
        <div data-testid="total-field">{ total }</div>
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
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
