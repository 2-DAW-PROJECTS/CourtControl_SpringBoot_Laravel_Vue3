import Constant from '@/Constant';
import SummerServiceDashboard from '@/services/dashboard/summerServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const summersDashboard = {
    namespaced: true,
    state: {
        summers: [],
        currentSummer: null,
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
        [Constant.INITIALIZE_SUMMERS](state, summers) {
            state.summers = summers;
        },
        [Constant.ADD_SUMMER](state, summer) {
            state.summers.push(summer);
        },
        [Constant.UPDATE_SUMMER](state, updatedSummer) {
            const index = state.summers.findIndex(summer => summer.id === updatedSummer.id);
            if (index !== -1) {
                state.summers.splice(index, 1, updatedSummer);
            }
        },
        [Constant.DELETE_SUMMER](state, id) {
            state.summers = state.summers.filter(summer => summer.id !== id);
        },
        UPDATE_FILTERS(state, filters) {
            state.filters = { ...state.filters, ...filters };
        }
    },
    actions: {
        async [Constant.INITIALIZE_SUMMERS]({ commit }, page = 1) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await SummerServiceDashboard.GetSummers(page);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.INITIALIZE_SUMMERS, response.data);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error loading summers');
                console.error('Error loading summers:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        async [Constant.ADD_SUMMER]({ commit }, summerData) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await SummerServiceDashboard.CreateSummer(summerData);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.ADD_SUMMER, response.data);
                    toaster.success('Summer created successfully');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error creating summer');
                console.error('Error creating summer:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        async [Constant.UPDATE_SUMMER]({ commit }, summerData) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await SummerServiceDashboard.UpdateSummer(summerData);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.UPDATE_SUMMER, response.data);
                    toaster.success('Summer updated successfully');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error updating summer');
                console.error('Error updating summer:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        async [Constant.DELETE_SUMMER]({ commit }, id) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await SummerServiceDashboard.DeleteSummer(id);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.DELETE_SUMMER, id);
                    toaster.success('Summer deleted successfully');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error deleting summer');
                console.error('Error deleting summer:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        updateFilters({ commit, dispatch }, filters) {
            commit('UPDATE_FILTERS', filters);
            dispatch(Constant.INITIALIZE_SUMMERS);
        }
    },
    getters: {
        allSummers: state => state.summers,
        currentSummer: state => state.currentSummer,
        isLoading: state => state.loading,
        getError: state => state.error,
        getFilters: state => state.filters,
        getSummerById: (state) => (id) => {
            return state.summers.find(summer => summer.id === id);
        }
    }
};
