import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { deleteExpense } from "../../utils/expense-utils";


const ExpenseItem = (currentExpense: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = async (currentExpense: Expense) => {
    try {
      await deleteExpense(currentExpense.id);
      const updatedExpenses = expenses.filter((e : Expense) => e.id !== currentExpense.id);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error("Failed to delete expense", error);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button
        data-testid={`delete-button-${currentExpense.description}`} 
        onClick={() => handleDeleteExpense(currentExpense)}>
          x
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
