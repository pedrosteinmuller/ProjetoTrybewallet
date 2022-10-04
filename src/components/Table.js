import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseGlobalState, verifyEdit } from '../redux/actions';
import '../css/table.css';

class Table extends Component {
  handleClickToEdit = (expense) => {
    const idToEdit = expense.id;
    const { activeEditExp } = this.props;
    activeEditExp(idToEdit);
  };

  render() {
    const { expenses, removeExpense } = this.props;
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
          {
            expenses.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{Number(item.value).toFixed(2)}</td>
                <td>{item.exchangeRates[item.currency].name}</td>
                <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    Number((item.value) * (item.exchangeRates[item.currency].ask))
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleClickToEdit(item) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => removeExpense(item.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (exp) => dispatch(removeExpenseGlobalState(exp)),
  activeEditExp: (exp) => dispatch(verifyEdit(exp)),
});

Table.propTypes = {
  expenses: PropTypes.shape(),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
