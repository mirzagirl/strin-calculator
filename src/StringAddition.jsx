import React, { useState } from 'react';
import { Add } from './Add.js';

function StringCalculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleCalculate = () => {
        try {
            setError('');
            const result = Add(input);
            setResult(result);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <textarea
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers"
            />
            <button onClick={handleCalculate}>Calculate</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result !== null && <p>Result: {result}</p>}
        </div>
    );
}

export default StringCalculator;
