import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedInput = JSON.parse(jsonInput);
            const response = await fetch('http://localhost:3000/bfhl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsedInput)
            });
            const data = await response.json();
            setResponseData(data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setSelectedFilters(
            selectedFilters.includes(value)
                ? selectedFilters.filter(filter => filter !== value)
                : [...selectedFilters, value]
        );
    };

    const renderResponse = () => {
        if (!responseData) return null;

        return (
            <div>
                {selectedFilters.includes('numbers') && <p>Numbers: {responseData.numbers.join(', ')}</p>}
                {selectedFilters.includes('alphabets') && <p>Alphabets: {responseData.alphabets.join(', ')}</p>}
                {selectedFilters.includes('highest_lowercase_alphabet') && 
                 <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</p>}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>{'ABCD123'}</h1> {/* Replace with dynamic roll number */}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON input'
                    rows="4"
                    cols="50"
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>
                    <input type="checkbox" value="numbers" onChange={handleFilterChange} />
                    Numbers
                </label>
                <label>
                    <input type="checkbox" value="alphabets" onChange={handleFilterChange} />
                    Alphabets
                </label>
                <label>
                    <input type="checkbox" value="highest_lowercase_alphabet" onChange={handleFilterChange} />
                    Highest Lowercase Alphabet
                </label>
            </div>
            {renderResponse()}
        </div>
    );
}

export default App;
