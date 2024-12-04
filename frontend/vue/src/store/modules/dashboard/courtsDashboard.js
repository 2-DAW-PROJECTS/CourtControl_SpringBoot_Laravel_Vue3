import Constant from '@/Constant';
import CourtServiceDashboard from '@/services/dashboard/courtServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const courtsDashboard = {
    namespaced: true,
    state: {
        courts: [],
        currentCourt: null,
        loading: false,
        error: null,
        filters: {
            search: '',
            category: '',
            status: ''
        }
    },
    mutations: {
        [Constant.SET_LOADING](state, status) {
            state.loading = status;
        },
        [Constant.SET_ERROR](state, error) {
            state.error = error;
        },
        [Constant.INITIALIZE_COURTS](state, courts) {
            console.log('Initializing courts:', courts);
            state.courts = courts;
        },
        [Constant.ADD_COURT](state, court) {
            state.courts.push(court);
        },
        [Constant.UPDATE_COURT](state, updatedCourt) {
            const index = state.courts.findIndex(court => court.id === updatedCourt.id);
            if (index !== -1) {
                state.courts.splice(index, 1, updatedCourt);
            }
        },
        [Constant.DELETE_COURT](state, id) {
            state.courts = state.courts.filter(court => court.id !== id);
        },
        UPDATE_FILTERS(state, filters) {
            state.filters = { ...state.filters, ...filters };
        }
    },
    actions: {
        async [Constant.INITIALIZE_COURTS]({ commit }, page = 1) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await CourtServiceDashboard.GetCourts(page);
                console.log('Response status:', response.status);
                console.log('Response data:', response.data);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.INITIALIZE_COURTS, response.data);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error loading courts');
                console.error('Error loading courts:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        async [Constant.ADD_COURT]({ commit }, courtData) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await CourtServiceDashboard.CreateCourt(courtData);
                console.log('Response status:', response.status);
                console.log('Response data:', response.data);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.ADD_COURT, response.data);
                    toaster.success('Court created successfully');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error creating court');
                console.error('Error creating court:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        async [Constant.UPDATE_COURT]({ commit }, courtData) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await CourtServiceDashboard.UpdateCourt(courtData);
                console.log('Response status:', response.status);
                console.log('Response data:', response.data);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.UPDATE_COURT, response.data);
                    toaster.success('Court updated successfully');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error updating court');
                console.error('Error updating court:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        async [Constant.DELETE_COURT]({ commit }, id) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await CourtServiceDashboard.DeleteCourt(id);
                console.log('Response status:', response.status);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.DELETE_COURT, id);
                    toaster.success('Court deleted successfully');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error deleting court');
                console.error('Error deleting court:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        updateFilters({ commit, dispatch }, filters) {
            commit('UPDATE_FILTERS', filters);
            dispatch(Constant.INITIALIZE_COURTS);
        }
    },
    getters: {
        allCourts: state => state.courts,
        currentCourt: state => state.currentCourt,
        isLoading: state => state.loading,
        getError: state => state.error,
        getFilters: state => state.filters,
        getCourtById: (state) => (id) => {
            return state.courts.find(court => court.id === id);
        }
    }
};