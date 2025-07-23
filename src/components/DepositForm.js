import { useState, useEffect } from 'react';

function DepositForm({ goals, onAddDeposit }) {
  const [Deposit, setDeposit] = useState({
    goalsId: '',
    amount: ''
  });

  useEffect(() => {
    if (goals) {
      setDeposit(prev => ({
        ...prev,
        goalsId: goals.id
      }));
    }
  }, [goals]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Deposit.amount && Deposit.goalsId) {
      const updatedAmount = goals.savedAmount + parseFloat(Deposit.amount);

      fetch(`http://localhost:3000/goals/${goals.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          savedAmount: updatedAmount
        }),
      })
      .then(res => res.json())
      .then(updatedGoal => {
        // Notify parent to update state
        onAddDeposit(updatedGoal);
        // Reset only the amount field
        setDeposit({ goalsId: updatedGoal.id, amount: '' });
      });
    }
  };

  if (!goals) {
    return (
      <p style={{ fontStyle: 'italic', color: '#888' }}>
        Select a goal to deposit
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#f9f9f9',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      marginTop: '1rem'
    }}>
      <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>
        Deposit for {goals.name}
      </h3>
      <input
        type="number"
        placeholder="Deposit Amount"
        value={Deposit.amount}
        onChange={(e) => setDeposit({ ...Deposit, amount: e.target.value })}
        required
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '1rem'
        }}
      />
      <button type="submit" style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem'
      }}>
        Add Deposit
      </button>
    </form>
  );
}

export default DepositForm;
