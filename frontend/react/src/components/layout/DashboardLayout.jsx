import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children, activeDashboard, setActiveDashboard }) => {
    const navigate = useNavigate();

    const handleDashboardChange = (dashboard) => {
        setActiveDashboard(dashboard);
        navigate(`/admin/${dashboard}`);
    };

    return (
        <div className="dashboard-layout min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <nav className="sticky top-0 backdrop-blur-md bg-white/90 shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-16 space-x-6">
                        <button 
                            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                                activeDashboard === 'courts' 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`} 
                            onClick={() => handleDashboardChange('courts')}
                        >
                            Courts
                        </button>
                        <button 
                            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                                activeDashboard === 'lessons' 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`} 
                            onClick={() => handleDashboardChange('lessons')}
                        >
                            Lessons
                        </button>
                        <button 
                            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                                activeDashboard === 'summers' 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`} 
                            onClick={() => handleDashboardChange('summers')}
                        >
                            Summers
                        </button>
                        <button 
                            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                                activeDashboard === 'users' 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`} 
                            onClick={() => handleDashboardChange('users')}
                        >
                            Users
                        </button>
                    </div>
                </div>
            </nav>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
