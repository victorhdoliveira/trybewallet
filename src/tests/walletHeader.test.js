import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('teste do header da página carteira', () => {
  it('Verifica se há as características do header na página Wallet', () => {
    renderWithRouterAndRedux(<Wallet />);

    const email = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(email).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0.00');
    expect(currency).toBeInTheDocument();
    expect(currency).toHaveTextContent('BRL');
  });
  it('Verifica se o form é redenreizado corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });
  it('Verifica se a despesa é adicionada corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '375');

    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'Compra no supermercado');

    const button = screen.getByRole('button', { name: /adicionar/i });
    userEvent.click(button);

    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
  });
});
