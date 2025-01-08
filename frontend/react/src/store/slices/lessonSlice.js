import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLessons, getLessonById, createLesson, updateLesson, deleteLesson } from '../../services/lessonService';
import Constants from '../../Constants';

export const fetchLessons = createAsyncThunk(Constants.FETCH_LESSONS, async (filters) => {
    const lessons = await getLessons(filters);
    return lessons;
});

export const fetchLessonById = createAsyncThunk(Constants.FETCH_LESSON_BY_ID, async (id) => {
    const lesson = await getLessonById(id);
    return lesson;
});

export const createNewLesson = createAsyncThunk(Constants.CREATE_LESSON, async (lessonData) => {
    const lesson = await createLesson(lessonData);
    return lesson;
});

export const updateExistingLesson = createAsyncThunk(Constants.UPDATE_LESSON, async ({ id, lessonData }) => {
    const lesson = await updateLesson(id, lessonData);
    return lesson;
});

export const deleteExistingLesson = createAsyncThunk(Constants.DELETE_LESSON, async (id) => {
    await deleteLesson(id);
    return id;
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
            state.status = 'idle';
            state.lessons = action.payload;
        })
        .addCase(fetchLessons.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(fetchLessonById.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchLessonById.fulfilled, (state, action) => {
            state.status = 'idle';
            state.currentLesson = action.payload;
        })
        .addCase(fetchLessonById.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(createNewLesson.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(createNewLesson.fulfilled, (state, action) => {
            state.status = 'idle';
            state.lessons.push(action.payload);
        })
        .addCase(createNewLesson.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(updateExistingLesson.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(updateExistingLesson.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.lessons.findIndex(lesson => lesson.id === action.payload.id);
            if (index !== -1) {
                state.lessons[index] = action.payload;
            }
        })
        .addCase(updateExistingLesson.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(deleteExistingLesson.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(deleteExistingLesson.fulfilled, (state, action) => {
            state.status = 'idle';
            state.lessons = state.lessons.filter(lesson => lesson.id !== action.payload);
        })
        .addCase(deleteExistingLesson.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        });
    },
});

export const { setFilters } = lessonsSlice.actions;

export default lessonsSlice.reducer;
