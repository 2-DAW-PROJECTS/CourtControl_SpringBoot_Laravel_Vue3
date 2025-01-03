import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSummers } from '../../store/slices/summerSlice';
import SummerDetails from '../details/SummerDetails';

const SummerDashboard = () => {
    const dispatch = useDispatch();
    const summers = useSelector((state) => state.summers.summers);
    const status = useSelector((state) => state.summers.status);

    useEffect(() => {
        dispatch(fetchSummers());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Cargando veranos...</div>;
    }

    if (summers.length === 0) {
        return <div>No hay datos disponibles.</div>;
    }

    return (
        <div>
            <h1>Summer Dashboard</h1>
            <div>
                {summers.map((summer) => (
                    <SummerDetails key={summer.id} summer={summer} />
                ))}
            </div>
        </div>
    );
};

export default SummerDashboard;