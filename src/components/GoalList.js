import GoalCard from './GoalCard';

// This component renders a list of goal cards, each representing a goal with its details.

function GoalList({ goals, onUpdateGoal, onDeleteGoal}){
    return (
        <div className="goal-list">
            {goals.map((goal) => (
                <GoalCard 
                    key={goal.id} 
                    goal={goal} 
                    onUpdateGoal={onUpdateGoal} 
                    onDeleteGoal={onDeleteGoal} 
                />
            ))}
        </div>
    );
}
export default GoalList;
