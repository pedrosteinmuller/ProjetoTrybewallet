import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  calculateSum = () => {
    const { expenses } = this.props;
    const value = expenses.reduce((acc, curr) => {
      const expenseValue = curr.expense;
      const asks = curr.exchangeRates[curr.currencyCoin].ask;
      const mult = expenseValue * asks;
      return acc + Number(mult);
    }, 0);
    return Number(value).toFixed(2);
  };

  render() {
    const { emailUser } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          {emailUser}
        </p>
        <p data-testid="total-field">{ this.calculateSum()}</p>
        <p data-testid="header-currency-field">BRL</p>
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
