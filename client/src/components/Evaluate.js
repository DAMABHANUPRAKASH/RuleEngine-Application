import React, { useState } from 'react';

const Evaluate = () => {
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');
    const [income, setIncome] = useState('');
    const [spend, setSpend] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/rules/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rule_id: 'RULE_ID_FROM_DB',  // Replace with actual rule ID
                    data: { age, department, income, spend }
                }),
            });
            const data = await response.json();
            setResult(data.eligible ? 'Eligible' : 'Not Eligible');
        } catch (error) {
            console.error('Error evaluating rule:', error);
            setResult('Error evaluating rule');
        }
    };

    return (
        <div>
            <h1>Rule Engine</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Age" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Department" 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Income" 
                    value={income}
                    onChange={(e) => setIncome(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Spend" 
                    value={spend}
                    onChange={(e) => setSpend(e.target.value)} 
                />
                <button type="submit">Evaluate</button>
            </form>
            {result && <h2>Result: {result}</h2>}
        </div>
    );
};

export default Evaluate;
