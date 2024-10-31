import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    getBudget();
  }, []);

  const getBudget = async () => {
    try {
      const fetchedBudget = await fetchBudget();
      setBudget(fetchedBudget);
      setNewBudget(fetchedBudget);
    } catch (error) {
      console.error("Could not retrieve budget", error);
    }
  };

  const handleBudgetUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedBudget = await updateBudget(newBudget);
      setBudget(updatedBudget);
      setIsEditing(false);
    } catch (error) {
      console.error("Could not update budget", error);
    }
  };

  return (
    <div
      className="alert alert-secondary p-3 d-flex align-items-center justify-content-between"
      data-testid="budget"
    >
      {isEditing ? (
        <form onSubmit={handleBudgetUpdate} className="d-flex align-items-center">
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(parseInt(e.target.value))}
            className="form-control mr-2" 
          />
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      ) : (
        <>
          <div>Budget: ${budget}</div>
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Budget;
