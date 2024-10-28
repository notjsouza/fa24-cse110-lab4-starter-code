import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('adds a new expense', () => {
  render(<App />);

  const nameField = screen.getByTestId("name");
  const costField = screen.getByTestId("cost");
  const saveButton = screen.getByText("Save");

  fireEvent.change(nameField, {target: {value: "New expense"}});
  fireEvent.change(costField, {target: {value: 100}});
  fireEvent.click(saveButton);

  expect(screen.getByText("New expense")).toBeInTheDocument();
  expect(screen.getByText("$100")).toBeInTheDocument();

  const totalSpent = screen.getByTestId("total-spent");
  expect(totalSpent).toHaveTextContent("$100")

  const remainingBudget = screen.getByTestId("remaining-budget");
  expect(remainingBudget).toHaveTextContent("$900");
});

test('deletes an expense', () => {
  render(<App />);

  const nameField = screen.getByTestId("name");
  const costField = screen.getByTestId("cost");
  const saveButton = screen.getByText("Save");

  fireEvent.change(nameField, {target: {value: "New expense"}});
  fireEvent.change(costField, {target: {value: 100}});
  fireEvent.click(saveButton);

  expect(screen.getByText("New expense")).toBeInTheDocument();
  expect(screen.getByText("$100")).toBeInTheDocument();

  const totalSpent = screen.getByTestId("total-spent");
  const remainingBudget = screen.getByTestId("remaining-budget");
  
  expect(totalSpent).toHaveTextContent("$100");
  expect(remainingBudget).toHaveTextContent("$900");

  const deleteButton = screen.getByTestId("delete-button-New expense");
  fireEvent.click(deleteButton);

  expect(screen.queryByText("New expense")).not.toBeInTheDocument();
  expect(screen.queryByText("$100")).not.toBeInTheDocument();

  expect(totalSpent).toHaveTextContent("$0");
  expect(remainingBudget).toHaveTextContent("$1000");
});

test('validate budget balance formula', () => {  
  render(<App />);
  
  const nameField = screen.getByTestId("name");
  const costField = screen.getByTestId("cost");
  const saveButton = screen.getByText("Save");
  
  fireEvent.change(nameField, {target: {value: "New expense 1"}});
  fireEvent.change(costField, {target: {value: 100}});
  fireEvent.click(saveButton);
  
  fireEvent.change(nameField, {target: {value: "New expense 2"}});
  fireEvent.change(costField, {target: {value: 200}});
  fireEvent.click(saveButton);
  
  const budget = screen.getByTestId("budget");
  const totalSpent = screen.getByTestId("total-spent");
  const remainingBudget = screen.getByTestId("remaining-budget");
  
  const budgetValue = parseFloat(budget.textContent?.split('$')[1] ?? '0');
  const totalSpentValue = parseFloat(totalSpent.textContent?.split('$')[1] ?? '0');
  const remainingBalanceValue = parseFloat(remainingBudget.textContent?.split('$')[1] ?? '0');

  expect(budgetValue).toBe(remainingBalanceValue + totalSpentValue);
  
  const deleteButton = screen.getByTestId("delete-button-New expense 1");
  fireEvent.click(deleteButton);
  
  const totalSpentAfterDelete = parseFloat(totalSpent.textContent?.split('$')[1] ?? '0');
  const remainingBalanceAfterDelete = parseFloat(remainingBudget.textContent?.split('$')[1] ?? '0');
  
  expect(budgetValue).toBe(remainingBalanceAfterDelete + totalSpentAfterDelete); 
});