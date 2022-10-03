import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
// import mockData from './helpers/mockData';

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
  // it('teste', () => {
  //   global.fetch = jest.fn()
  //     .mockResolvedValue({ json: jest.fn().mockResolvedValue(mockData) });
  //   global.fetch = async () => ({ json: async () => mockData });
  //   renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(mockData),
  //   });
  //   const titleEl = screen.getByTestId('currency-input', { name: /usd/i });
  //   expect(titleEl).toBeInTheDocument();
  //   expect(titleEl).toBeDefined();
  // });
});
