import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourts } from '../../store/slices/courtSlice';
import CourtDetails from '../details/CourtDetails';

const CourtDashboard = () => {
    const dispatch = useDispatch();
    const courts = useSelector((state) => state.courts.courts);
    const status = useSelector((state) => state.courts.status);

    useEffect(() => {
        dispatch(fetchCourts());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Cargando canchas...</div>;
    }

    if (courts.length === 0) {
        return <div>No hay datos disponibles.</div>;
    }

    return (
        <div>
            <h1>Court Dashboard</h1>
            <div>
                {courts.map((court) => (
                    <CourtDetails key={court.id} court={court} />
                ))}
            </div>
        </div>
    );
};

export default CourtDashboard;