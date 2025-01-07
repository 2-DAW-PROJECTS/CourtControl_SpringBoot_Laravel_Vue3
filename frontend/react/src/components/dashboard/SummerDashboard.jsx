import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSummers } from '../../store/slices/summerSlice';
import Constants from '../../Constants';

const SummerDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.summers.status);
    const summers = useSelector((state) => state.summers.summers);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    useEffect(() => {
        dispatch(fetchSummers());
    }, [dispatch]);

    const handleSummerClick = (id) => {
        navigate(`/admin/summers/${id}`);
    };

    const createNewSummer = () => {
        navigate('/admin/summers/create');
    };

    const filteredSummers = summers.filter(summer =>
        summer.nameSummer.toLowerCase().includes(search.toLowerCase()) ||
        summer.description.toLowerCase().includes(search.toLowerCase())
    );

    if (status === Constants.SET_LOADING) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                <p className="text-white ml-4">Cargando summers...</p>
            </div>
        );
    }

    if (summers.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-white">No hay datos disponibles.</p>
            </div>
        );
    }

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredSummers.length / resultsPerPage);

    // Obtener los resultados de la página actual
    const currentResults = filteredSummers.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

    return (
        <div className="bg-gray-900 text-gray-200 rounded-lg">
            <div className="container mx-auto p-6 rounded-lg bg-gray-800 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Summer Dashboard</h1>
                    <div className="flex-1 mx-4 flex justify-center">
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-2 pl-10 pr-3 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800"
                            />
                            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={() => createNewSummer()}>Añadir Nuevo</button>
                </div>

                <div className="overflow-x-auto bg-gray-700 rounded-lg shadow">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-600">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-700 divide-y divide-gray-600">
                            {currentResults.map(summer => (
                                <tr key={summer.id} className="hover:bg-gray-600">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{summer.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-16 w-16 flex-shrink-0">
                                                <img className="h-16 w-16 rounded-full object-cover" src={`/assets/img_summer/${summer.img}`} alt={summer.nameSummer} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-100">{summer.nameSummer}</div>
                                                <div className="text-sm text-gray-400">{summer.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${summer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {summer.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600" onClick={() => handleSummerClick(summer.id)}>Modify</button>
                                        {/* <button className="text-blue-400 hover:text-blue-600 mr-3">Editar</button>
                                        <button className="text-red-400 hover:text-red-600">Eliminar</button> */}
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

export default SummerDashboard;
