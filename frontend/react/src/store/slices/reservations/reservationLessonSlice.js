import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchAllLessonBookings,
    fetchLessonBookingById,
    createLessonBooking,
    updateLessonBooking,
    deleteLessonBooking
} from '../../../services/reservations/reservationLessonService';
import Constants from '../../../Constants';

export const fetchAllLessonBookingsThunk = createAsyncThunk(
    Constants.FETCH_ALL_LESSON_BOOKINGS,
    async (token, { rejectWithValue }) => {
        try {
            return await fetchAllLessonBookings(token);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchLessonBookingByIdThunk = createAsyncThunk(
    Constants.FETCH_LESSON_BOOKING_BY_ID,
    async ({ id, token }, { rejectWithValue }) => {
        try {
            return await fetchLessonBookingById(id, token);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createLessonBookingThunk = createAsyncThunk(
    Constants.CREATE_LESSON_BOOKING,
    async ({ bookingData, token }, { rejectWithValue }) => {
        try {
            return await createLessonBooking(bookingData, token);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateLessonBookingThunk = createAsyncThunk(
    Constants.UPDATE_LESSON_BOOKING,
    async ({ id, bookingData, token }, { rejectWithValue }) => {
        try {
            return await updateLessonBooking(id, bookingData, token);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteLessonBookingThunk = createAsyncThunk(
    Constants.DELETE_LESSON_BOOKING,
    async ({ id, token }, { rejectWithValue }) => {
        try {
            return await deleteLessonBooking(id, token);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const reservationLessonSlice = createSlice({
    name: 'bookingsLessons',
    initialState: {
        bookingsLessons: [],
        status: Constants.STATUS_IDLE,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLessonBookingsThunk.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(fetchAllLessonBookingsThunk.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookingsLessons = action.payload;
            })
            .addCase(fetchAllLessonBookingsThunk.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.payload;
            })
            .addCase(fetchLessonBookingByIdThunk.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(fetchLessonBookingByIdThunk.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookingsLessons = state.bookingsLessons.map(booking =>
                    booking.id === action.payload.id ? action.payload : booking
                );
            })
            .addCase(fetchLessonBookingByIdThunk.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.payload;
            })
            .addCase(createLessonBookingThunk.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(createLessonBookingThunk.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookingsLessons.push(action.payload);
            })
            .addCase(createLessonBookingThunk.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.payload;
            })
            .addCase(updateLessonBookingThunk.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(updateLessonBookingThunk.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookingsLessons = state.bookingsLessons.map(booking =>
                    booking.id === action.payload.id ? action.payload : booking
                );
            })
            .addCase(updateLessonBookingThunk.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.payload;
            })
            .addCase(deleteLessonBookingThunk.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(deleteLessonBookingThunk.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookingsLessons = state.bookingsLessons.filter(booking => booking.id !== action.payload.id);
            })
            .addCase(deleteLessonBookingThunk.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.payload;
            });
    }
});

export default reservationLessonSlice.reducer;

