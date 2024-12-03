import Constant from '@/Constant';
import MaterialService from '@/services/client/materialService';
import MaterialServiceDashboard from '@/services/dashboard/materialServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";
import router from '@/router';


const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const materials = {
    namespaced: true,
    state: {
        materials: [],
        currentMaterial: null,
        loading: false,
        error: null,
        dashboardMaterials: [], // For dashboard-specific data
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
            state.materials = materials;
        },
        [Constant.INITIALIZE_ONE_MATERIAL](state, material) {
            state.currentMaterial = material;
        },
        [Constant.DELETE_MATERIAL](state, id) {
            state.materials = state.materials.filter(material => material.id !== id);
        },
        [Constant.UPDATE_MATERIAL](state, updatedMaterial) {
            const index = state.materials.findIndex(material => material.id === updatedMaterial.id);
            if (index !== -1) {
                state.materials[index] = updatedMaterial;
            }
        },
        [Constant.ADD_MATERIAL](state, material) {
            state.materials.push(material);
        },
        UPDATE_FILTERS(state, filters) {
            state.filters = { ...state.filters, ...filters };
        }
    },
    actions: {
        async [Constant.INITIALIZE_MATERIAL]({ commit }) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await MaterialServiceDashboard.GetMaterials();
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.INITIALIZE_MATERIAL, response.data.data);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error loading materials');
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },

        async [Constant.INITIALIZE_ONE_MATERIAL]({ commit }, id) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await MaterialService.getMaterialById(id);
                commit(Constant.INITIALIZE_ONE_MATERIAL, response.data.data);
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error loading material details');
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },

        async [Constant.ADD_MATERIAL]({ commit }, materialData) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await MaterialService.createMaterial(materialData);
                commit(Constant.ADD_MATERIAL, response.data.data);
                toaster.success('Material created successfully');
                router.push({ name: 'materialsList' });
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error creating material');
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },

        async [Constant.UPDATE_MATERIAL]({ commit }, materialData) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await MaterialServiceDashboard.UpdateMaterial(materialData);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.UPDATE_MATERIAL, response.data.data);
                    toaster.success('Material updated successfully');
                    router.push({ name: 'materialsList' });
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error updating material');
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },

        async [Constant.DELETE_MATERIAL]({ commit }, id) {
            commit(Constant.SET_LOADING, true);
            try {
                await MaterialService.deleteMaterial(id);
                commit(Constant.DELETE_MATERIAL, id);
                toaster.success('Material deleted successfully');
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error deleting material');
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
