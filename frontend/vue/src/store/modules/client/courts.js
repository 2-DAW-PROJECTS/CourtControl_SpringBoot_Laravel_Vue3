import Constant from '@/Constant';
import CourtService from '@/services/client/courtService';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const courts = {
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
            // console.log('Initializing courts:', courts);
            state.courts = courts;
        },
        UPDATE_FILTERS(state, filters) {
            state.filters = { ...state.filters, ...filters };
        }
    },
    actions: {
        async [Constant.INITIALIZE_COURTS]({ commit }, filters = {}) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await CourtService.GetCourts(filters);
                // console.log('Response status:', response.status);
                // console.log('Response data:', response.data);
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
        updateFilters({ commit, dispatch }, filters) {
            commit('UPDATE_FILTERS', filters);
            dispatch(Constant.INITIALIZE_COURTS, filters);
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