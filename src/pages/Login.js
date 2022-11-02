import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.buttonVerify());
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email, password } = this.state;
    dispatch({ type: 'LOGIN_INFO', payload: { email, password } });
    history.push('/carteira');
  };

  // A função abaixo foi desenvolvida na monitoria da Aline
  buttonVerify = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const passwordVerify = password.length >= minLength;
    const regex = /\S+@\S+\.\S+/;
    const emailVerify = regex.test(email);
    const btnState = emailVerify && passwordVerify;
    this.setState({ isBtnDisabled: !(btnState) });
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <section>
        <form className="login-form">
          <input
            data-testid="email-input"
            type="text"
            name="email"
            placeholder="Digite seu e-mail"
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            onClick={ this.handleSubmit }
            disabled={ isBtnDisabled }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ user }) => user;

export default connect(mapStateToProps)(Login);
