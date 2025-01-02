// frontend/react/src/hooks/useCourts.js
import { useState, useEffect } from 'react';
import { getCourts } from '../services/courtService';

const useCourts = (filters = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getCourts(filters);
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    return { data, loading, error };
};

export default useCourts;