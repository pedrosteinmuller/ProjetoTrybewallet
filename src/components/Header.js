import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { emailUser } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          {emailUser}
        </p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
});

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
