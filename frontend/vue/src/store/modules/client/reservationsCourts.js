import ReservationService from '@/services/client/reservationService';

export default {
    namespaced: true,
    state: {
        reservations: [],
        filteredReservations: [],
        currentReservation: null,
        loading: false,
        error: null,
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear()
    },

    mutations: {
        SET_RESERVATIONS(state, reservations) {
            state.reservations = reservations;
        },
        SET_FILTERED_RESERVATIONS(state, reservations) {
            state.filteredReservations = reservations;
        },
        SET_CURRENT_RESERVATION(state, reservation) {
            state.currentReservation = reservation;
        },
        SET_LOADING(state, status) {
            state.loading = status;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        SET_CURRENT_MONTH(state, month) {
            state.currentMonth = month;
        },
        SET_CURRENT_YEAR(state, year) {
            state.currentYear = year;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        }
    },

    actions: {
        async fetchReservations({ commit }) {
            commit('SET_LOADING', true);
            commit('CLEAR_ERROR');
            try {
                const allReservations = await ReservationService.getAllReservations();
                commit('SET_RESERVATIONS', allReservations);
            } catch (error) {
                commit('SET_ERROR', error.message);
            } finally {
                commit('SET_LOADING', false);
            }
        },

        setMonth({ commit, dispatch }, month) {
            commit('SET_CURRENT_MONTH', month);
            dispatch('fetchReservations');
        },

        setYear({ commit, dispatch }, year) {
            commit('SET_CURRENT_YEAR', year);
            dispatch('fetchReservations');
        }
    },

    getters: {
        getAllReservations: state => state.reservations,
        getCurrentMonth: state => state.currentMonth,
        getCurrentYear: state => state.currentYear,
        isLoading: state => state.loading,
        getError: state => state.error
    }
};

// import ReservationService from '@/services/client/reservationService';

// export default {
//     namespaced: true,
//     state: {
//         reservations: [],
//         filteredReservations: [],
//         currentReservation: null,
//         loading: false,
//         error: null,
//         currentMonth: new Date().getMonth(),
//         currentYear: new Date().getFullYear()
//     },

//     mutations: {
//         SET_RESERVATIONS(state, reservations) {
//             state.reservations = reservations;
//         },
//         SET_FILTERED_RESERVATIONS(state, reservations) {
//             state.filteredReservations = reservations;
//         },
//         SET_CURRENT_RESERVATION(state, reservation) {
//             state.currentReservation = reservation;
//         },
//         SET_LOADING(state, status) {
//             state.loading = status;
//         },
//         SET_ERROR(state, error) {
//             state.error = error;
//         },
//         SET_CURRENT_MONTH(state, month) {
//             state.currentMonth = month;
//         },
//         SET_CURRENT_YEAR(state, year) {
//             state.currentYear = year;
//         },
//         CLEAR_ERROR(state) {
//             state.error = null;
//         }
//     },

//     actions: {
//         async fetchReservations({ commit, state }) {
//             commit('SET_LOADING', true);
//             commit('CLEAR_ERROR');
//             try {
//                 const allReservations = await ReservationService.getAllReservations();
//                 console.log('All Reservations:', allReservations); // Debugging line
//                 const filteredReservations = allReservations.filter(reservation => {
//                     const reservationDate = new Date(reservation.date);
//                     return reservationDate.getMonth() === state.currentMonth && reservationDate.getFullYear() === state.currentYear;
//                 });
//                 console.log('Filtered Reservations:', filteredReservations); // Debugging line
//                 commit('SET_RESERVATIONS', allReservations);
//                 commit('SET_FILTERED_RESERVATIONS', filteredReservations);
//             } catch (error) {
//                 console.error('Error fetching reservations:', error); // Debugging line
//                 commit('SET_ERROR', error.message);
//             } finally {
//                 commit('SET_LOADING', false);
//             }
//         },

//         async fetchReservationsByDay({ commit }, { day, month, year }) {
//             commit('SET_LOADING', true);
//             commit('CLEAR_ERROR');
//             try {
//                 const response = await ReservationService.getReservationsByDay(day, month, year);
//                 console.log('Reservations by Day:', response); // Debugging line
//                 commit('SET_RESERVATIONS', response);
//             } catch (error) {
//                 console.error('Error fetching reservations by day:', error); // Debugging line
//                 commit('SET_ERROR', error.message);
//             } finally {
//                 commit('SET_LOADING', false);
//             }
//         },

//         async createReservation({ commit, dispatch }, reservationData) {
//             commit('SET_LOADING', true);
//             commit('CLEAR_ERROR');
//             try {
//                 await ReservationService.createReservation(reservationData);
//                 await dispatch('fetchReservations');
//             } catch (error) {
//                 console.error('Error creating reservation:', error); // Debugging line
//                 commit('SET_ERROR', error.message);
//                 throw error;
//             } finally {
//                 commit('SET_LOADING', false);
//             }
//         },

//         async deleteReservation({ commit, dispatch }, id) {
//             commit('SET_LOADING', true);
//             commit('CLEAR_ERROR');
//             try {
//                 await ReservationService.deleteReservation(id);
//                 await dispatch('fetchReservations');
//             } catch (error) {
//                 console.error('Error deleting reservation:', error); // Debugging line
//                 commit('SET_ERROR', error.message);
//                 throw error;
//             } finally {
//                 commit('SET_LOADING', false);
//             }
//         },

//         setMonth({ commit, dispatch }, month) {
//             commit('SET_CURRENT_MONTH', month);
//             dispatch('fetchReservations');
//         },

//         setYear({ commit, dispatch }, year) {
//             commit('SET_CURRENT_YEAR', year);
//             dispatch('fetchReservations');
//         }
//     },

//     getters: {
//         getConcurrencyByDay: (state) => (day) => {
//             return state.filteredReservations.filter(reservation => 
//                 new Date(reservation.date).getDate() === day
//             ).length;
//         },

//         getMaxConcurrency: (state) => {
//             const counts = {};
//             state.filteredReservations.forEach(reservation => {
//                 const date = new Date(reservation.date);
//                 const key = `${date.getDate()}-${date.getMonth()}`;
//                 counts[key] = (counts[key] || 0) + 1;
//             });
//             return Math.max(...Object.values(counts), 0);
//         },

//         isLoading: state => state.loading,
//         getError: state => state.error,
//         getCurrentMonth: state => state.currentMonth,
//         getCurrentYear: state => state.currentYear,
//         getAllReservations: state => state.reservations,
//         getFilteredReservations: state => state.filteredReservations
//     }
// };
