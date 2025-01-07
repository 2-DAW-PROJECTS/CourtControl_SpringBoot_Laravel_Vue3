import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReservationLayout = ({ children, activeReservation, setActiveReservation }) => {
    const navigate = useNavigate();

    const handleReservationChange = (reservation) => {
        setActiveReservation(reservation);
        navigate(`/admin/reservations/${reservation}`);
    };

    return (
        <div className="reservation-layout min-h-screen bg-[#23232f] text-[#f6f1de]">
            <nav className="sticky top-0 bg-[#525055] shadow-xl border-b border-[#92d8be]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button 
                                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 ${
                                    activeReservation === 'court' 
                                    ? 'bg-[#92d8be] text-[#23232f] shadow-lg' 
                                    : 'bg-[#23232f] hover:bg-[#9bada1] hover:text-[#23232f]'
                                }`} 
                                onClick={() => handleReservationChange('court')}
                            >
                                Court Reservations
                            </button>
                            <button 
                                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 ${
                                    activeReservation === 'lesson' 
                                    ? 'bg-[#92d8be] text-[#23232f] shadow-lg' 
                                    : 'bg-[#23232f] hover:bg-[#9bada1] hover:text-[#23232f]'
                                }`} 
                                onClick={() => handleReservationChange('lesson')}
                            >
                                Lesson Reservations
                            </button>
                            <button 
                                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 ${
                                    activeReservation === 'summer' 
                                    ? 'bg-[#92d8be] text-[#23232f] shadow-lg' 
                                    : 'bg-[#23232f] hover:bg-[#9bada1] hover:text-[#23232f]'
                                }`} 
                                onClick={() => handleReservationChange('summer')}
                            >
                                Summer Reservations
                            </button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button 
                                className="px-4 py-2 bg-[#eb6a65] rounded-lg font-semibold hover:bg-[#fc9b70] transition-all duration-200 ease-in-out text-[#23232f]"
                                onClick={() => navigate('/admin')}
                            >
                                Back to Admin
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-[#525055] rounded-2xl shadow-2xl p-6 text-[#f6f1de] border border-[#92d8be]/20">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ReservationLayout;