import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSummerById, updateExistingSummer, deleteExistingSummer } from '../../store/slices/summerSlice';
import Constants from '../../Constants';
// import Header from '../layout/Header';
// import Footer from '../layout/Footer';

const SummerDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const summer = useSelector(state => state.summers.currentSummer);
    const loading = useSelector(state => state.summers.status === Constants.SET_LOADING);
    const error = useSelector(state => state.summers.error);

    const [formData, setFormData] = useState({
        idSport: '',
        img: '',
        nameSummer: '',
        categoryAge: '',
        startDate: '',
        endDate: '',
        maxParticipants: 0,
        description: '',
        activities: '',
        isActive: false
    });

    useEffect(() => {
        dispatch(fetchSummerById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (summer) {
            setFormData({
                idSport: summer.idSport || '',
                img: summer.img || '',
                nameSummer: summer.nameSummer || '',
                categoryAge: summer.categoryAge || '',
                startDate: summer.startDate || '',
                endDate: summer.endDate || '',
                maxParticipants: summer.maxParticipants || 0,
                description: summer.description || '',
                activities: summer.activities || '',
                isActive: summer.isActive || false
            });
        }
    }, [summer]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateExistingSummer({ id, summerData: formData }));
        navigate('/admin/summers');
    };

    const handleDeleteSummer = () => {
        const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
        const userCode = prompt(`⚠️ WARNING: Estas apunto de eliminar ${formData.nameSummer}! ⚠️\n\nSi quieres eliminarla introduce este codigo y confirma como administrador: ${randomCode}\n\nNote: Esto no se puede deshacer. Si no quieres eliminarla, pulsa Cancelar.\n\nCodigo: `);
        if (userCode === randomCode) {
            dispatch(deleteExistingSummer(id));
            navigate('/admin/summers');
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            alert('Incorrect code. Deletion cancelled.');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-[#f6f1de]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#92d8be]"></div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen bg-[#f6f1de]">
            <div className="text-[#eb6a65] text-lg">{`Error: ${error}`}</div>
        </div>
    );

    if (!summer) return null;

    return (
        <div className="bg-gradient-to-br from-[#f6f1de] to-[#9bada1] min-h-screen flex flex-col">
            <div className="container mx-auto p-8 flex-grow">
                <button
                    onClick={() => navigate('/admin/summers')}
                    className="mb-4 text-[#23232f] bg-[#92d8be] px-4 py-2 rounded-lg hover:bg-[#9bada1] transition duration-300"
                >
                    ← Back
                </button>
                <div className="max-w-5xl mx-auto bg-[#23232f] rounded-xl shadow-xl overflow-hidden border border-[#525055] hover:shadow-2xl transition-shadow duration-300">
                    <div className="p-8">
                        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#92d8be] to-[#f5ce8d] bg-clip-text text-transparent">Summer Management</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Sport ID</label>
                                    <input
                                        type="number"
                                        name="idSport"
                                        value={formData.idSport}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        name="img"
                                        value={formData.img}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Summer Name</label>
                                    <input
                                        type="text"
                                        name="nameSummer"
                                        value={formData.nameSummer}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Category Age</label>
                                    <input
                                        type="text"
                                        name="categoryAge"
                                        value={formData.categoryAge}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Max Participants</label>
                                    <input
                                        type="number"
                                        name="maxParticipants"
                                        value={formData.maxParticipants}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Activities</label>
                                    <textarea
                                        name="activities"
                                        value={formData.activities}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-center bg-[#23232f] p-4 rounded-xl shadow-inner">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-7 bg-[#525055] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#92d8be] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-[#525055] after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#92d8be]"></div>
                                    <span className="ml-3 text-sm font-medium text-[#f6f1de]">Active Status</span>
                                </label>
                            </div>
                            <div className="flex space-x-4 pt-6">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-[#92d8be] to-[#9bada1] text-[#23232f] px-6 py-3 rounded-lg hover:from-[#9bada1] hover:to-[#92d8be] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-bold"
                                >
                                    Update Summer
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteSummer}
                                    className="flex-1 bg-gradient-to-r from-[#fc9b70] to-[#eb6a65] text-[#23232f] px-6 py-3 rounded-lg hover:from-[#eb6a65] hover:to-[#fc9b70] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-bold"
                                >
                                    Delete Summer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummerDetails;