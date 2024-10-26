import React, { useState } from 'react';
import Evaluate from './components/Evaluate';
import Results from './components/Results';
import './App.css';

function App() {
    const [eligibility, setEligibility] = useState(null);

    const handleEvaluate = (eligibilityResult) => {
        setEligibility(eligibilityResult);
    };

    return (
        <div className="App">
            
            <Evaluate onEvaluate={handleEvaluate} />
            {eligibility !== null && <Results eligibility={eligibility} />}
        </div>
    );
}

export default App;
