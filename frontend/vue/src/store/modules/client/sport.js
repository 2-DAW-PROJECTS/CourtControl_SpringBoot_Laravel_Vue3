import Constant from '@/Constant';
import SportService from '@/services/client/sportService';
import SportServiceDashboard from '@/services/dashboard/sportServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";
import router from '@/router';

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const sports = {
    namespaced: true,
    state: {
        sports: [],
        currentSport: null,
        loading: false,
        dashboardSports: [], // For dashboard-specific data
    },
    mutations: {
        // Existing mutations
        SET_SPORTS(state, sports) {
            state.sports = sports;
        },
        SET_CURRENT_SPORT(state, sport) {
            state.currentSport = sport;
        },
        SET_LOADING(state, status) {
            state.loading = status;
        },
        
        // Dashboard-specific mutations
        [Constant.INITIALIZE_SPORT]: (state, payload) => {
            if (payload) {
                state.dashboardSports = payload;
            }
        },
        [Constant.INITIALIZE_ONE_SPORT]: (state, payload) => {
            if (payload) {
                state.currentSport = payload;
            }
        },
        [Constant.DELETE_SPORT]: (state, payload) => {
            if (payload) {
                state.dashboardSports = state.dashboardSports.filter(item => item.id !== payload);
            }
        },
        [Constant.UPDATE_SPORT]: (state, payload) => {
            const index = state.dashboardSports.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                state.dashboardSports[index] = { ...payload };
                toaster.success('Sport updated');
                router.push({ name: 'sportsList' });
            }
        },
        [Constant.ADD_SPORT]: (state, payload) => {
            if (payload) {
                state.dashboardSports.push({ ...payload });
            }
        }
    },
    actions: {
        // Existing actions
        async fetchSports({ commit }) {
            commit('SET_LOADING', true);
            try {
                const response = await SportService.getSports();
                commit('SET_SPORTS', response.data.data);
            } catch (error) {
                toaster.error('Error loading sports');
                console.error(error);
            } finally {
                commit('SET_LOADING', false);
            }
        },

        // Dashboard-specific actions
        [Constant.INITIALIZE_SPORT]: async ({ commit }) => {
            try {
                const response = await SportServiceDashboard.GetSports();
                if (response.status === 200) {
                    commit(Constant.INITIALIZE_SPORT, response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        },

        [Constant.INITIALIZE_ONE_SPORT]: async ({ commit, state }, payload) => {
            try {
                const data = state.dashboardSports ?? [];
                const index = data.findIndex(item => item.id == payload);
                if (index === -1) {
                    const response = await SportServiceDashboard.GetOneSport(payload);
                    commit(Constant.INITIALIZE_ONE_SPORT, response.data.data);
                } else {
                    commit(Constant.INITIALIZE_ONE_SPORT, state.dashboardSports[index]);
                }
            } catch (error) {
                console.error(error);
            }
        },

        [Constant.DELETE_SPORT]: async ({ commit }, payload) => {
            try {
                const response = await SportServiceDashboard.DeleteSport(payload);
                if (response.status === 200) {
                    commit(Constant.DELETE_SPORT, payload);
                }
            } catch (error) {
                console.error(error);
            }
        },

        [Constant.UPDATE_SPORT]: async ({ commit }, payload) => {
            try {
                const response = await SportServiceDashboard.UpdateSport(payload);
                if (response.status === 200) {
                    commit(Constant.UPDATE_SPORT, response.data.data);
                }
            } catch (error) {
                if (error.response?.status === 400) {
                    toaster.error('Sport name or code taken');
                }
            }
        },

        [Constant.ADD_SPORT]: async ({ commit }, payload) => {
            try {
                const response = await SportServiceDashboard.CreateSport(payload);
                if (response.status === 201) {
                    commit(Constant.ADD_SPORT, response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
    getters: {
        allSports: state => state.sports,
        currentSport: state => state.currentSport,
        isLoading: state => state.loading,
        getDashboardSports: state => state.dashboardSports,
        getSportById: (state) => (id) => {
            return state.sports.find(sport => sport.id === id);
        }
    }
};
