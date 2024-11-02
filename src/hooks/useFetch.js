import { useState, useEffect } from 'react';

const useFetch = (curr) => {
    const [currencies, setCurrencies] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const apiUrl=`https://v6.exchangerate-api.com/v6/f1eef6176eed9cc9ff7ad956/latest/${curr}`;


                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error("Error fetching data");
                const data = await response.json();
                setCurrencies(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrencies();
    }, [curr]);

    return { currencies, loading, error };
};

export default useFetch;
