import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Constants from '../../../Constants';
import {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
} from '../../../services/reservations/reservationCourtService';

const initialState = {
    bookings: [],
    booking: null,
    status: Constants.STATUS_IDLE,
    error: null,
};

// Thunks para operaciones asíncronas
export const fetchAllBookings = createAsyncThunk(Constants.FETCH_ALL_BOOKINGS, async (token) => {
    const response = await getAllBookings(token);
    return response;
});

export const fetchBookingById = createAsyncThunk(Constants.FETCH_BOOKING_BY_ID, async ({ id, token }) => {
    const response = await getBookingById(id, token);
    return response;
});

export const createNewBooking = createAsyncThunk(Constants.CREATE_BOOKING, async ({ bookingData, token }) => {
    const booking = await createBooking(bookingData, token);
    return booking;
});

export const updateNewBooking = createAsyncThunk(Constants.UPDATE_BOOKING, async ({ id, bookingData, token }) => {
    const booking = await updateBooking(id, bookingData, token);
    return booking;
});

export const deleteNewBooking = createAsyncThunk(Constants.DELETE_BOOKING, async ({ id, token }) => {
    await deleteBooking(id, token);
    return id;
});

const bookingCourtSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBookings.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(fetchAllBookings.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookings = action.payload;
            })
            .addCase(fetchAllBookings.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.error.message;
            })
            .addCase(fetchBookingById.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(fetchBookingById.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.booking = action.payload;
            })
            .addCase(fetchBookingById.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.error.message;
            })
            .addCase(createNewBooking.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(createNewBooking.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookings.push(action.payload);
            })
            .addCase(createNewBooking.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.error.message;
            })
            .addCase(updateNewBooking.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(updateNewBooking.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                const index = state.bookings.findIndex((booking) => booking.id === action.payload.id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                }
            })
            .addCase(updateNewBooking.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.error.message;
            })
            .addCase(deleteNewBooking.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(deleteNewBooking.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
            })
            .addCase(deleteNewBooking.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.error.message;
            });
    },
});

export default bookingCourtSlice.reducer;