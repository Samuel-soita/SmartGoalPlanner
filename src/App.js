import { useState, useEffect } from 'react';
import GoalList from './components/GoalList';
import AddGoalForm from './components/AddGoalForm';
import DepositForm from './components/DepositForm';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


//fetch all goals from our db.json file

useEffect(() => {
  fetch('http://localhost:3000/goals')
    .then((response) => response.json())
    .then((data) => {
      setGoals(data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching goals:', error);
      setIsLoading(false);
    });
}, []);


//Add new goal to to the db.json file
const addGoal = (newGoal) => {
  fetch('http://localhost:3000/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newGoal),
  })
    .then((response) => response.json())
    .then((data) => {
      setGoals((prevGoals) => [...prevGoals, data]);
    })
    .catch((error) => {
      console.error('Error adding goal:', error);
    });
}

//update goal in the db.json file
const updateGoal = (updatedGoal) => {
  fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedGoal),
  })
    .then((response) => response.json())
    .then((data) => {
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal.id === data.id ? data : goal))
      );
    })
    .catch((error) => {
      console.error('Error updating goal:', error);
    });
}

//delete goal fron the db.json file 
const deleteGoal = (goalId) => {
  fetch(`http://localhost:3000/goals/${goalId}`, {
    method: 'DELETE',
  })
    .then(() => {
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    })
    .catch((error) => {
      console.error('Error deleting goal:', error);
    });
}

//add a deposit to a goal in the db.json file
const addDeposit = (goalId, depositAmount) => {
  const goal = goals.find((goal) => goal.id === goalId);
  if (!goal) return;

  const updatedGoal = {
    ...goal,
    savedAmount: Number(goal.savedAmount) + Number(depositAmount),
  };

  fetch(`http://localhost:3000/goals/${goalId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedGoal),
  })
    .then((response) => response.json())
    .then((data) => {
      setGoals((prevGoals) =>
        prevGoals.map((g) => (g.id === data.id ? data : g))
      );
    })
    .catch((error) => {
      console.error('Error adding deposit:', error);
    });
  }

if (isLoading) {
  return <div className="loading">Loading...</div>;
}

return (
  <div className="App">
    <h1>Smart Goal Planner</h1>
    <AddGoalForm onAddGoal={addGoal} />
    <DepositForm goals={goals} addDeposit={addDeposit} />
    <GoalList
      goals={goals}
      onUpdateGoal={updateGoal}
      onDeleteGoal={deleteGoal}
    />
  </div>
);
}
export default App;




