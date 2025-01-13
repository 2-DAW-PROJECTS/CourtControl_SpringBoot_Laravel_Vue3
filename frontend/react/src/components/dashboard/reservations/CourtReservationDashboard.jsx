import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings, deleteNewBooking } from '../../../store/slices/reservations/reservationCourtSlice';
import { fetchCourtById } from '../../../store/slices/courtSlice';
import { fetchUserByEmail } from '../../../store/slices/userSlice';
import { getAllHours } from '../../../services/reservations/reservationCourtService';
import Constants from '../../../Constants';

const CourtReservationDashboard = () => {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings.bookings);
    const status = useSelector(state => state.bookings.status);
    const error = useSelector(state => state.bookings.error);
    const [users, setUsers] = useState([]);
    const [courts, setCourts] = useState([]);
    const [hours, setHours] = useState([]);
    const [rejectedBookings, setRejectedBookings] = useState(() => {
        const savedRejectedBookings = localStorage.getItem('rejectedBookings');
        return savedRejectedBookings ? JSON.parse(savedRejectedBookings) : [];
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageToday, setCurrentPageToday] = useState(1);
    const [currentPageRecent, setCurrentPageRecent] = useState(1);
    const itemsPerPage = 7;
    const itemsPerPageToday = 3;
    const itemsPerPageRecent = 10;

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            dispatch(fetchAllBookings(token));
            getAllHours(token).then(setHours).catch(console.error);
        } else {
            console.error('No token found');
        }
    }, [dispatch]);

    useEffect(() => {
        bookings.forEach(booking => {
            dispatch(fetchCourtById(booking.idCourt))
                .unwrap()
                .then(court => {
                    setCourts(prevCourts => [...prevCourts, court]);
                })
                .catch(error => console.error(`Error fetching court with id ${booking.idCourt}:`, error));
            dispatch(fetchUserByEmail(booking.email))
                .unwrap()
                .then(user => {
                    setUsers(prevUsers => [...prevUsers, user]);
                })
                .catch(error => console.error(`Error fetching user with email ${booking.email}:`, error));
        });
    }, [bookings, dispatch]);

    useEffect(() => {
        localStorage.setItem('rejectedBookings', JSON.stringify(rejectedBookings));
    }, [rejectedBookings]);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token'); 
        dispatch(deleteNewBooking({ id, token }));
        setRejectedBookings(prev => [...prev, id]);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePageChangeToday = (pageNumber) => {
        setCurrentPageToday(pageNumber);
    };

    const handlePageChangeRecent = (pageNumber) => {
        setCurrentPageRecent(pageNumber);
    };

    const getStatus = (booking) => {
        if (rejectedBookings.includes(booking.id)) {
            return 'Rejected';
        }
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        if (new Date(booking.createdAt).getFullYear() < currentYear || 
            (new Date(booking.createdAt).getFullYear() === currentYear && booking.idMonth < currentMonth) ||
            (new Date(booking.createdAt).getFullYear() === currentYear && booking.idMonth === currentMonth && booking.idDay < currentDay)) {
            return 'Out Time';
        }
        return 'Active';
    };

    const getHourLabel = (idHour) => {
        const hour = hours.find(h => h.id === idHour);
        return hour ? hour.hourTime.slice(0, 5) : 'Unknown Hour';
    };

    const renderPaginationButtons = (totalPages, currentPageValue, handlePageChangeFunction) => {
        const maxVisibleButtons = 8;
        let buttons = [];

        if (totalPages <= maxVisibleButtons) {
            buttons = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            if (currentPageValue <= 4) {
                buttons = [...Array.from({ length: 6 }, (_, i) => i + 1), '...', totalPages];
            } else if (currentPageValue >= totalPages - 3) {
                buttons = [1, '...', ...Array.from({ length: 6 }, (_, i) => totalPages - 5 + i)];
            } else {
                buttons = [1, '...', currentPageValue - 1, currentPageValue, currentPageValue + 1, '...', totalPages];
            }
        }

        return buttons.map((button, index) => (
            button === '...' ? (
                <span key={`ellipsis-${index}`} className="px-3 py-1 mx-1">...</span>
            ) : (
                <button
                    key={button}
                    className={`px-3 py-1 mx-1 rounded ${currentPageValue === button ? 'bg-[#92d8be] text-[#23232f]' : 'bg-[#525055] text-[#92d8be]'}`}
                    onClick={() => handlePageChangeFunction(button)}
                >
                    {button}
                </button>
            )
        ));
    };

    if (status === Constants.STATUS_LOADING) return <div>Loading...</div>;
    if (status === Constants.STATUS_FAILED) return <div>Error: {error}</div>;

    const uniqueCourts = Array.from(new Set(courts.map(court => court.id)))
        .map(id => courts.find(court => court.id === id));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourts = uniqueCourts.slice(indexOfFirstItem, indexOfLastItem);

    const today = new Date();
    const todayBookings = bookings.filter(booking => 
        booking.idDay === today.getDate() && 
        booking.idMonth === (today.getMonth() + 1) && 
        new Date(booking.createdAt).getFullYear() === today.getFullYear()
    );
    const indexOfLastToday = currentPageToday * itemsPerPageToday;
    const indexOfFirstToday = indexOfLastToday - itemsPerPageToday;
    const currentTodayBookings = todayBookings.slice(indexOfFirstToday, indexOfLastToday);

    const indexOfLastRecent = currentPageRecent * itemsPerPageRecent;
    const indexOfFirstRecent = indexOfLastRecent - itemsPerPageRecent;
    const currentRecentBookings = [...bookings]
        .sort((a, b) => {
            if (a.idMonth !== b.idMonth) {
                return b.idMonth - a.idMonth;
            }
            if (a.idDay !== b.idDay) {
                return b.idDay - a.idDay;
            }
            if (a.idHour !== b.idHour) {
                return getHourLabel(b.idHour) - getHourLabel(a.idHour);
            }
            return getHourLabel(b.idHour) - getHourLabel(a.idHour);
        })
        .slice(indexOfFirstRecent, indexOfLastRecent);

    const totalPages = Math.ceil(uniqueCourts.length / itemsPerPage);
    const totalPagesToday = Math.ceil(todayBookings.length / itemsPerPageToday);
    const totalPagesRecent = Math.ceil(bookings.length / itemsPerPageRecent);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#92d8be]">Court Reservation Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20 col-span-1">
                    <h2 className="text-lg font-semibold mb-4">Today's Reservations</h2>
                    <div className="space-y-4">
                        {currentTodayBookings.map(booking => (
                            <div key={booking.id} className="p-4 bg-[#525055] rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span>Court {courts.find(court => court.id === booking.idCourt)?.namePista || booking.idCourt}</span>
                                    <span>{getHourLabel(booking.idHour)}</span>
                                </div>
                                <div className="text-sm text-[#92d8be]">
                                    {users.find(user => user.email === booking.email)?.name || 'Unknown User'}
                                </div>
                                <div className="flex space-x-2 mt-2">
                                    <button 
                                        className="px-2 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-200"
                                        onClick={() => handleDelete(booking.id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        {renderPaginationButtons(totalPagesToday, currentPageToday, handlePageChangeToday)}
                    </div>
                </div>

                <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20 col-span-1">
                    <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
                    <div className="space-y-4">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
                            const monthBookings = bookings.filter(booking => booking.idMonth === month);
                            return (
                                <div key={month} className="flex items-center justify-between">
                                    <span>{new Date(2024, month - 1).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-[#92d8be]">{monthBookings.length} bookings</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20">
                <h2 className="text-lg font-semibold mb-4">Court Usage Statistics</h2>
                <div className="space-y-4">
                    {currentCourts.map(court => {
                        const courtBookings = bookings.filter(booking => booking.idCourt === court.id);
                        return (
                            <div key={court.id} className="flex items-center justify-between">
                                <span>Court {court.namePista}</span>
                                <div className="w-2/3 bg-[#525055] rounded-full h-2">
                                    <div 
                                        className="bg-[#92d8be] h-2 rounded-full"
                                        style={{ width: `${(courtBookings.length / bookings.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-center mt-4">
                    {renderPaginationButtons(totalPages, currentPage, handlePageChange)}
                </div>
            </div>

            <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20">
                <h2 className="text-lg font-semibold mb-4">Recent Reservations</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-[#92d8be]/20">
                                <th className="pb-2">Date</th>
                                <th className="pb-2">Time</th>
                                <th className="pb-2">Court</th>
                                <th className="pb-2">User</th>
                                <th className="pb-2">Status</th>
                                <th className="pb-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecentBookings.map(booking => (
                                <tr key={booking.id} className="border-b border-[#525055]/20">
                                    <td className="py-2">{`${booking.idDay}/${booking.idMonth}/${new Date(booking.createdAt).getFullYear()}`}</td>
                                    <td className="py-2">{getHourLabel(booking.idHour)}</td>
                                    <td className="py-2">Court {courts.find(court => court.id === booking.idCourt)?.namePista || booking.idCourt}</td>
                                    <td className="py-2">{users.find(user => user.email === booking.email)?.name || 'Unknown User'}</td>
                                    <td className="py-2">
                                        <span className={`px-2 py-1 rounded-full text-sm ${getStatus(booking) === 'Rejected' ? 'bg-red-500 text-white' : getStatus(booking) === 'Out Time' ? 'bg-yellow-500 text-white' : 'bg-[#92d8be]/20 text-[#92d8be]'}`}>
                                            {getStatus(booking)}
                                        </span>
                                    </td>
                                    <td className="py-2">
                                        {getStatus(booking) === 'Active' && (
                                            <button 
                                                className="px-2 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-200"
                                                onClick={() => handleDelete(booking.id)}
                                            >
                                                Reject
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    {renderPaginationButtons(totalPagesRecent, currentPageRecent, handlePageChangeRecent)}
                </div>            
            </div>
        </div>
    );
};

export default CourtReservationDashboard;