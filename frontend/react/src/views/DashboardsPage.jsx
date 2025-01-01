// frontend/react/src/pages/DashboardsPage.jsx
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
// import CourtDashboard from '../components/dashboard/CourtDashboard';
// import LessonDashboard from '../components/dashboard/LessonDashboard';
// import SummerDashboard from '../components/dashboard/SummerDashboard';

const DashboardsPage = () => {
    const [activeDashboard, setActiveDashboard] = useState('courts');

    const renderDashboard = () => {
        switch (activeDashboard) {
            case 'lessons':
                // return <LessonDashboard />;
                return 'Lessons Dashboard';
            case 'summers':
                // return <SummerDashboard />;
                return 'Summer Dashboard';
            case 'courts':
            default:
                // return <CourtDashboard />;
                return 'Courts Dashboard';
        }
    };

    return (
        <DashboardLayout activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard}>
            {renderDashboard()}
        </DashboardLayout>
    );
};

export default DashboardsPage;

// import React, { useState } from 'react';
// import CourtDashboard from '../components/dashboard/CourtDashboard';
// import LessonDashboard from '../components/dashboard/LessonDashboard';
// import SummerDashboard from '../components/dashboard/SummerDashboard';

// const DashboardsPage = () => {
//     const [activeDashboard, setActiveDashboard] = useState('courts');

//     const renderDashboard = () => {
//         switch (activeDashboard) {
//             case 'lessons':
//                 return <LessonDashboard />;
//             case 'summers':
//                 return <SummerDashboard />;
//             case 'courts':
//             default:
//                 return <CourtDashboard />;
//         }
//     };

//     return (
//         <div>
//             <h1>Dashboards</h1>
//             <div className="dashboard-selector">
//                 <button onClick={() => setActiveDashboard('courts')}>Courts Dashboard</button>
//                 <button onClick={() => setActiveDashboard('lessons')}>Lessons Dashboard</button>
//                 <button onClick={() => setActiveDashboard('summers')}>Summers Dashboard</button>
//             </div>
//             <div className="dashboard-content">
//                 {renderDashboard()}
//             </div>
//         </div>
//     );
// };

// export default DashboardsPage;