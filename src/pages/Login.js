import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail, fetchApi } from '../redux/actions';
import '../css/login.css';
import logoTrybeWallet from '../css/logoTrybeWallet.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  verifyBtn = () => {
    const numberPassword = 6;
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = email && regex.test(email);
    const verifyPassword = password.length >= numberPassword;
    this.setState({ isBtnDisabled: !(verifyEmail && verifyPassword) });
  };

  handleButton = (event) => {
    event.preventDefault();
    const { history, saveEmail, fetchApiLogin } = this.props;
    const { email } = this.state;
    saveEmail(email);
    fetchApiLogin();
    history.push('/carteira');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div className="login">
        <form
          onSubmit={ this.handleButton }
          className="card"
        >
          <div className="login-place">
            <h2>Login</h2>
          </div>
          <div className="login-img">
            <img src={ logoTrybeWallet } alt="Logo da TrybeWallet" />
          </div>
          <div className="card-content">
            <div className="card-content-area">
              <input
                className="inputs"
                type="email"
                name="email"
                placeholder="Email"
                data-testid="email-input"
                onChange={ this.handleInput }
              />
            </div>
            <div className="card-content-area">
              <input
                className="inputs"
                type="password"
                name="password"
                placeholder="Senha"
                data-testid="password-input"
                onChange={ this.handleInput }
              />
            </div>
            <div className="button-place">
              <button
                type="submit"
                disabled={ isBtnDisabled }
                className="submit"
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(getEmail(email)),
  fetchApiLogin: () => dispatch(fetchApi()),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  fetchApiLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
