import { useState } from "react";
import ProgressBar from "./ProgressBar";
import DeadlineStatus from "./DeadlineStatus";

// Component representing a single savings goal card
function GoalCard({ goal, onUpdateGoal, onDeleteGoal, onAddDeposit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });

  const handleSave = () => {
    onUpdateGoal(editedGoal);
    setIsEditing(false);
  };

  const handleDeposit = () => {
    const depositAmount = parseFloat(prompt("Enter deposit amount:"));
    if (!isNaN(depositAmount) && depositAmount > 0) {
      onAddDeposit(goal.id, depositAmount);
    }
  };

  return (
    <div className="goal-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedGoal.title}
            onChange={(e) =>
              setEditedGoal({ ...editedGoal, title: e.target.value })
            }
          />
          <input
            type="number"
            value={editedGoal.targetAmount}
            onChange={(e) =>
              setEditedGoal({ ...editedGoal, targetAmount: parseFloat(e.target.value) })
            }
          />
          <input
            type="date"
            value={editedGoal.deadline}
            onChange={(e) =>
              setEditedGoal({ ...editedGoal, deadline: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{goal.title}</h3>
          <p>Target: ${goal.targetAmount}</p>
          <p>Saved: ${goal.savedAmount}</p>
          <DeadlineStatus deadline={goal.deadline} />
          <ProgressBar current={goal.savedAmount} target={goal.targetAmount} />
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
          <button onClick={handleDeposit}>Add Deposit</button>
        </>
      )}
    </div>
  );
}

export default GoalCard;
