import Constant from '@/Constant';
import MaterialService from '@/services/client/materialService';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const materials = {
    namespaced: true,
    state: {
        materials: [],
        currentMaterial: null,
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
        [Constant.INITIALIZE_MATERIAL](state, materials) {
            console.log('Initializing materials:', materials);
            state.materials = materials;
        },
        UPDATE_FILTERS(state, filters) {
            state.filters = { ...state.filters, ...filters };
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
                const response = await MaterialService.GetMaterials(url);
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
    getters: {
        allMaterials: state => state.materials,
        currentMaterial: state => state.currentMaterial,
        isLoading: state => state.loading,
        getError: state => state.error,
        getFilters: state => state.filters,
        getMaterialById: (state) => (id) => {
            return state.materials.find(material => material.id === id);
        }
    }
};