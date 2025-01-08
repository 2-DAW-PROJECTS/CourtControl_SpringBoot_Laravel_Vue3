import { configureStore } from '@reduxjs/toolkit';
import courtsReducer from './slices/courtSlice';
import lessonsReducer from './slices/lessonSlice';
import summersReducer from './slices/summerSlice';
import usersReducer from './slices/userSlice';
import reservationsCourtsReducer from './slices/reservations/reservationCourtSlice';
import reservationsLessonReducer from './slices/reservations/reservationLessonSlice';


const store = configureStore({
    reducer: {
        courts: courtsReducer,
        lessons: lessonsReducer,
        summers: summersReducer,
        users: usersReducer,
        bookings: reservationsCourtsReducer,
        bookingsLessons: reservationsLessonReducer,
    },
});

export default store;