import { useState,useEffect,useCallback } from 'react';
import './App.css';

import useFetch from './hooks/useFetch';

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const { currencies, loading, error } = useFetch(fromCurrency);

  // Convert amount based on selected currencies
  const handleConvert = useCallback(() => {
    if (currencies.conversion_rates) {
      const rate = currencies.conversion_rates[toCurrency];
      setConvertedAmount(amount * rate);
    }
  }, [toCurrency, amount, currencies]);
  useEffect(() => {
    handleConvert();
  }, [fromCurrency, toCurrency, amount, currencies, handleConvert]);




  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-4 bg-black' >
      <div className='bg-white max-h-fit min-w-fit  flex flex-col justify-center items-center gap-4 p-4 rounded-lg'> 
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <>
          {/* Dropdown to select "from" currency */}
          <label className=' p-2'>
          <label className='w-30 mr-2'>From Currency:</label>            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              {Object.keys(currencies.conversion_rates || {}).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </label>

          {/* Dropdown to select "to" currency */}
          <label className='p-2'>
            <label className='w-30 mr-2'>To Currency:</label>
            <select className='ml-5' value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              {Object.keys(currencies.conversion_rates || {}).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </label>

          {/* Input for amount to convert */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="p-2 border rounded"
          />

          {/* Convert button */}
          <button onClick={handleConvert} className="p-2 bg-blue-500 text-white rounded">
            Convert
          </button>

          {/* Display the converted amount */}
          {convertedAmount !== null && (
            <p>
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
            </p>
          )}
        </>
      )}
      </div>
    </div>
  );
}

export default App;
