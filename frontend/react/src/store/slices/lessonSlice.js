import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLessons, getLessonById } from '../../services/lessonService';
import Constants from '../../Constants';

export const fetchLessons = createAsyncThunk(Constants.FETCH_LESSONS, async (filters) => {
    const lessons = await getLessons(filters);
    return lessons;
});

export const fetchLessonById = createAsyncThunk(Constants.FETCH_LESSON_BY_ID, async (id) => {
    const lesson = await getLessonById(id);
    return lesson;
});

const lessonsSlice = createSlice({
    name: 'lessons',
    initialState: {
        lessons: [],
        currentLesson: null,
        filters: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLessons.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchLessons.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.lessons = action.payload;
        })
        .addCase(fetchLessons.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        })
        .addCase(fetchLessonById.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchLessonById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.currentLesson = action.payload;
        })
        .addCase(fetchLessonById.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        });
    },
});

export const { setFilters } = lessonsSlice.actions;

export default lessonsSlice.reducer;
