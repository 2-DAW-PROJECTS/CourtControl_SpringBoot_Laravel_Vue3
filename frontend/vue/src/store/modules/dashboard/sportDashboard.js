import Constant from '../../../Constant';
import SportServiceDashboard from '../../../services/client/SportServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";
import router from '../../../router/index.js';

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const sportDashboard = {
    namespaced: true,
    state: {
        dashboardSports: [],
        currentSport: null,
        loading: false,
        error: null
    },
    actions: {
        async [Constant.INITIALIZE_SPORT]({ commit }) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await SportServiceDashboard.GetSports();
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.INITIALIZE_SPORT, response.data.data);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error loading sports');
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },

        async [Constant.INITIALIZE_ONE_SPORT]({ commit, state }, id) {
            commit(Constant.SET_LOADING, true);
            try {
                const existingSport = state.dashboardSports.find(sport => sport.id == id);
                if (existingSport) {
                    commit(Constant.INITIALIZE_ONE_SPORT, existingSport);
                } else {
                    const response = await SportServiceDashboard.GetOneSport(id);
                    commit(Constant.INITIALIZE_ONE_SPORT, response.data.data);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error loading sport details');
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },

        async [Constant.DELETE_SPORT]({ commit }, id) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await SportServiceDashboard.DeleteSport(id);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.DELETE_SPORT, id);
                    toaster.success('Sport deleted successfully');
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error deleting sport');
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },

        async [Constant.UPDATE_SPORT]({ commit }, sportData) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await SportServiceDashboard.UpdateSport(sportData);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.UPDATE_SPORT, response.data.data);
                    toaster.success('Sport updated successfully');
                    router.push({ name: 'sportsList' });
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                if (error.response?.status === Constant.STATUS_BAD_REQUEST) {
                    toaster.error('Sport name or code taken');
                } else {
                    toaster.error('Error updating sport');
                }
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },

        async [Constant.ADD_SPORT]({ commit }, sportData) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await SportServiceDashboard.CreateSport(sportData);
                if (response.status === Constant.STATUS_CREATED) {
                    commit(Constant.ADD_SPORT, response.data.data);
                    toaster.success('Sport created successfully');
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error creating sport');
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        }
    },
    mutations: {
        [Constant.SET_LOADING](state, status) {
            state.loading = status;
        },
        [Constant.SET_ERROR](state, error) {
            state.error = error;
        },
        [Constant.INITIALIZE_SPORT](state, sports) {
            state.dashboardSports = sports;
        },
        [Constant.INITIALIZE_ONE_SPORT](state, sport) {
            state.currentSport = sport;
        },
        [Constant.DELETE_SPORT](state, id) {
            state.dashboardSports = state.dashboardSports.filter(sport => sport.id !== id);
        },
        [Constant.UPDATE_SPORT](state, updatedSport) {
            const index = state.dashboardSports.findIndex(sport => sport.id === updatedSport.id);
            if (index !== -1) {
                state.dashboardSports[index] = updatedSport;
            }
        },
        [Constant.ADD_SPORT](state, sport) {
            state.dashboardSports.push(sport);
        }
    },
    getters: {
        getDashboardSports: state => state.dashboardSports,
        getCurrentSport: state => state.currentSport,
        isLoading: state => state.loading,
        getError: state => state.error,
        getSportById: (state) => (id) => {
            return state.dashboardSports.find(sport => sport.id === id);
        }
    }
};
