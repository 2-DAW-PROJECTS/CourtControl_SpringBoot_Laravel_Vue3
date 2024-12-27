import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLessons } from '../../store/slices/lessonSlice';
import LessonDetails from '../details/LessonDetails';

const LessonDashboard = () => {
    const dispatch = useDispatch();
    const lessons = useSelector((state) => state.lessons.lessons);
    const status = useSelector((state) => state.lessons.status);

    useEffect(() => {
        dispatch(fetchLessons());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Cargando lecciones...</div>;
    }

    if (lessons.length === 0) {
        return <div>No hay datos disponibles.</div>;
    }

    return (
        <div>
            <h1>Lesson Dashboard</h1>
            <div>
                {lessons.map((lesson) => (
                    <LessonDetails key={lesson.id} lesson={lesson} />
                ))}
            </div>
        </div>
    );
};

export default LessonDashboard;