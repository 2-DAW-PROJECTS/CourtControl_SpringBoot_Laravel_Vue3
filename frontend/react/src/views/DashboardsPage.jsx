// frontend/react/src/pages/DashboardsPage.jsx
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import CourtDashboard from '../components/dashboard/CourtDashboard';
import LessonDashboard from '../components/dashboard/LessonDashboard';
import SummerDashboard from '../components/dashboard/SummerDashboard';

const DashboardsPage = () => {
    const [activeDashboard, setActiveDashboard] = useState('courts');

    const renderDashboard = () => {
        switch (activeDashboard) {
            case 'lessons':
                return <LessonDashboard />;
                // return 'Lessons Dashboard';
            case 'summers':
                return <SummerDashboard />;
                // return 'Summer Dashboard';
            case 'courts':
            default:
                return <CourtDashboard />;
                // return 'Courts Dashboard';
        }
    };

    return (
        <DashboardLayout activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard}>
            {renderDashboard()}
        </DashboardLayout>
    );
};

export default DashboardsPage;
