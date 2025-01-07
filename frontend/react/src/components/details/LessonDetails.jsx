import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLessonById, updateExistingLesson, deleteExistingLesson } from '../../store/slices/lessonSlice';
import Constants from '../../Constants';
// import Header from '../layout/Header';
// import Footer from '../layout/Footer';

const daysOfWeek = [
    { label: 'Lunes', value: 'L' },
    { label: 'Martes', value: 'M' },
    { label: 'Miércoles', value: 'X' },
    { label: 'Jueves', value: 'J' },
    { label: 'Viernes', value: 'V' },
    { label: 'Sábado', value: 'S' },
];

const LessonDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lesson = useSelector(state => state.lessons.currentLesson);
    const loading = useSelector(state => state.lessons.status === Constants.SET_LOADING);
    const error = useSelector(state => state.lessons.error);

    const [formData, setFormData] = useState({
        nameClass: '',
        isActive: 1,
        vacancies: 0,
        days: [],
        time: '',
        duration: 0,
        baseCost: 0.0,
        level: '',
        coach: '',
        maxCapacity: 0,
        description: '',
        img: '',
        idSport: 1,
    });

    useEffect(() => {
        dispatch(fetchLessonById(id));
    }, [dispatch, id]);
    // useEffect(() => {
    //     console.log('Lesson data:', lesson);
    // }, [lesson]);

    useEffect(() => {
        if (lesson) {
            setFormData({
                nameClass: lesson.nameClass || '',
                isActive: lesson.isActive || false,
                vacancies: lesson.vacancies || 0,
                days: lesson.days ? lesson.days.split('-') : [],
                time: lesson.time || '',
                duration: lesson.duration || 0,
                baseCost: lesson.baseCost || 0.0,
                level: lesson.level || '',
                coach: lesson.coach || '',
                maxCapacity: lesson.maxCapacity || 0,
                description: lesson.description || '',
                img: lesson.img || '',
                idSport: lesson.idSport !== null ? lesson.idSport.toString() : '1',
            });
        }
    }, [lesson]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'days') {
            const newDays = checked
                ? [...formData.days, value]
                : formData.days.filter(day => day !== value);
            setFormData({
                ...formData,
                days: newDays
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDays = formData.days.join('-');
        dispatch(updateExistingLesson({ id, lessonData: { ...formData, days: formattedDays } }));
        navigate('/admin/lessons');
    };

    const handleDeleteLesson = () => {
        const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
        const userCode = prompt(`⚠️ WARNING: Estas apunto de eliminar ${formData.nameClass}! ⚠️\n\nSi quieres eliminarla introduce este codigo y confirma como administrador: ${randomCode}\n\nNote: Esto no se puede deshacer. Si no quieres eliminarla, pulsa Cancelar.\n\nCodigo: `);
        if (userCode === randomCode) {
            dispatch(deleteExistingLesson(id));
            navigate('/admin/lessons');
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

    if (!lesson) return null;

    return (
        <div className="bg-gradient-to-br from-[#f6f1de] to-[#9bada1] min-h-screen flex flex-col">
            <div className="container mx-auto p-8 flex-grow">
                <button
                    onClick={() => navigate('/admin/lessons')}
                    className="mb-4 text-[#23232f] bg-[#92d8be] px-4 py-2 rounded-lg hover:bg-[#9bada1] transition duration-300"
                >
                    ← Back
                </button>
                <div className="max-w-5xl mx-auto bg-[#23232f] rounded-xl shadow-xl overflow-hidden border border-[#525055] hover:shadow-2xl transition-shadow duration-300">
                    <div className="p-8">
                        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#92d8be] to-[#f5ce8d] bg-clip-text text-transparent">Lesson Management</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Class Name</label>
                                    <input
                                        type="text"
                                        name="nameClass"
                                        value={formData.nameClass}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Level</label>
                                    <input
                                        type="text"
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Vacancies</label>
                                    <input
                                        type="number"
                                        name="vacancies"
                                        value={formData.vacancies}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Days</label>
                                    <div className="flex flex-wrap gap-4 px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg">
                                        {daysOfWeek.map(day => (
                                            <label key={day.value} className="relative flex items-center cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    name="days"
                                                    value={day.value}
                                                    checked={formData.days.includes(day.value)}
                                                    onChange={handleChange}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-5 h-5 border-2 border-[#92d8be] rounded-md peer-checked:bg-[#92d8be] peer-checked:border-[#92d8be] transition-all duration-200 ease-in-out 
                                                    after:content-[''] after:absolute after:opacity-0 after:top-[3px] after:left-[7px] after:w-2 after:h-4 after:border-r-2 after:border-b-2 after:border-white after:rotate-45
                                                    peer-checked:after:opacity-100 group-hover:border-[#f5ce8d]">
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-[#f6f1de] group-hover:text-[#f5ce8d] transition-colors duration-200">{day.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>  

                                {/* <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
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
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Duration (minutes)</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Base Cost</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="baseCost"
                                        value={formData.baseCost}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Coach</label>
                                    <input
                                        type="text"
                                        name="coach"
                                        value={formData.coach}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-[#23232f] text-[#f6f1de] border border-[#525055] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92d8be] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Max Capacity</label>
                                    <input
                                        type="number"
                                        name="maxCapacity"
                                        value={formData.maxCapacity}
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
                                    <label className="block text-sm font-medium text-[#f6f1de] mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        name="img"
                                        value={formData.img}
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
                                    Update Lesson
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteLesson}
                                    className="flex-1 bg-gradient-to-r from-[#fc9b70] to-[#eb6a65] text-[#23232f] px-6 py-3 rounded-lg hover:from-[#eb6a65] hover:to-[#fc9b70] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-bold"
                                >
                                    Delete Lesson
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonDetails;
