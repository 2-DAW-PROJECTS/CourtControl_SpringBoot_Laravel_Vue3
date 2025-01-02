import { configureStore } from '@reduxjs/toolkit';
import courtsReducer from './slices/courtSlice';
import lessonsReducer from './slices/lessonSlice';
import summersReducer from './slices/summerSlice';

const store = configureStore({
    reducer: {
        courts: courtsReducer,
        lessons: lessonsReducer,
        summers: summersReducer,
    },
});

export default store;