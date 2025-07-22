import {useState, useEffect} from 'react';

function DepositForm({goals, onAddDeposit}){

    const [Deposit, setDeposit] = useState({
        goalsId:'',
        amount: ''
    });
    useEffect(() => {
        if (goals) {
            setDeposit(prev=> ({
                ...prev,
                goalsId: goals.id
            }));
        }
    }, [goals]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Deposit.amount && Deposit.goalsId) {
            onAddDeposit(Deposit);
            setDeposit({goalsId: Deposit.goalsId, amount: ''});

            // Optionally, you can also reset the form or show a success message
            fetch(`http://localhost:3000/goals/${goals.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    savedAmount: goals.savedAmount + parseFloat(Deposit.amount)
                }),
            });
        }

    };
    if (!goals) {
        return <p>Select a goal to deposit</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="deposit-form">
            <h3>Deposit for {goals.name}</h3>
            <input 
                type="number" 
                placeholder="Deposit Amount" 
                value={Deposit.amount} 
                onChange={(e) => setDeposit({...Deposit, amount: e.target.value})} 
                required 
            />
            <button type="submit">Add Deposit</button>
        </form>
    );
}

export default DepositForm;