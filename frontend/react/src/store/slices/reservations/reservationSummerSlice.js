import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchAllSummerBookings,
    fetchSummerBookingById,
    createSummerBooking,
    updateSummerBooking,
    deleteSummerBooking
} from '../../../services/reservations/reservationSummerService';
import Constants from '../../../Constants';

export const fetchAllSummerBookingsThunk = createAsyncThunk(
    Constants.FETCH_ALL_SUMMER_BOOKINGS,
    async (token, { rejectWithValue }) => {
        try {
            return await fetchAllSummerBookings(token);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchSummerBookingByIdThunk = createAsyncThunk(
    Constants.FETCH_SUMMER_BOOKING_BY_ID,
    async ({ id, token }, { rejectWithValue }) => {
        try {
            return await fetchSummerBookingById(id, token);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createSummerBookingThunk = createAsyncThunk(
    Constants.CREATE_SUMMER_BOOKING,
    async ({ bookingData, token }, { rejectWithValue }) => {
        try {
            return await createSummerBooking(bookingData, token);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateSummerBookingThunk = createAsyncThunk(
    Constants.UPDATE_SUMMER_BOOKING,
    async ({ id, bookingData, token }, { rejectWithValue }) => {
        try {
            return await updateSummerBooking(id, bookingData, token);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteSummerBookingThunk = createAsyncThunk(
    Constants.DELETE_SUMMER_BOOKING,
    async ({ id, token }, { rejectWithValue }) => {
        try {
            return await deleteSummerBooking(id, token);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const reservationSummerSlice = createSlice({
    name: 'bookingsSummers',
    initialState: {
        bookingsSummers: [],
        status: Constants.STATUS_IDLE,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSummerBookingsThunk.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(fetchAllSummerBookingsThunk.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookingsSummers = action.payload;
            })
            .addCase(fetchAllSummerBookingsThunk.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.payload;
            })
            .addCase(fetchSummerBookingByIdThunk.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(fetchSummerBookingByIdThunk.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookingsSummers = state.bookingsSummers.map(booking =>
                    booking.id === action.payload.id ? action.payload : booking
                );
            })
            .addCase(fetchSummerBookingByIdThunk.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.payload;
            })
            .addCase(createSummerBookingThunk.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(createSummerBookingThunk.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookingsSummers.push(action.payload);
            })
            .addCase(createSummerBookingThunk.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.payload;
            })
            .addCase(updateSummerBookingThunk.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(updateSummerBookingThunk.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookingsSummers = state.bookingsSummers.map(booking =>
                    booking.id === action.payload.id ? action.payload : booking
                );
            })
            .addCase(updateSummerBookingThunk.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.payload;
            })
            .addCase(deleteSummerBookingThunk.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(deleteSummerBookingThunk.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookingsSummers = state.bookingsSummers.filter(booking => booking.id !== action.payload.id);
            })
            .addCase(deleteSummerBookingThunk.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.payload;
            });
    }
});

export default reservationSummerSlice.reducer;