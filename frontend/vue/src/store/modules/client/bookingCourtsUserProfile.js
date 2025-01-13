// src/store/modules/client/bookingCourtsUserProfile.js
import GetBookingsProfile from '@/services/client/GetBookingsProfileService';

export const bookingCourtsUserProfile = {
  namespaced: true,
  state: {
    userBookings: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_USER_BOOKINGS(state, bookings) {
      if (Array.isArray(bookings)) {
        state.userBookings = bookings;
      } else {
        state.userBookings = [];
      }
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    DELETE_BOOKING(state, bookingId) {
      // Eliminamos la reserva de la lista en el estado
      state.userBookings = state.userBookings.filter(booking => booking.id !== bookingId);
    },
  },
  actions: {
    async FETCH_USER_BOOKINGS({ commit, rootState }) {
      commit('SET_LOADING', true);
      try {
        const token = rootState.auth.accessToken;
        const bookingsData = await GetBookingsProfile.getUserBookings(token);
        commit('SET_USER_BOOKINGS', bookingsData);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async DELETE_BOOKING({ commit, rootState }, bookingId) {
        try {
          const token = rootState.auth.accessToken;  // Obtener el token desde el estado global (rootState)
          await GetBookingsProfile.deleteBooking(bookingId, token);  // Pasar el token a la función de eliminación
          commit('DELETE_BOOKING', bookingId);  // Eliminar la reserva del estado local
        } catch (error) {
          commit('SET_ERROR', error.message);  // Enviar el error al estado de error
          throw error;  // Lanzar el error para manejarlo en el componente
        }
      },
  },
  getters: {
    userBookings: (state) => state.userBookings,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
};
