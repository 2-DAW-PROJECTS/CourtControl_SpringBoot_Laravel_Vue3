import { createSelector } from 'reselect';

const selectBookingsState = state => state.bookings;

export const selectBookings = createSelector(
    [selectBookingsState],
    bookingsState => bookingsState.bookings
);

export const selectBookingsStatus = createSelector(
    [selectBookingsState],
    bookingsState => bookingsState.status
);

export const selectBookingsError = createSelector(
    [selectBookingsState],
    bookingsState => bookingsState.error
);