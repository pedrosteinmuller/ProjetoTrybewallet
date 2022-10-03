import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/header.css';
import logoTrybeWallet from '../css/logoTrybeWallet.png';
import userIcon from '../css/user-circle-solid.png';

class Header extends Component {
  calculateSum = () => {
    const { expenses } = this.props;
    const valuee = expenses.reduce((acc, curr) => {
      const expenseValue = curr.value;
      const asks = curr.exchangeRates[curr.currency].ask;
      const mult = expenseValue * asks;
      return acc + Number(mult);
    }, 0);
    return Number(valuee).toFixed(2);
  };

  render() {
    const { emailUser } = this.props;
    return (
      <div className="container">
        <div className="login-img">
          <img src={ logoTrybeWallet } alt="Logo da TrybeWallet" />
        </div>
        <div className="email-user">
          <img
            className="profile-image"
            src={ userIcon }
            alt="Foto de perfil"
          />
          <p data-testid="email-field">
            {emailUser}
          </p>
        </div>
        <div className="value-expense">
          <div className="itens">
            <p>Total de despesas:</p>
            <p className="values" data-testid="total-field">{ this.calculateSum()}</p>
            <p className="values" data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
  expenses: PropTypes.shape(),
}.isRequired;

export default connect(mapStateToProps)(Header);
