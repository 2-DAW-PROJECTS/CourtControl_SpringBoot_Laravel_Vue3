import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourtDashboard = () => {
    const [courts, setCourts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourts = async () => {
            try {
                const response = await axios.get('http://localhost:8085/api/courts');
                // console.log("CourtDashboard.jsx", response.data);
                // setCourts(response.data);
                const courtsWithAdjustedImg = response.data.map(court => ({
                    ...court,
                    img: court.img.replace('../../assets', '/assets')
                }));
                // console.log("courtsWithAdjustedImg", courtsWithAdjustedImg);
                setCourts(courtsWithAdjustedImg);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCourts();
    }, []);

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

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 rounded-lg">
            <div className="container mx-auto p-6 rounded-lg bg-gray-800 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Courts Management</h1>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Add New Court
                    </button>
                </div>

                <div className="overflow-x-auto bg-gray-700 rounded-lg shadow">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-600">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Material</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-700 divide-y divide-gray-600">
                            {courts.map(court => (
                                <tr key={court.id} className="hover:bg-gray-600">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{court.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {/* <div className="h-10 w-10 flex-shrink-0">
                                                <img className="h-10 w-10 rounded-full object-cover" src={court.img} alt="" />
                                            </div> */}
                                            <div className="h-16 w-16 flex-shrink-0">
                                                <img className="h-16 w-16 rounded-full object-cover" src={court.img} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-100">{court.namePista}</div>
                                                <div className="text-sm text-gray-400">{court.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">{court.typePista}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">{court.material}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${court.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {court.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-400 hover:text-blue-600 mr-3">Edit</button>
                                        <button className="text-red-400 hover:text-red-600">Delete</button>
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

export default CourtDashboard;







// // frontend/react/src/components/dashboard/CourtDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CourtDashboard = () => {
//     const [courts, setCourts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCourts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8085/api/courts');
//                 console.log("CourtDashboard.jsx", response.data);

//                 setCourts(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCourts();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h1>Courts Dashboard</h1>
//             <ul>
//                 {courts.map(court => (
//                     <li key={court.id}>{court.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default CourtDashboard;





