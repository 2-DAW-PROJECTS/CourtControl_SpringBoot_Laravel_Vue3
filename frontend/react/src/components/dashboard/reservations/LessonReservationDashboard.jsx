import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLessonBookingsThunk, deleteLessonBookingThunk } from '../../../store/slices/reservations/reservationLessonSlice';
import { fetchLessonById } from '../../../store/slices/lessonSlice';
import { fetchUserById } from '../../../store/slices/userSlice';
import Constants from '../../../Constants';

const LessonReservationDashboard = () => {
    const dispatch = useDispatch();
    const bookingsLessons = useSelector(state => state.bookingsLessons.bookingsLessons);
    const status = useSelector(state => state.bookingsLessons.status);
    const error = useSelector(state => state.bookingsLessons.error);
    const [users, setUsers] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [rejectedBookings, setRejectedBookings] = useState(() => {
        const savedRejectedBookings = localStorage.getItem('rejectedLessonBookings');
        return savedRejectedBookings ? JSON.parse(savedRejectedBookings) : [];
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            dispatch(fetchAllLessonBookingsThunk(token));
        } else {
            console.error('No token found');
        }
    }, [dispatch]);

    useEffect(() => {
        // console.log('Bookings Lessons:', bookingsLessons);
        bookingsLessons.forEach(booking => {
            dispatch(fetchLessonById(booking.idLesson))
                .unwrap()
                .then(lesson => {
                    // console.log('Fetched Lesson:', lesson);
                    setLessons(prevLessons => [...prevLessons, lesson]);
                })
                .catch(error => console.error(`Error fetching lesson with id ${booking.idLesson}:`, error));
            dispatch(fetchUserById(booking.idUser))
                .unwrap()
                .then(user => {
                    setUsers(prevUsers => [...prevUsers, user]);
                })
                .catch(error => console.error(`Error fetching user with id ${booking.idUser}:`, error));
        });
    }, [bookingsLessons, dispatch]);

    useEffect(() => {
        localStorage.setItem('rejectedLessonBookings', JSON.stringify(rejectedBookings));
    }, [rejectedBookings]);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token'); 
        dispatch(deleteLessonBookingThunk({ id, token }));
        setRejectedBookings(prev => [...prev, id]);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getStatus = (booking) => {
        if (rejectedBookings.includes(booking.id)) {
            return 'Rejected';
        }
        const bookingDate = new Date(booking.createdAt);
        // console.log('Booking Date:', bookingDate);
        const currentDate = new Date();
        // console.log('Current Date:', currentDate);
        if (bookingDate < currentDate) {
            return 'Out Time';
        }
        return 'Active';
    };

    if (status === Constants.STATUS_LOADING) return <div>Loading...</div>;
    if (status === Constants.STATUS_FAILED) return <div>Error: {error}</div>;

    // Filtrar las lecciones duplicadas
    const uniqueLessons = Array.from(new Set(lessons.map(lesson => lesson.id)))
        .map(id => lessons.find(lesson => lesson.id === id));

    // Calcular los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLessons = uniqueLessons.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(uniqueLessons.length / itemsPerPage);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#92d8be]">Lesson Reservation Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20">
                    <h2 className="text-lg font-semibold mb-4">Today's Reservations</h2>
                    <div className="space-y-4">
                        {bookingsLessons
                            .filter(booking => new Date(booking.createdAt).toDateString() === new Date().toDateString())
                            .map(booking => {
                                // console.log('Booking:', booking);
                                const lesson = lessons.find(lesson => lesson.id === booking.idLesson);
                                // console.log('Lesson:', lesson);
                                return (
                                    <div key={booking.id} className="p-4 bg-[#525055] rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span>Lesson {lesson?.nameClass || booking.idLesson}</span>
                                            <span>{lesson?.time}</span>
                                        </div>
                                        <div className="text-sm text-[#92d8be]">
                                            {users.find(user => user.id === booking.idUser)?.name || 'Unknown User'}
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
                                );
                            })}
                    </div>
                </div>

                <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20">
                    <h2 className="text-lg font-semibold mb-4">Lesson Usage Statistics</h2>
                    <div className="space-y-4">
                        {currentLessons.map(lesson => {
                            const lessonBookings = bookingsLessons.filter(booking => booking.idLesson === lesson.id);
                            return (
                                <div key={lesson.id} className="flex items-center justify-between">
                                    <span>Lesson {lesson.nameClass}</span>
                                    <div className="w-2/3 bg-[#525055] rounded-full h-2">
                                        <div 
                                            className="bg-[#92d8be] h-2 rounded-full"
                                            style={{ width: `${(lessonBookings.length / bookingsLessons.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                className={`px-3 py-1 mx-1 rounded ${currentPage === pageNumber ? 'bg-[#92d8be] text-[#23232f]' : 'bg-[#525055] text-[#92d8be]'}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20">
                    <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
                    <div className="space-y-4">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
                            const monthBookings = bookingsLessons.filter(booking => booking.idMonth === month);
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
                <h2 className="text-lg font-semibold mb-4">Recent Reservations</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-[#92d8be]/20">
                                <th className="pb-2">Date</th>
                                <th className="pb-2">Time</th>
                                <th className="pb-2">Lesson</th>
                                <th className="pb-2">User</th>
                                <th className="pb-2">Status</th>
                                <th className="pb-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...bookingsLessons] // Crear una copia del array antes de ordenarlo
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .slice(0, 10)
                                .map(booking => {
                                    // console.log('Booking:', booking);
                                    const lesson = lessons.find(lesson => lesson.id === booking.idLesson);
                                    // console.log('Lesson:', lesson);
                                    return (
                                        <tr key={booking.id} className="border-b border-[#525055]/20">
                                            <td className="py-2">{new Date(booking.createdAt).toLocaleDateString()}</td>
                                            {/* <td className="py-2">{`${lesson?.time || booking.idHour}:00`}</td> */}
                                            <td className="py-2">{`${lesson?.time || "14:00"}`}</td>
                                            <td className="py-2">{lesson?.nameClass || booking.idLesson}</td>
                                            <td className="py-2">{users.find(user => user.id === booking.idUser)?.name || 'Unknown User'}</td>
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
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LessonReservationDashboard;
