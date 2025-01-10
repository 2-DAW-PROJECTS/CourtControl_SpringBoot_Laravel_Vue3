import bookingCourtService from '@/services/client/bookingCourtService';

export default {
  namespaced: true,
  state: {
    days: [],
    availableHours: [],
  },
  mutations: {
    SET_DAYS(state, days) {
      state.days = days;
    },
    SET_AVAILABLE_HOURS(state, hours) {
      state.availableHours = hours;
    },
  },
  actions: {
    async fetchDays({ commit }) {
      try {
        const response = await bookingCourtService.fetchDays();
        commit('SET_DAYS', response.data);
      } catch (error) {
        console.error('Error fetching days:', error);
      }
    },
    async fetchHoursByDay({ commit }, dayId) {
      try {
        const response = await bookingCourtService.fetchHoursByDay(dayId);
        commit('SET_AVAILABLE_HOURS', response.data);
      } catch (error) {
        console.error('Error fetching hours:', error);
      }
    },
    async createBooking({ dispatch }, bookingData) {
      try {
        await bookingCourtService.createBooking(bookingData);
        await dispatch('fetchDays');  // Refrescar los días después de la reserva
      } catch (error) {
        console.error('Error creating booking:', error);
      }
    },
  },
  getters: {
    days: (state) => state.days,
    availableHours: (state) => state.availableHours,
  },
};
