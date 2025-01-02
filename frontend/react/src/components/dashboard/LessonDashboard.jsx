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

    useEffect(() => {
        dispatch(fetchLessons());
    }, [dispatch]);

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

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 rounded-lg">
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
                            {filteredLessons.map(lesson => (
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
//     const status = useSelector((state) => state.lessons.status);
//     const lessons = useSelector((state) => state.lessons.lessons);
//     const [search, setSearch] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         dispatch(fetchLessons({ search: searchTerm }));
//     }, [dispatch, searchTerm]);

//     if (status === Constants.SET_LOADING) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-[#f6f1de] text-[#23232f]">
//                 <p>Cargando lecciones...</p>
//             </div>
//         );
//     }

//     if (lessons.length === 0) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-[#f6f1de] text-[#23232f]">
//                 <p>No hay datos disponibles.</p>
//             </div>
//         );
//     }

//     const filteredLessons = lessons.filter((lesson) =>
//         lesson.nameClass.toLowerCase().includes(search.toLowerCase()) ||
//         lesson.description.toLowerCase().includes(search.toLowerCase())
//     );

//     const handleEdit = (id) => {
//         console.log(`Editar lección con ID: ${id}`);
//     };

//     const handleDelete = (id) => {
//         console.log(`Eliminar lección con ID: ${id}`);
//     };

//     const handleAdd = () => {
//         console.log('Añadir nueva lección');
//     };

//     return (
//         <div className="min-h-screen bg-[#f6f1de] text-[#23232f] p-6">
//             <header className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold text-[#525055]">Lesson Dashboard</h1>
//                 <div className="flex items-center">
//                     <input
//                         type="text"
//                         placeholder="Buscar..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-64 py-2 pl-4 pr-3 rounded-lg bg-[#23232f] text-[#f6f1de] border border-[#525055] focus:outline-none focus:ring-2 focus:ring-[#92d8be] focus:bg-[#525055] mr-4"
//                     />
//                     <button
//                         onClick={() => setSearchTerm(search)}
//                         className="bg-[#92d8be] text-[#23232f] px-4 py-2 rounded-lg hover:bg-[#9bada1] mr-4"
//                     >
//                         Buscar
//                     </button>
//                     <button
//                         onClick={handleAdd}
//                         className="bg-[#92d8be] text-[#23232f] px-4 py-2 rounded-lg hover:bg-[#9bada1]"
//                     >
//                         Añadir Nueva Lección
//                     </button>
//                 </div>
//             </header>
//             <div className="overflow-auto bg-white rounded-lg shadow-md">
//                 <table className="min-w-full table-auto">
//                     <thead className="bg-[#23232f] text-[#f6f1de]">
//                         <tr>
//                             <th className="px-4 py-2 text-left">Nombre</th>
//                             <th className="px-4 py-2 text-left">Descripción</th>
//                             <th className="px-4 py-2 text-left">Días</th>
//                             <th className="px-4 py-2 text-left">Horario</th>
//                             <th className="px-4 py-2 text-left">Nivel</th>
//                             <th className="px-4 py-2 text-left">Vacantes</th>
//                             <th className="px-4 py-2 text-center">Acciones</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredLessons.map((lesson, index) => (
//                             <tr
//                                 key={lesson.id}
//                                 className={index % 2 === 0 ? 'bg-[#f6f1de]' : 'bg-[#f5ce8d]'}
//                             >
//                                 <td className="px-4 py-2">{lesson.nameClass}</td>
//                                 <td className="px-4 py-2">{lesson.description}</td>
//                                 <td className="px-4 py-2">{lesson.days}</td>
//                                 <td className="px-4 py-2">{lesson.time}</td>
//                                 <td className="px-4 py-2">{lesson.level}</td>
//                                 <td className="px-4 py-2">
//                                     {lesson.vacancies}/{lesson.maxCapacity}
//                                 </td>
//                                 <td className="px-4 py-2 text-center">
//                                     <button
//                                         onClick={() => handleEdit(lesson.id)}
//                                         className="bg-[#f5ce8d] text-[#23232f] px-2 py-1 rounded-lg hover:bg-[#fc9b70] mr-2"
//                                     >
//                                         Editar
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(lesson.id)}
//                                         className="bg-[#eb6a65] text-white px-2 py-1 rounded-lg hover:bg-[#fc9b70]"
//                                     >
//                                         Eliminar
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default LessonDashboard;


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchLessons } from '../../store/slices/lessonSlice';
// import Constants from '../../Constants';

// const LessonDashboard = () => {
//     const dispatch = useDispatch();
//     const status = useSelector((state) => state.lessons.status);
//     const lessons = useSelector((state) => state.lessons.lessons);
//     const [search, setSearch] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         dispatch(fetchLessons({ search: searchTerm }));
//     }, [dispatch, searchTerm]);

//     if (status === Constants.SET_LOADING) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-[#f6f1de] text-[#23232f]">
//                 <p>Cargando lecciones...</p>
//             </div>
//         );
//     }

//     if (lessons.length === 0) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-[#f6f1de] text-[#23232f]">
//                 <p>No hay datos disponibles.</p>
//             </div>
//         );
//     }

//     const filteredLessons = lessons.filter((lesson) =>
//         lesson.nameClass.toLowerCase().includes(search.toLowerCase()) ||
//         lesson.description.toLowerCase().includes(search.toLowerCase())
//     );

//     const handleEdit = (id) => {
//         // Lógica para editar lección
//         console.log(`Editar lección con ID: ${id}`);
//     };

//     const handleDelete = (id) => {
//         // Lógica para eliminar lección
//         console.log(`Eliminar lección con ID: ${id}`);
//     };

//     const handleAdd = () => {
//         // Lógica para añadir nueva lección
//         console.log('Añadir nueva lección');
//     };

//     return (
//         <div className="min-h-screen bg-[#f6f1de] text-[#23232f] p-6">
//             <header className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold text-[#525055]">Lesson Dashboard</h1>
//                 <button
//                     onClick={handleAdd}
//                     className="bg-[#92d8be] text-[#23232f] px-6 py-2 rounded-lg hover:bg-[#9bada1]"
//                 >
//                     Añadir Nueva Lección
//                 </button>
//             </header>
//             <div className="flex justify-center mb-6">
//                 <div className="relative w-80">
//                     <input
//                         type="text"
//                         placeholder="Buscar..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full py-2 pl-10 pr-3 rounded-lg bg-[#23232f] text-[#f6f1de] border border-[#525055] focus:outline-none focus:ring-2 focus:ring-[#92d8be] focus:bg-[#525055]"
//                     />
//                     <svg
//                         className="absolute left-3 top-2.5 h-5 w-5 text-[#9bada1]"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
//                         />
//                     </svg>
//                 </div>
//                 <button
//                     onClick={() => setSearchTerm(search)}
//                     className="ml-2 bg-[#92d8be] text-[#23232f] px-4 py-2 rounded-lg hover:bg-[#9bada1]"
//                 >
//                     Buscar
//                 </button>
//             </div>
//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                 {filteredLessons.map((lesson) => (
//                     <div
//                         key={lesson.id}
//                         className="bg-[#23232f] text-[#f6f1de] rounded-lg p-6 shadow-md relative"
//                     >
//                         <img
//                             src={lesson.img}
//                             alt={lesson.nameClass}
//                             className="w-full h-40 object-cover rounded-t-lg mb-4"
//                         />
//                         <h2 className="text-xl font-bold mb-2 text-[#f5ce8d]">
//                             {lesson.nameClass}
//                         </h2>
//                         <p className="text-sm mb-2 text-[#9bada1]">
//                             {lesson.description}
//                         </p>
//                         <p className="text-sm">
//                             <span className="font-semibold">Días:</span> {lesson.days}
//                         </p>
//                         <p className="text-sm">
//                             <span className="font-semibold">Horario:</span> {lesson.time}
//                         </p>
//                         <p className="text-sm">
//                             <span className="font-semibold">Nivel:</span> {lesson.level}
//                         </p>
//                         <p className="text-sm">
//                             <span className="font-semibold">Vacantes:</span>{' '}
//                             {lesson.vacancies}/{lesson.maxCapacity}
//                         </p>
//                         <div className="absolute top-4 right-4 flex space-x-2">
//                             <button
//                                 onClick={() => handleEdit(lesson.id)}
//                                 className="bg-[#f5ce8d] text-[#23232f] px-2 py-1 rounded-lg hover:bg-[#fc9b70]"
//                             >
//                                 Editar
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(lesson.id)}
//                                 className="bg-[#eb6a65] text-white px-2 py-1 rounded-lg hover:bg-[#fc9b70]"
//                             >
//                                 Eliminar
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default LessonDashboard;



// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchLessons } from '../../store/slices/lessonSlice';
// import Constants from '../../Constants';

// const LessonDashboard = () => {
//     const dispatch = useDispatch();
//     const status = useSelector((state) => state.lessons.status);
//     const lessons = useSelector((state) => state.lessons.lessons);
//     const [search, setSearch] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         dispatch(fetchLessons({ search: searchTerm }));
//     }, [dispatch, searchTerm]);

//     if (status === Constants.SET_LOADING) {
//         return <div>Cargando lecciones...</div>;
//     }

//     if (lessons.length === 0) {
//         return <div>No hay datos disponibles.</div>;
//     }

//     const filteredLessons = lessons.filter(lesson =>
//         lesson.nameClass.toLowerCase().includes(search.toLowerCase()) ||
//         lesson.description.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div>
//             <h1>Lesson Dashboard</h1>
//             <div className="flex justify-between items-center mb-6">
//                 <div className="flex-1 mx-4 flex justify-center">
//                     <div className="relative w-64">
//                         <input
//                             type="text"
//                             placeholder="Buscar..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             className="w-full py-2 pl-10 pr-3 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800"
//                         />
//                         <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                     </div>
//                     <button
//                         onClick={() => setSearchTerm(search)}
//                         className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                     >
//                         Buscar
//                     </button>
//                 </div>
//             </div>
//             <div>
//                 {filteredLessons.map((lesson) => (
//                     <div key={lesson.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
//                         <h2 className="text-xl font-bold text-white">{lesson.nameClass}</h2>
//                         <p className="text-gray-400">{lesson.description}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default LessonDashboard;
