import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings, updateNewBooking, deleteNewBooking } from '../../../store/slices/reservations/reservationCourtSlice';
import { fetchCourtById } from '../../../store/slices/courtSlice';
import { fetchUserById } from '../../../store/slices/userSlice';
import Constants from '../../../Constants';

const CourtReservationDashboard = () => {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings.bookings);
    const status = useSelector(state => state.bookings.status);
    const error = useSelector(state => state.bookings.error);
    const [users, setUsers] = useState([]);
    const [courts, setCourts] = useState([]);
    const [rejectedBookings, setRejectedBookings] = useState(() => {
        const savedRejectedBookings = localStorage.getItem('rejectedBookings');
        return savedRejectedBookings ? JSON.parse(savedRejectedBookings) : [];
    });

    const [formData, setFormData] = useState({
        courtId: '',
        userId: '',
        date: '',
        time: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            dispatch(fetchAllBookings(token));
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
            dispatch(fetchUserById(booking.idUser))
                .unwrap()
                .then(user => {
                    setUsers(prevUsers => [...prevUsers, user]);
                })
                .catch(error => console.error(`Error fetching user with id ${booking.idUser}:`, error));
        });
    }, [bookings, dispatch]);

    useEffect(() => {
        localStorage.setItem('rejectedBookings', JSON.stringify(rejectedBookings));
    }, [rejectedBookings]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const handleUpdate = (id) => {
    //     const token = localStorage.getItem('token'); 
    //     dispatch(updateNewBooking({ id, bookingData: formData, token }));
    // };

    const handleDelete = (id) => {
        const token = localStorage.getItem('token'); 
        dispatch(deleteNewBooking({ id, token }));
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
        const currentDate = new Date();
        if (bookingDate < currentDate) {
            return 'Out Time';
        }
        return 'Active';
    };

    if (status === Constants.STATUS_LOADING) return <div>Loading...</div>;
    if (status === Constants.STATUS_FAILED) return <div>Error: {error}</div>;

    // Filtrar las pistas duplicadas
    const uniqueCourts = Array.from(new Set(courts.map(court => court.id)))
        .map(id => courts.find(court => court.id === id));

    // Calcular los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourts = uniqueCourts.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(uniqueCourts.length / itemsPerPage);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#92d8be]">Court Reservation Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20">
                    <h2 className="text-lg font-semibold mb-4">Today's Reservations</h2>
                    <div className="space-y-4">
                        {bookings
                            .filter(booking => new Date(booking.createdAt).toDateString() === new Date().toDateString())
                            .map(booking => (
                                <div key={booking.id} className="p-4 bg-[#525055] rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span>Court {courts.find(court => court.id === booking.idCourt)?.namePista || booking.idCourt}</span>
                                        <span>{`${booking.idHour}:00`}</span>
                                    </div>
                                    <div className="text-sm text-[#92d8be]">
                                        {users.find(user => user.id === booking.idUser)?.name || 'Unknown User'}
                                    </div>
                                    <div className="flex space-x-2 mt-2">
                                        {/* <button 
                                            className="px-2 py-1 bg-[#92d8be] text-[#23232f] rounded-lg font-semibold hover:bg-[#9bada1] transition-all duration-200"
                                            onClick={() => handleUpdate(booking.id)}
                                        >
                                            Update
                                        </button> */}
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
                            </tr>
                        </thead>
                        <tbody>
                            {[...bookings] // Crear una copia del array antes de ordenarlo
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .slice(0, 10)
                                .map(booking => (
                                    <tr key={booking.id} className="border-b border-[#525055]/20">
                                        <td className="py-2">{new Date(booking.createdAt).toLocaleDateString()}</td>
                                        <td className="py-2">{`${booking.idHour}:00`}</td>
                                        <td className="py-2">Court {courts.find(court => court.id === booking.idCourt)?.namePista || booking.idCourt}</td>
                                        <td className="py-2">{users.find(user => user.id === booking.idUser)?.name || 'Unknown User'}</td>
                                        <td className="py-2">
                                            <span className={`px-2 py-1 rounded-full text-sm ${getStatus(booking) === 'Rejected' ? 'bg-red-500 text-white' : getStatus(booking) === 'Out Time' ? 'bg-yellow-500 text-white' : 'bg-[#92d8be]/20 text-[#92d8be]'}`}>
                                                {getStatus(booking)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CourtReservationDashboard;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllBookings, updateNewBooking, deleteNewBooking } from '../../../store/slices/reservations/reservationCourtSlice';
// import { fetchCourtById } from '../../../store/slices/courtSlice';
// import { fetchUserById } from '../../../store/slices/userSlice';
// import Constants from '../../../Constants';

// const CourtReservationDashboard = () => {
//     const dispatch = useDispatch();
//     const bookings = useSelector(state => state.bookings.bookings);
//     const status = useSelector(state => state.bookings.status);
//     const error = useSelector(state => state.bookings.error);
//     const [users, setUsers] = useState([]);
//     const [courts, setCourts] = useState([]);
//     const [rejectedBookings, setRejectedBookings] = useState(() => {
//         const savedRejectedBookings = localStorage.getItem('rejectedBookings');
//         return savedRejectedBookings ? JSON.parse(savedRejectedBookings) : [];
//     });

//     const [formData, setFormData] = useState({
//         courtId: '',
//         userId: '',
//         date: '',
//         time: '',
//     });

//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     useEffect(() => {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             dispatch(fetchAllBookings(token));
//         } else {
//             console.error('No token found');
//         }
//     }, [dispatch]);

//     useEffect(() => {
//         bookings.forEach(booking => {
//             dispatch(fetchCourtById(booking.idCourt))
//                 .unwrap()
//                 .then(court => {
//                     setCourts(prevCourts => [...prevCourts, court]);
//                     // console.log('Court data received:', court);
//                 })
//                 .catch(error => console.error(`Error fetching court with id ${booking.idCourt}:`, error));
//             dispatch(fetchUserById(booking.idUser))
//                 .unwrap()
//                 .then(user => {
//                     setUsers(prevUsers => [...prevUsers, user]);
//                     // console.log('User data received:', user);
//                 })
//                 .catch(error => console.error(`Error fetching user with id ${booking.idUser}:`, error));
//         });
//     }, [bookings, dispatch]);

//     useEffect(() => {
//         localStorage.setItem('rejectedBookings', JSON.stringify(rejectedBookings));
//     }, [rejectedBookings]);

//     // const handleChange = (e) => {
//     //     const { name, value } = e.target;
//     //     setFormData(prev => ({
//     //         ...prev,
//     //         [name]: value
//     //     }));
//     // };

//     const handleUpdate = (id) => {
//         const token = localStorage.getItem('token'); 
//         dispatch(updateNewBooking({ id, bookingData: formData, token }));
//     };

//     const handleDelete = (id) => {
//         const token = localStorage.getItem('token'); 
//         dispatch(deleteNewBooking({ id, token }));
//         const rejectedBooking = bookings.find(booking => booking.id === id);
//         setRejectedBookings(prev => [...prev, { ...rejectedBooking, status: 'Rejected' }]);
//     };

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const getStatus = (booking) => {
//         const rejectedBooking = rejectedBookings.find(rb => rb.id === booking.id);
//         if (rejectedBooking) {
//             return 'Rejected';
//         }
//         const bookingDate = new Date(booking.createdAt);
//         const currentDate = new Date();
//         if (bookingDate < currentDate) {
//             return 'Out Time';
//         }
//         return 'Active';
//     };

//     if (status === Constants.STATUS_LOADING) return <div>Loading...</div>;
//     if (status === Constants.STATUS_FAILED) return <div>Error: {error}</div>;

//     // Filtrar las pistas duplicadas
//     const uniqueCourts = Array.from(new Set(courts.map(court => court.id)))
//         .map(id => courts.find(court => court.id === id));

//     // Calcular los elementos a mostrar en la página actual
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentCourts = uniqueCourts.slice(indexOfFirstItem, indexOfLastItem);

//     // Calcular el número total de páginas
//     const totalPages = Math.ceil(uniqueCourts.length / itemsPerPage);

//     return (
//         <div className="space-y-6">
//             <div className="flex justify-between items-center">
//                 <h1 className="text-2xl font-bold text-[#92d8be]">Court Reservation Dashboard</h1>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20">
//                     <h2 className="text-lg font-semibold mb-4">Today's Reservations</h2>
//                     <div className="space-y-4">
//                         {bookings
//                             .filter(booking => new Date(booking.createdAt).toDateString() === new Date().toDateString())
//                             .map(booking => (
//                                 <div key={booking.id} className="p-4 bg-[#525055] rounded-lg">
//                                     <div className="flex justify-between items-center">
//                                         <span>Court {courts.find(court => court.id === booking.idCourt)?.namePista || booking.idCourt}</span>
//                                         <span>{`${booking.idHour}:00`}</span>
//                                     </div>
//                                     <div className="text-sm text-[#92d8be]">
//                                         {users.find(user => user.id === booking.idUser)?.name || 'Unknown User'}
//                                     </div>
//                                     <div className="flex space-x-2 mt-2">
//                                         <button 
//                                             className="px-2 py-1 bg-[#92d8be] text-[#23232f] rounded-lg font-semibold hover:bg-[#9bada1] transition-all duration-200"
//                                             onClick={() => handleUpdate(booking.id)}
//                                         >
//                                             Update
//                                         </button>
//                                         <button 
//                                             className="px-2 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-200"
//                                             onClick={() => handleDelete(booking.id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                     </div>
//                 </div>

//                 <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20">
//                     <h2 className="text-lg font-semibold mb-4">Court Usage Statistics</h2>
//                     <div className="space-y-4">
//                         {currentCourts.map(court => {
//                             const courtBookings = bookings.filter(booking => booking.idCourt === court.id);
//                             return (
//                                 <div key={court.id} className="flex items-center justify-between">
//                                     <span>Court {court.namePista}</span>
//                                     <div className="w-2/3 bg-[#525055] rounded-full h-2">
//                                         <div 
//                                             className="bg-[#92d8be] h-2 rounded-full"
//                                             style={{ width: `${(courtBookings.length / bookings.length) * 100}%` }}
//                                         ></div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                     <div className="flex justify-center mt-4">
//                         {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
//                             <button
//                                 key={pageNumber}
//                                 className={`px-3 py-1 mx-1 rounded ${currentPage === pageNumber ? 'bg-[#92d8be] text-[#23232f]' : 'bg-[#525055] text-[#92d8be]'}`}
//                                 onClick={() => handlePageChange(pageNumber)}
//                             >
//                                 {pageNumber}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20">
//                     <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
//                     <div className="space-y-4">
//                         {Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
//                             const monthBookings = bookings.filter(booking => booking.idMonth === month);
//                             return (
//                                 <div key={month} className="flex items-center justify-between">
//                                     <span>{new Date(2024, month - 1).toLocaleString('default', { month: 'short' })}</span>
//                                     <span className="text-[#92d8be]">{monthBookings.length} bookings</span>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-[#23232f] p-6 rounded-xl border border-[#92d8be]/20">
//                 <h2 className="text-lg font-semibold mb-4">Recent Reservations</h2>
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="text-left border-b border-[#92d8be]/20">
//                                 <th className="pb-2">Date</th>
//                                 <th className="pb-2">Time</th>
//                                 <th className="pb-2">Court</th>
//                                 <th className="pb-2">User</th>
//                                 <th className="pb-2">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {[...bookings, ...rejectedBookings] // Crear una copia del array antes de ordenarlo
//                                 .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//                                 .slice(0, 10)
//                                 .map(booking => (
//                                     <tr key={booking.id} className="border-b border-[#525055]/20">
//                                         <td className="py-2">{new Date(booking.createdAt).toLocaleDateString()}</td>
//                                         <td className="py-2">{`${booking.idHour}:00`}</td>
//                                         <td className="py-2">Court {courts.find(court => court.id === booking.idCourt)?.namePista || booking.idCourt}</td>
//                                         <td className="py-2">{users.find(user => user.id === booking.idUser)?.name || 'Unknown User'}</td>
//                                         <td className="py-2">
//                                             <span className={`px-2 py-1 rounded-full text-sm ${getStatus(booking) === 'Rejected' ? 'bg-red-500 text-white' : getStatus(booking) === 'Out Time' ? 'bg-yellow-500 text-white' : 'bg-[#92d8be]/20 text-[#92d8be]'}`}>
//                                                 {getStatus(booking)}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CourtReservationDashboard;
