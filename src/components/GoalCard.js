import { useState } from "react";
import ProgressBar from "./ProgressBar";
import DeadlineStatus from "./DeadlineStatus";


//function goalcard 
function GoalCard({ goal, onUpdateGoal, onDeleteGoal }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedGoal, setEditedGoal] = useState({ ...goal });

    //save changes and exit mode 
    const handleSave = () => {
        onUpdateGoal(editedGoal);
        setIsEditing(false);
    };


    return (
        <div className ="goal-card">
            {isEditing ? (
                <div className="edit-form">
                    <input
                        value={editedGoal.name}
                        onChange={(e)=>setEditedGoal({...editedGoal, name: e.target.value})}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <>
                <h3>{goal.name}</h3>
                <p>Category : {goal.category}</p>

                
                <ProgressBar 
                    targetAmount={goal.targetAmount} 
                    savedAmount={goal.savedAmount}
                />
                <p>Saved Amount: ${goal.savedAmount}</p>
                <p>Target Amount: ${goal.targetAmount}</p>

                <DeadlineStatus deadline={goal.deadline} />

                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>


                </>
            )}
        </div>
    );

}
export default GoalCard;

