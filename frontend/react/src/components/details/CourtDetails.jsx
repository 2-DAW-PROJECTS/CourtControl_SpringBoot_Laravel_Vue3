import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourtById, updateExistingCourt, deleteExistingCourt } from '../../store/slices/courtSlice';
import Constants from '../../Constants';
// import Header from '../layout/Header';
// import Footer from '../layout/Footer';

const CourtDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const court = useSelector(state => state.courts.currentCourt);
    const loading = useSelector(state => state.courts.status === Constants.SET_LOADING);
    const error = useSelector(state => state.courts.error);

    const [formData, setFormData] = useState({
        sportId: '',
        typePista: '',
        namePista: '',
        ancho: '',
        material: '',
        description: '',
        img: '',
        tagCourt: '',
        isActive: false
    });

    useEffect(() => {
        dispatch(fetchCourtById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (court) {
            setFormData({
                sportId: court.sportId,
                typePista: court.typePista,
                namePista: court.namePista,
                ancho: court.ancho,
                material: court.material,
                description: court.description,
                img: court.img,
                tagCourt: court.tagCourt,
                isActive: court.isActive
            });
        }
    }, [court]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateExistingCourt({ id, courtData: formData }));
        navigate('/admin/courts');
    };

    const handleDeleteCourt = () => {
        const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
        const userCode = prompt(`⚠️ WARNING: Estas apunto de eliminar ${formData.namePista}! ⚠️\n\nSi quieres eliminarla introduce este codigo y confirma como administrador: ${randomCode}\n\nNote: Esto no se puede deshacer. Si no quieres eliminarla, pulsa Cancelar.\n\nCodigo: `);
        if (userCode === randomCode) {
            dispatch(deleteExistingCourt(id));
            navigate('/admin/courts');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
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

    if (!court) return null;

    return (
        <div className="bg-gradient-to-br from-[#f6f1de] to-[#9bada1] min-h-screen flex flex-col">
            <div className="container mx-auto p-8 flex-grow">
                <button
                    onClick={() => navigate('/admin/courts')}
                    className="mb-4 text-[#23232f] bg-[#92d8be] px-4 py-2 rounded-lg hover:bg-[#9bada1] transition duration-300"
                >
                    ← Back
                </button>
                <div className="max-w-5xl mx-auto bg-[#23232f] rounded-xl shadow-xl overflow-hidden border border-[#525055] hover:shadow-2xl transition-shadow duration-300">
                    <div className="p-8">
                        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#92d8be] to-[#f5ce8d] bg-clip-text text-transparent">Court Management</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="border-2 border-[#525055] rounded-xl p-4 hover:border-[#92d8be] transition-colors duration-300">
                                    <img 
                                        className="rounded-xl w-full h-64 object-cover shadow-lg hover:transform hover:scale-[1.02] transition-transform duration-300" 
                                        src={formData.img} 
                                        alt={formData.namePista} 
                                    />
                                    <input
                                        type="text"
                                        name="img"
                                        value={formData.img}
                                        onChange={handleChange}
                                        placeholder="Image URL"
                                        className="w-full mt-4 px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#f6f1de] mb-1">Sport Type</label>
                                        <select
                                            name="sportId"
                                            value={formData.sportId}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                        >
                                            <option value="1">Volleyball</option>
                                            <option value="2">Basketball</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#f6f1de] mb-1">Court Name</label>
                                        <input
                                            type="text"
                                            name="namePista"
                                            value={formData.namePista}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                        />
                                    </div>
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#f6f1de] mb-1">Type</label>
                                        <input
                                            type="text"
                                            name="typePista"
                                            value={formData.typePista}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#f6f1de] mb-1">Width</label>
                                        <input
                                            type="text"
                                            name="ancho"
                                            value={formData.ancho}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#f6f1de] mb-1">Material</label>
                                        <input
                                            type="text"
                                            name="material"
                                            value={formData.material}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#f6f1de] mb-1">Tag Court</label>
                                        <input
                                            type="text"
                                            name="tagCourt"
                                            value={formData.tagCourt}
                                            onChange={handleChange}
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
                                        Update Court
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDeleteCourt}
                                        className="flex-1 bg-gradient-to-r from-[#fc9b70] to-[#eb6a65] text-[#23232f] px-6 py-3 rounded-lg hover:from-[#eb6a65] hover:to-[#fc9b70] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-bold"
                                    >
                                        Delete Court
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourtDetails;