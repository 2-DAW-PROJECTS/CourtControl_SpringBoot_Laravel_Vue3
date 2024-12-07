import { createStore } from 'vuex';
import { materials } from './modules/client/materials';
import { materialDashboard } from './modules/dashboard/materialsDashboard';
import { courts } from './modules/client/courts';
import { courtsDashboard } from './modules/dashboard/courtsDashboard';
import { lessons } from './modules/client/lessons';
import { lessonsDashboard } from './modules/dashboard/lessonsDashboard';
import { summers } from './modules/client/summers';
import { summersDashboard } from './modules/dashboard/summersDashboard';



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
        materials,
        materialDashboard,
        courts,
        courtsDashboard,
        lessons,
        lessonsDashboard,
        summers,
        summersDashboard,
    }
});
