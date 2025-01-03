import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import CourtDashboard from '../components/dashboard/CourtDashboard';
import LessonDashboard from '../components/dashboard/LessonDashboard';
import SummerDashboard from '../components/dashboard/SummerDashboard';
import UserDashboard from '../components/dashboard/UserDashboard';

const DashboardsPage = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [activeDashboard, setActiveDashboard] = useState(type || 'courts');

    useEffect(() => {
        if (type !== activeDashboard) {
            navigate(`/admin/${activeDashboard}`);
        }
    }, [activeDashboard, navigate, type]);

    const renderDashboard = () => {
        switch (activeDashboard) {
            case 'lessons':
                return <LessonDashboard />;
            case 'summers':
                return <SummerDashboard />;
            case 'users':
                return <UserDashboard />;
            case 'courts':
            default:
                return <CourtDashboard />;
        }
    };

    return (
        <DashboardLayout activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard}>
            {renderDashboard()}
        </DashboardLayout>
    );
};

export default DashboardsPage;

// // frontend/react/src/pages/DashboardsPage.jsx
// import React, { useState } from 'react';
// import DashboardLayout from '../components/layout/DashboardLayout';
// import CourtDashboard from '../components/dashboard/CourtDashboard';
// import LessonDashboard from '../components/dashboard/LessonDashboard';
// import SummerDashboard from '../components/dashboard/SummerDashboard';
// import UserDashboard from '../components/dashboard/UserDashboard';


// const DashboardsPage = () => {
//     const [activeDashboard, setActiveDashboard] = useState('courts');

//     const renderDashboard = () => {
//         switch (activeDashboard) {
//             case 'lessons':
//                 return <LessonDashboard />;
//                 // return 'Lessons Dashboard';
//             case 'summers':
//                 return <SummerDashboard />;
//                 // return 'Summer Dashboard';
//             case 'users':
//                 return <UserDashboard />;
//                 // return 'Summer Dashboard';
//             case 'courts':
//             default:
//                 return <CourtDashboard />;
//                 // return 'Courts Dashboard';
//         }
//     };

//     return (
//         <DashboardLayout activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard}>
//             {renderDashboard()}
//         </DashboardLayout>
//     );
// };

// export default DashboardsPage;
