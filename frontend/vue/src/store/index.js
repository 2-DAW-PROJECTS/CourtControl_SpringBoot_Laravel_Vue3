import { createStore } from 'vuex';
import { sports } from './modules/client/sport';
import { materials } from './modules/client/materials';


export default createStore({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        loading: false,
        error: null,
        dashboardMode: false
    },
    mutations: {
        SET_LOADING(state, status) {
            state.loading = status;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        SET_DASHBOARD_MODE(state, mode) {
            state.dashboardMode = mode;
        }
    },
    getters: {
        isLoading: state => state.loading,
        getError: state => state.error,
        isDashboardMode: state => state.dashboardMode
    },
    modules: {
        sports,
        materials,
    }
});
