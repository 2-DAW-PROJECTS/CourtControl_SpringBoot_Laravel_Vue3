import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, updateUserById, deleteUserById } from '../../store/slices/userSlice';
import Constants from '../../Constants';

const UserDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.users.currentUser);
    const loading = useSelector(state => state.users.status === Constants.SET_LOADING);
    const error = useSelector(state => state.users.error);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        emailVerifiedAt: '',
        password: '',
        rememberToken: '',
        createdAt: '',
        updatedAt: '',
        roles: []
    });

    useEffect(() => {
        dispatch(fetchUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id || '',
                name: user.name || '',
                email: user.email || '',
                emailVerifiedAt: user.emailVerifiedAt || '',
                password: user.password || '',
                rememberToken: user.rememberToken || '',
                createdAt: user.createdAt || '',
                updatedAt: user.updatedAt || '',
                roles: user.roles ? user.roles.map(role => role) : []
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRoleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            roles: [e.target.value]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserById({ id, ...formData }));
        navigate('/admin/users');
    };

    const handleDeleteUser = () => {
        const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
        const userCode = prompt(`⚠️ WARNING: Estas apunto de eliminar ${formData.name}! ⚠️\n\nSi quieres eliminarlo introduce este codigo y confirma como administrador: ${randomCode}\n\nNote: Esto no se puede deshacer. Si no quieres eliminarlo, pulsa Cancelar.\n\nCodigo: `);
        if (userCode === randomCode) {
            dispatch(deleteUserById(id));
            navigate('/admin/users');
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

    if (!user) return null;

    return (
        <div className="bg-gradient-to-br from-[#f6f1de] to-[#9bada1] min-h-screen flex flex-col">
            <div className="container mx-auto p-8 flex-grow">
                <button
                    onClick={() => navigate('/admin/users')}
                    className="mb-4 text-[#23232f] bg-[#92d8be] px-4 py-2 rounded-lg hover:bg-[#9bada1] transition duration-300"
                >
                    ← Back
                </button>
                <div className="max-w-5xl mx-auto bg-[#23232f] rounded-xl shadow-xl overflow-hidden border border-[#525055] hover:shadow-2xl transition-shadow duration-300">
                    <div className="p-8">
                        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#92d8be] to-[#f5ce8d] bg-clip-text text-transparent">User Management</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        readOnly
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Email Verified At</label>
                                    <input
                                        type="text"
                                        name="emailVerifiedAt"
                                        value={formData.emailVerifiedAt}
                                        readOnly
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        readOnly
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Remember Token</label>
                                    <input
                                        type="text"
                                        name="rememberToken"
                                        value={formData.rememberToken}
                                        readOnly
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Created At</label>
                                    <input
                                        type="text"
                                        name="createdAt"
                                        value={formData.createdAt}
                                        readOnly
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Updated At</label>
                                    <input
                                        type="text"
                                        name="updatedAt"
                                        value={formData.updatedAt}
                                        readOnly
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Roles</label>
                                    <select
                                        name="roles"
                                        value={formData.roles[0] || ''}
                                        onChange={handleRoleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    >
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="EMPLOYEE">EMPLOYEE</option>
                                        <option value="CLIENT">CLIENT</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex space-x-4 pt-6">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-[#92d8be] to-[#9bada1] text-[#23232f] px-6 py-3 rounded-lg hover:from-[#9bada1] hover:to-[#92d8be] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-bold"
                                >
                                    Update User
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteUser}
                                    className="flex-1 bg-gradient-to-r from-[#fc9b70] to-[#eb6a65] text-[#23232f] px-6 py-3 rounded-lg hover:from-[#eb6a65] hover:to-[#fc9b70] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-bold"
                                >
                                    Delete User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;