import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReservationLayout from '../components/layout/ReservationLayout';
import CourtReservationDashboard from '../components/dashboard/reservations/CourtReservationDashboard';
import LessonReservationDashboard from '../components/dashboard/reservations/LessonReservationDashboard';
import SummerReservationDashboard from '../components/dashboard/reservations/SummerReservationDashboard';

const ReservationsPage = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [activeReservation, setActiveReservation] = useState(type || 'court');

    useEffect(() => {
        if (type !== activeReservation) {
            navigate(`/admin/reservations/${activeReservation}`);
        }
    }, [activeReservation, navigate, type]);

    const renderDashboard = () => {
        switch (activeReservation) {
            case 'lesson':
                return <LessonReservationDashboard />;
            case 'summer':
                return <SummerReservationDashboard />;
            case 'court':
            default:
                return <CourtReservationDashboard />;
        }
    };

    return (
        <ReservationLayout activeReservation={activeReservation} setActiveReservation={setActiveReservation}>
            {renderDashboard()}
        </ReservationLayout>
    );
};

export default ReservationsPage;