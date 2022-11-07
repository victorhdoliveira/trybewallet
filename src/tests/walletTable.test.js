import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const description = 'description-input';
const descriptionTable = 'description-table';
const value = 'value-input';

describe('teste da tabela da página da carteira', () => {
  it('Verifica se a despesa adicionada é renderizada na tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId(value);
    userEvent.type(valueInput, '500');

    const descriptionInput = screen.getByTestId(description);
    userEvent.type(descriptionInput, 'Passagem aerea');

    const methodInput = screen.getByTestId('method-input');
    userEvent.selectOptions(methodInput, screen.getByRole('option', { name: /crédito/ }));

    const tagInput = screen.getByTestId('tag-input');
    userEvent.selectOptions(tagInput, screen.getByRole('option', { name: /transporte/i }));

    const button = screen.getByRole('button', { name: /adicionar/i });
    userEvent.click(button);

    const descriptionExpense = await screen.findByTestId(descriptionTable);
    const methodExpense = await screen.findByTestId('method-table');
    const tagExpense = await screen.findByTestId('tag-table');

    expect(descriptionExpense).toHaveTextContent(/passagem/i);
    expect(methodExpense).toHaveTextContent(/crédito/i);
    expect(tagExpense).toHaveTextContent(/transporte/i);
  });
  it('Verifica se é possível excluir uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '50');

    const descriptionInput = screen.getByTestId(description);
    userEvent.type(descriptionInput, 'restaurante');

    const addButton = screen.getByRole('button', { name: /adicionar/i });
    userEvent.click(addButton);

    const descriptionExpense = await screen.findByTestId(descriptionTable);
    expect(descriptionExpense).toHaveTextContent(/restaurante/i);

    const rmvButton = screen.getByTestId('delete-btn');
    userEvent.click(rmvButton);
    expect(descriptionExpense).not.toBeInTheDocument();
  });
  it('Verifica se é possível editar uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId(value);
    userEvent.type(valueInput, '100');

    const descriptionInput = screen.getByTestId(description);
    userEvent.type(descriptionInput, 'ingresso Rock in Rio');

    const addButton = screen.getByRole('button', { name: /adicionar/i });
    userEvent.click(addButton);

    const ticket = await screen.findByTestId(descriptionTable);
    expect(ticket).toHaveTextContent(/ingresso/i);

    const editButton = screen.getByTestId('edit-btn');
    userEvent.click(editButton);

    const descriptionInputEdit = screen.getByTestId(description);
    userEvent.type(descriptionInputEdit, 'imprevisto');

    const tagInput = screen.getByTestId('tag-input');
    userEvent.selectOptions(tagInput, screen.getByRole('option', { name: /trabalho/i }));

    const editExpense = screen.getByRole('button', { name: 'Editar despesa' });
    expect(editExpense).toBeInTheDocument();
    userEvent.click(editExpense);

    const descriptionExpense = await screen.findByTestId(descriptionTable);
    const descriptionTag = await screen.findByTestId('tag-table');

    expect(descriptionExpense).toHaveTextContent(/imprevisto/i);
    expect(descriptionTag).toHaveTextContent(/trabalho/i);
  });
});
