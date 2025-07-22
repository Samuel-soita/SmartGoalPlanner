import {useState} from 'react';

function AddGoalForm({ onAddGoal }) {
    const [goal, setGoal] = useState({
        name: '',
        targetAmount: '',
        savedAmount: '',
        category: '',
        deadline: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoal((prevGoal) => ({
            ...prevGoal,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddGoal(goal);
        setGoal({
            name: '',
            targetAmount: '',
            savedAmount: '',
            category: '',
            deadline: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="add-goal-form">
            <input type="text" name="name" placeholder="Goal Name" value={goal.name} onChange={handleChange} required />
            <input type="number" name="targetAmount" placeholder="Target Amount" value={goal.targetAmount} onChange={handleChange} required />
            <input type="number" name="savedAmount" placeholder="Saved Amount" value={goal.savedAmount} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" value={goal.category} onChange={handleChange} required />
            <input type="date" name="deadline" value={goal.deadline} onChange={handleChange} required />
            <button type="submit">Add Goal</button>
        </form>
    );
}
export default AddGoalForm;