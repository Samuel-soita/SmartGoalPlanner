function GoalOverview({goals}){
const totalSaved = goals.reduce ((sum, goal) => sum + goal.savedAmount, 0);

const totalTarget = goals.reduce ((sum, goal) => sum + goal.targetAmount, 0);

const completed = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

return (
    <div className="goal-overview">
        <h2>Overview</h2>
        <p>Total Goals: {goals.length}</p>
        <p>Completed: {completed}</p>
        <p>Total Saved: ${totalSaved.toFixed(2)}</p>
        <p>Total Target: ${totalTarget.toFixed(2)}</p>
        <p>Progress: {((totalSaved / totalTarget) * 100).toFixed(2)}%</p>
        </div>



);
            
}
export default GoalOverview;