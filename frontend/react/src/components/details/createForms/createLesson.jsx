import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewLesson } from '../../../store/slices/lessonSlice';

const CreateLessonForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState({
        nameClass: '',
        isActive: 1,
        vacancies: '',
        days: '',
        time: '',
        duration: '',
        baseCost: '',
        level: '',
        coach: '',
        maxCapacity: '',
        description: '',
        img: '',
        idSport: 1
    });

    const [selectedDays, setSelectedDays] = useState([]);

    const weekdays = [
        { name: 'Lunes', value: 'L' },
        { name: 'Martes', value: 'M' },
        { name: 'Miércoles', value: 'X' },
        { name: 'Jueves', value: 'J' },
        { name: 'Viernes', value: 'V' },
        { name: 'Sábado', value: 'S' },
    ];

    const handleDayChange = (value) => {
        setSelectedDays(prev => {
            const newDays = prev.includes(value) 
                ? prev.filter(day => day !== value)
                : [...prev, value];
            
            const sortedDays = newDays.sort((a, b) => 
                weekdays.findIndex(day => day.value === a) - 
                weekdays.findIndex(day => day.value === b)
            );
            
            setFormData(prev => ({
                ...prev,
                days: sortedDays.join('-')
            }));
            
            return sortedDays;
        });
    };
    
    React.useEffect(() => {
        if (!formData.img) {
            setFormData(prev => ({
                ...prev,
                img: 'foxney.webp'
            }));
        }
    }, [formData.img]);

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
        dispatch(createNewLesson(formData));
        navigate('/admin/lessons');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-start justify-start bg-[#23232f] text-[#f6f1de]">
            <div className="top-4 left-4 ml-6 mt-6">
                <button
                    onClick={() => navigate('/admin/lessons')}
                    className="mb-4 text-[#23232f] bg-[#92d8be] px-4 py-2 rounded-lg hover:bg-[#9bada1] transition duration-300"
                >
                    ← Back
                </button>
            </div>
            <div className="w-full max-w-4xl p-8 mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-[#92d8be]">Create New Lesson</h1>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 bg-[#525055] rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-[#f5ce8d]">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Class Name</label>
                                <input
                                    type="text"
                                    name="nameClass"
                                    value={formData.nameClass}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Sport</label>
                                <select
                                    name="idSport"
                                    value={formData.idSport}
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
                        <h2 className="text-xl font-semibold mb-4 text-[#f5ce8d]">Lesson Details</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="space-y-2">
                                    <label className="block text-[#9bada1] mb-2 font-medium">Days</label>
                                    <div className="flex flex-wrap gap-4">
                                        {weekdays.map(day => (
                                            <label key={day.value} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedDays.includes(day.value)}
                                                    onChange={() => handleDayChange(day.value)}
                                                    className="form-checkbox h-5 w-5 text-[#92d8be] bg-[#23232f] border border-[#9bada1] rounded focus:outline-none focus:ring-2 focus:ring-[#92d8be]"
                                                />
                                                <span className="text-[#f6f1de]">{day.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Time</label>
                                <input
                                    type="text"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                />
                            </div> */}
                            <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={(e) => {
                                            const timeValue = e.target.value;
                                            // Asegurarse de que el formato sea HH:mm
                                            const [hours, minutes] = timeValue.split(":");
                                            if (hours && minutes) {
                                                const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
                                                handleChange({
                                                    target: {
                                                        name: "time",
                                                        value: formattedTime,
                                                    },
                                                });
                                            }
                                        }}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Duration</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Vacancies</label>
                                <input
                                    type="number"
                                    name="vacancies"
                                    value={formData.vacancies}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Base Cost</label>
                                <input
                                    type="number"
                                    name="baseCost"
                                    value={formData.baseCost}
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
                                <label className="block text-[#9bada1] mb-2 font-medium">Level</label>
                                <input
                                    type="text"
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Coach</label>
                                <input
                                    type="text"
                                    name="coach"
                                    value={formData.coach}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-[#23232f] border border-[#9bada1] focus:outline-none focus:ring-2 focus:ring-[#92d8be] text-[#f6f1de]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#9bada1] mb-2 font-medium">Max Capacity</label>
                                <input
                                    type="number"
                                    name="maxCapacity"
                                    value={formData.maxCapacity}
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
                                    <option value="false">Inactive</option>
                                    <option value="true">Active</option>
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
                            Create Lesson
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateLessonForm;