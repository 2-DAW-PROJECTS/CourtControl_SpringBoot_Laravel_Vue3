import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reservationCourtService from '../../../services/reservations/reservationCourtService';
import Constants from '../../../Constants';

// Estado inicial
const initialState = {
    bookings: [],
    booking: null,
    status: Constants.STATUS_IDLE,
    error: null,
};

// Thunks para operaciones asíncronas
export const fetchAllBookings = createAsyncThunk(Constants.FETCH_ALL_BOOKINGS, async () => {
    const response = await reservationCourtService.getAllBookings();
    return response;
});

export const fetchBookingById = createAsyncThunk(Constants.FETCH_BOOKING_BY_ID, async (id) => {
    const response = await reservationCourtService.getBookingById(id);
    return response;
});

export const createBooking = createAsyncThunk(Constants.CREATE_BOOKING, async (bookingData) => {
    const response = await reservationCourtService.createBooking(bookingData);
    return response;
});

export const updateBooking = createAsyncThunk(Constants.UPDATE_BOOKING, async ({ id, bookingData }) => {
    const response = await reservationCourtService.updateBooking(id, bookingData);
    return response;
});

export const deleteBooking = createAsyncThunk(Constants.DELETE_BOOKING, async (id) => {
    await reservationCourtService.deleteBooking(id);
    return id;
});

// Slice de Redux
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
            .addCase(createBooking.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookings.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.error.message;
            })
            .addCase(updateBooking.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                const index = state.bookings.findIndex((booking) => booking.id === action.payload.id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                }
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.error.message;
            })
            .addCase(deleteBooking.pending, (state) => {
                state.status = Constants.STATUS_LOADING;
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.status = Constants.STATUS_SUCCEEDED;
                state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.status = Constants.STATUS_FAILED;
                state.error = action.error.message;
            });
    },
});

export default bookingCourtSlice.reducer;