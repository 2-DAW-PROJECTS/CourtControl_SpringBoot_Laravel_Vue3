import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewCourt } from '../../../store/slices/courtSlice';


const CreateCourtForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState({
        sportId: 1,
        typePista: '',
        namePista: '',
        ancho: '',
        material: '',
        description: '',
        img: '',
        tagCourt: '',
        isActive: 0
    });

    React.useEffect(() => {
        if (!formData.img) {
            setFormData(prev => ({
                ...prev,
                img: '/Courtney.webp'
            }));
        }
    }, [formData.img]);

    const [dimensions, setDimensions] = React.useState({
        width: '',
        length: ''
    });


    const handleDimensionChange = (type, value) => {
        const newDimensions = {
            ...dimensions,
            [type]: value
        };
        setDimensions(newDimensions);

        setFormData(prev => ({
            ...prev,
            ancho: `${newDimensions.width} x ${newDimensions.length}`
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        dispatch(createNewCourt(formData));
        navigate('/admin/courts');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-start justify-start bg-[#23232f] text-[#f6f1de]">
            <div className="top-4 left-4 ml-6 mt-6">
                <button
                    onClick={() => navigate('/admin/courts')}
                    className="mb-4 text-[#23232f] bg-[#92d8be] px-4 py-2 rounded-lg hover:bg-[#9bada1] transition duration-300"
                >
                    ← Back
                </button>
            </div>
            <div className="w-full max-w-4xl p-8 mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-[#92d8be]">Create New Court</h1>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 bg-[#525055] rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-[#f5ce8d]">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Court Name</label>
                                <input
                                    type="text"
                                    name="namePista"
                                    value={formData.namePista}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Sport</label>
                                <select
                                    name="sportId"
                                    value={formData.sportId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                >
                                    <option value="1">Volleyball</option>
                                    <option value="2">Basketball</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#525055] rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-[#f5ce8d]">Court Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Type</label>
                                <input
                                    type="text"
                                    name="typePista"
                                    value={formData.typePista}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                />
                            </div>
                            <div className="flex space-x-2">
                                <div className="flex-1">
                                    <label className="block text-[#9bada1] mb-2 font-medium">Width</label>
                                    <input
                                        type="number"
                                        value={dimensions.width}
                                        onChange={(e) => handleDimensionChange('width', e.target.value)}
                                        className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-center pt-8">
                                    <span className="text-[#9bada1] font-medium">x</span>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[#9bada1] mb-2 font-medium">Length</label>
                                    <input
                                        type="number"
                                        value={dimensions.length}
                                        onChange={(e) => handleDimensionChange('length', e.target.value)}
                                        className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Material</label>
                                <input
                                    type="text"
                                    name="material"
                                    value={formData.material}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#525055] rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-[#f5ce8d]">Additional Info</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Tag</label>
                                <input
                                    type="text"
                                    name="tagCourt"
                                    value={formData.tagCourt}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Image URL</label>
                                <input
                                    type="text"
                                    name="img"
                                    value={formData.img}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                />
                            </div>
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Status</label>
                                <select
                                    name="isActive"
                                    value={formData.isActive}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                >
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-[#525055] rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-[#f5ce8d]">Description</h2>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de] h-32"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-[#92d8be] hover:bg-[#9bada1] text-[#23232f] font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Create Court
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourtForm;