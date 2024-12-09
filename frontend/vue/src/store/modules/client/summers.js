import Constant from '@/Constant';
import SummerService from '@/services/client/summerService';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const summers = {
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
        UPDATE_FILTERS(state, filters) {
            state.filters = { ...state.filters, ...filters };
        },
        [Constant.SET_SUMMER](state, summer) {
            state.currentSummer = summer;
        }
    },
    actions: {
        async [Constant.INITIALIZE_SUMMERS]({ commit }, filters = {}) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await SummerService.GetSummers(filters);
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
        updateFilters({ commit, dispatch }, filters) {
            commit('UPDATE_FILTERS', filters);
            dispatch(Constant.INITIALIZE_SUMMERS, filters);
        },
        async [Constant.FETCH_SUMMER_BY_ID]({ commit }, id) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await SummerService.GetSummerById(id);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.SET_SUMMER, response.data);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error fetching summer');
                console.error('Error fetching summer:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        }
    },
    getters: {
        allSummers: state => state.summers,
        currentSummer: state => state.currentSummer,
        summer: state => state.currentSummer,
        isLoading: state => state.loading,
        getError: state => state.error,
        getFilters: state => state.filters,
        getSummerById: (state) => (id) => {
            return state.summers.find(summer => summer.id === id);
        }
    }
};
