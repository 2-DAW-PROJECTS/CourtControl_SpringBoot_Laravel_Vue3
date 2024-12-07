import Constant from '../../../Constant';
import MaterialServiceDashboard from '../../../services/dashboard/materialServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const materialDashboard = {
    namespaced: true,
    state: {
        dashboardMaterials: [],
        currentMaterial: null,
        loading: false,
        error: null,
        filters: {
            search: '',
            category: '',
            status: '',
            sortBy: 'name',
            sortOrder: 'asc',
            sport: ''
        }
    },
    actions: {
        async [Constant.INITIALIZE_MATERIAL]({ commit }, sportId = null) {
            commit(Constant.SET_LOADING, true);
            try {
                const url = sportId !== null
                    ? `http://localhost:8085/api/courts/materials?sportId=${Number(sportId)}`
                    : `http://localhost:8085/api/courts/materials`;
                console.log('Fetching materials from URL:', url);
                const response = await MaterialServiceDashboard.GetMaterials(url);
                console.log('Response status:', response.status);
                console.log('Response data:', response.data);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.INITIALIZE_MATERIAL, response.data);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error loading materials');
                console.error('Error loading materials:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        updateFilters({ commit, dispatch }, filters) {
            commit('UPDATE_FILTERS', filters);
            dispatch(Constant.INITIALIZE_MATERIAL);
        }
    },
    mutations: {
        [Constant.SET_LOADING](state, status) {
            state.loading = status;
        },
        [Constant.SET_ERROR](state, error) {
            state.error = error;
        },
        [Constant.INITIALIZE_MATERIAL](state, materials) {
            console.log('Initializing materials:', materials);
            state.dashboardMaterials = materials;
        },
        UPDATE_FILTERS(state, filters) {
            state.filters = { ...state.filters, ...filters };
        }
    },
    getters: {
        getDashboardMaterials: state => state.dashboardMaterials,
        isLoading: state => state.loading,
        getFilters: state => state.filters
    }
};