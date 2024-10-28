import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  const { budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  if(budget - totalExpenses < 0){
    alert("You have exceeded your budget!");
  }
  

  return (
    <div className={`alert ${alertType}`}>
      <span
      data-testid="remaining-budget"
      >Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
