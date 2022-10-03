import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Testando aplicação do Trybewallet', () => {
  it('Verifica se a tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const password = screen.getByPlaceholderText(/senha/i);
    const email = screen.getByPlaceholderText(/email/i);
    const buttonEnter = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();

    userEvent.type(email, 'trybe@trybe.com');
    userEvent.type(password, '1234567890');
    userEvent.click(buttonEnter);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  it('Verifica se renderiza a rota /carteira', () => {
    const loginMock = {
      users: {
        email: 'pedrosteinmuller10105@hotmail.com',
      } };
    renderWithRouterAndRedux(
      <App />,
      {
        initialState: loginMock,
        initialEntries: ['/carteira'],
      },
    );
    const user = screen.getAllByTestId('email-field');
    expect(user.length).toBe(1);
  });
  it('Verifica a tela de carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const coinName = screen.getByText(/brl/i);

    userEvent.click(addExpense);
    userEvent.type(descriptionInput, 'gasolina');
    userEvent.type(valueInput, '1');
    userEvent.click(currencyInput, 'CAD');
    userEvent.click(methodInput, 'Dinheiro');
    userEvent.click(tagInput, 'Lazer');

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toHaveAttribute('name', 'currencyCoin');
    expect(methodInput).toHaveAttribute('name', 'payMethod');
    expect(tagInput).toHaveAttribute('name', 'expenseTag');
    expect(addExpense).toBeInTheDocument();
    expect(coinName).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBe(8);
  });

  test('Verifica se renderiza a despesa após clicar no botao adicionar despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);
    // renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] }
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const addExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.selectOptions(methodInput, 'Dinheiro');

    userEvent.type(valueInput, '');
    userEvent.type(descriptionInput, 'gasolina');
    userEvent.click(addExpense);
    const textOnScreen = await screen.findByText(/gasolina/i);

    expect(valueInput.value).toBe('');

    expect(textOnScreen).toBeVisible();
  });
  it('Testando interação do usuário no select moeda e categoria', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<Wallet />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const buttonSelect = screen.getByRole('combobox', {
      name: /moeda/i,
    });

    await waitFor(() => expect(buttonSelect).toHaveValue('USD'));

    userEvent.selectOptions(buttonSelect, 'USD');

    const buttonCategory = screen.getByRole('combobox', {
      name: /categoria/i,
    });
    userEvent.selectOptions(buttonCategory, 'Alimentação');

    expect(buttonCategory).toHaveValue('Alimentação');
  });
});
//   it('Testando interação do usuário do select de categoria', () => {
//     renderWithRouterAndRedux(<Wallet />);

// });
