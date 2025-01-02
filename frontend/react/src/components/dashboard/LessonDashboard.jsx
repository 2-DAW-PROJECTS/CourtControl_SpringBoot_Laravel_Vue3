import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLessons } from '../../store/slices/lessonSlice';
import Constants from '../../Constants';

const LessonDashboard = () => {
    const dispatch = useDispatch();
    const lessons = useSelector(state => state.lessons.lessons);
    const loading = useSelector(state => state.lessons.status === Constants.SET_LOADING);
    const error = useSelector(state => state.lessons.error);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const resultsPerPage = 5; 

    useEffect(() => {
        dispatch(fetchLessons({ page: currentPage, perPage: resultsPerPage }));
    }, [dispatch, currentPage]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-red-600 text-lg">{`Error: ${error}`}</div>
        </div>
    );

    const filteredLessons = lessons.filter(lesson =>
        lesson.nameClass.toLowerCase().includes(search.toLowerCase()) ||
        lesson.description.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredLessons.length / resultsPerPage);

    const currentResults = filteredLessons.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

    return (
        <div className="bg-gray-900 text-gray-200 rounded-lg">
            <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Lesson Management</h1>
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Buscar lección..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full py-2 pl-10 pr-3 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-gray-800"
                        />
                        <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="overflow-x-auto bg-gray-700 rounded-lg shadow">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-600">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nivel</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Duración</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-700 divide-y divide-gray-600">
                            {currentResults.map(lesson => (
                                <tr key={lesson.id} className="hover:bg-gray-600">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{lesson.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-100">{lesson.nameClass}</div>
                                            <div className="text-sm text-gray-400">{lesson.description}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-400">{lesson.level}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">{lesson.duration} min</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-400 hover:text-blue-600 mr-3">Editar</button>
                                        <button className="text-red-400 hover:text-red-600">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-200">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonDashboard;


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchLessons } from '../../store/slices/lessonSlice';
// import Constants from '../../Constants';

// const LessonDashboard = () => {
//     const dispatch = useDispatch();
//     const lessons = useSelector(state => state.lessons.lessons);
//     const loading = useSelector(state => state.lessons.status === Constants.SET_LOADING);
//     const error = useSelector(state => state.lessons.error);
//     const [search, setSearch] = useState('');

//     useEffect(() => {
//         dispatch(fetchLessons());
//     }, [dispatch]);

//     if (loading) return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-900">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//         </div>
//     );

//     if (error) return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-900">
//             <div className="text-red-600 text-lg">{`Error: ${error}`}</div>
//         </div>
//     );

//     const filteredLessons = lessons.filter(lesson =>
//         lesson.nameClass.toLowerCase().includes(search.toLowerCase()) ||
//         lesson.description.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen bg-gray-900 text-gray-200 rounded-lg">
//             <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-3xl font-bold text-white">Lesson Management</h1>
//                     <div className="relative w-64">
//                         <input
//                             type="text"
//                             placeholder="Buscar lección..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             className="w-full py-2 pl-10 pr-3 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-gray-800"
//                         />
//                         <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                     </div>
//                 </div>

//                 <div className="overflow-x-auto bg-gray-700 rounded-lg shadow">
//                     <table className="min-w-full table-auto">
//                         <thead className="bg-gray-600">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nivel</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Duración</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-gray-700 divide-y divide-gray-600">
//                             {filteredLessons.map(lesson => (
//                                 <tr key={lesson.id} className="hover:bg-gray-600">
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{lesson.id}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div>
//                                             <div className="text-sm font-medium text-gray-100">{lesson.nameClass}</div>
//                                             <div className="text-sm text-gray-400">{lesson.description}</div>
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-400">{lesson.level}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">{lesson.duration} min</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                         <button className="text-blue-400 hover:text-blue-600 mr-3">Editar</button>
//                                         <button className="text-red-400 hover:text-red-600">Eliminar</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LessonDashboard;