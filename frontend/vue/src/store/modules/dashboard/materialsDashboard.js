// // import Constant from '../../../Constant';
// // import MaterialServiceDashboard from '../../../services/dashboard/materialServiceDashboard';
// // import { createToaster } from "@meforma/vue-toaster";
// // import router from '../../../router/index.js';

// // const toaster = createToaster({ "position": "top-right", "duration": 2300 });

// // export const materialDashboard = {
// //     namespaced: true,
// //     state: {
// //         dashboardMaterials: [],
// //         currentMaterial: null,
// //         loading: false,
// //         error: null,
// //         filters: {
// //             search: '',
// //             category: '',
// //             status: '',
// //             sortBy: 'name',
// //             sortOrder: 'asc'
// //         }
// //     },
// //     actions: {
// //         async [Constant.INITIALIZE_MATERIAL]({ commit }) {
// //             commit(Constant.SET_LOADING, true);
// //             try {
// //                 const response = await MaterialServiceDashboard.GetMaterials();
// //                 if (response.status === Constant.STATUS_OK) {
// //                     commit(Constant.INITIALIZE_MATERIAL, response.data.data);
// //                 }
// //             } catch (error) {
// //                 commit(Constant.SET_ERROR, error.message);
// //                 toaster.error('Error loading materials');
// //             } finally {
// //                 commit(Constant.SET_LOADING, false);
// //             }
// //         },

// //         async [Constant.INITIALIZE_ONE_MATERIAL]({ commit, state }, id) {
// //             commit(Constant.SET_LOADING, true);
// //             try {
// //                 const existingMaterial = state.dashboardMaterials.find(material => material.id == id);
// //                 if (existingMaterial) {
// //                     commit(Constant.INITIALIZE_ONE_MATERIAL, existingMaterial);
// //                 } else {
// //                     const response = await MaterialServiceDashboard.GetOneMaterial(id);
// //                     commit(Constant.INITIALIZE_ONE_MATERIAL, response.data.data);
// //                 }
// //             } catch (error) {
// //                 commit(Constant.SET_ERROR, error.message);
// //                 toaster.error('Error loading material details');
// //             } finally {
// //                 commit(Constant.SET_LOADING, false);
// //             }
// //         },

// //         async [Constant.DELETE_MATERIAL]({ commit }, id) {
// //             commit(Constant.SET_LOADING, true);
// //             try {
// //                 const response = await MaterialServiceDashboard.DeleteMaterial(id);
// //                 if (response.status === Constant.STATUS_OK) {
// //                     commit(Constant.DELETE_MATERIAL, id);
// //                     toaster.success('Material deleted successfully');
// //                 }
// //             } catch (error) {
// //                 commit(Constant.SET_ERROR, error.message);
// //                 toaster.error('Error deleting material');
// //             } finally {
// //                 commit(Constant.SET_LOADING, false);
// //             }
// //         },

// //         async [Constant.UPDATE_MATERIAL]({ commit }, materialData) {
// //             commit(Constant.SET_LOADING, true);
// //             try {
// //                 const response = await MaterialServiceDashboard.UpdateMaterial(materialData);
// //                 if (response.status === Constant.STATUS_OK) {
// //                     commit(Constant.UPDATE_MATERIAL, response.data.data);
// //                     toaster.success('Material updated successfully');
// //                     router.push({ name: 'materialsList' });
// //                 }
// //             } catch (error) {
// //                 commit(Constant.SET_ERROR, error.message);
// //                 if (error.response?.status === Constant.STATUS_BAD_REQUEST) {
// //                     toaster.error('Material code already exists');
// //                 } else {
// //                     toaster.error('Error updating material');
// //                 }
// //             } finally {
// //                 commit(Constant.SET_LOADING, false);
// //             }
// //         },

// //         async [Constant.ADD_MATERIAL]({ commit }, materialData) {
// //             commit(Constant.SET_LOADING, true);
// //             try {
// //                 const response = await MaterialServiceDashboard.CreateMaterial(materialData);
// //                 if (response.status === Constant.STATUS_CREATED) {
// //                     commit(Constant.ADD_MATERIAL, response.data.data);
// //                     toaster.success('Material created successfully');
// //                 }
// //             } catch (error) {
// //                 commit(Constant.SET_ERROR, error.message);
// //                 toaster.error('Error creating material');
// //             } finally {
// //                 commit(Constant.SET_LOADING, false);
// //             }
// //         },

// //         updateFilters({ commit, dispatch }, filters) {
// //             commit('UPDATE_FILTERS', filters);
// //             dispatch(Constant.INITIALIZE_MATERIAL);
// //         }
// //     },
// //     mutations: {
// //         [Constant.SET_LOADING](state, status) {
// //             state.loading = status;
// //         },
// //         [Constant.SET_ERROR](state, error) {
// //             state.error = error;
// //         },
// //         [Constant.INITIALIZE_MATERIAL](state, materials) {
// //             state.dashboardMaterials = materials;
// //         },
// //         [Constant.INITIALIZE_ONE_MATERIAL](state, material) {
// //             state.currentMaterial = material;
// //         },
// //         [Constant.DELETE_MATERIAL](state, id) {
// //             state.dashboardMaterials = state.dashboardMaterials.filter(material => material.id !== id);
// //         },
// //         [Constant.UPDATE_MATERIAL](state, updatedMaterial) {
// //             const index = state.dashboardMaterials.findIndex(material => material.id === updatedMaterial.id);
// //             if (index !== -1) {
// //                 state.dashboardMaterials[index] = updatedMaterial;
// //             }
// //         },
// //         [Constant.ADD_MATERIAL](state, material) {
// //             state.dashboardMaterials.push(material);
// //         },
// //         UPDATE_FILTERS(state, filters) {
// //             state.filters = { ...state.filters, ...filters };
// //         }
// //     },
// //     getters: {
// //         getDashboardMaterials: state => state.dashboardMaterials,
// //         getCurrentMaterial: state => state.currentMaterial,
// //         isLoading: state => state.loading,
// //         getError: state => state.error,
// //         getFilters: state => state.filters,
// //         getMaterialById: (state) => (id) => {
// //             return state.dashboardMaterials.find(material => material.id === id);
// //         }
// //     }
// // };


// // import Constant from '../../../Constant';
// // import MaterialServiceDashboard from '../../../services/dashboard/materialServiceDashboard';
// // import { createToaster } from "@meforma/vue-toaster";

// // const toaster = createToaster({ "position": "top-right", "duration": 2300 });

// // export const materialDashboard = {
// //     namespaced: true,
// //     state: {
// //         dashboardMaterials: [],
// //         currentMaterial: null,
// //         loading: false,
// //         error: null,
// //         filters: {
// //             search: '',
// //             category: '',
// //             status: '',
// //             sortBy: 'name',
// //             sortOrder: 'asc',
// //             sport: ''
// //         }
// //     },
// //     actions: {
// //         async [Constant.INITIALIZE_MATERIAL]({ commit }) {
// //             commit(Constant.SET_LOADING, true);
// //             try {
// //                 const response = await MaterialServiceDashboard.GetMaterials();
// //                 if (response.status === Constant.STATUS_OK) {
// //                     commit(Constant.INITIALIZE_MATERIAL, response.data.data);
// //                 }
// //             } catch (error) {
// //                 commit(Constant.SET_ERROR, error.message);
// //                 toaster.error('Error loading materials');
// //             } finally {
// //                 commit(Constant.SET_LOADING, false);
// //             }
// //         },
// //         updateFilters({ commit, dispatch }, filters) {
// //             commit('UPDATE_FILTERS', filters);
// //             dispatch(Constant.INITIALIZE_MATERIAL);
// //         }
// //     },
// //     mutations: {
// //         [Constant.SET_LOADING](state, status) {
// //             state.loading = status;
// //         },
// //         [Constant.SET_ERROR](state, error) {
// //             state.error = error;
// //         },
// //         [Constant.INITIALIZE_MATERIAL](state, materials) {
// //             state.dashboardMaterials = materials;
// //         },
// //         UPDATE_FILTERS(state, filters) {
// //             state.filters = { ...state.filters, ...filters };
// //         }
// //     },
// //     getters: {
// //         getDashboardMaterials: state => state.dashboardMaterials,
// //         isLoading: state => state.loading,
// //         getFilters: state => state.filters
// //     }
// // };


// import Constant from '../../../Constant';
// import MaterialServiceDashboard from '../../../services/dashboard/materialServiceDashboard';
// import { createToaster } from "@meforma/vue-toaster";

// const toaster = createToaster({ "position": "top-right", "duration": 2300 });

// export const materialDashboard = {
//     namespaced: true,
//     state: {
//         dashboardMaterials: [],
//         currentMaterial: null,
//         loading: false,
//         error: null,
//         filters: {
//             search: '',
//             category: '',
//             status: '',
//             sortBy: 'name',
//             sortOrder: 'asc',
//             sport: ''
//         }
//     },
//     actions: {
//         async [Constant.INITIALIZE_MATERIAL]({ commit }, { url }) {
//             commit(Constant.SET_LOADING, true);
//             try {
//                 const response = await MaterialServiceDashboard.GetMaterials(url);
//                 if (response.status === Constant.STATUS_OK) {
//                     commit(Constant.INITIALIZE_MATERIAL, response.data.data);
//                 }
//             } catch (error) {
//                 commit(Constant.SET_ERROR, error.message);
//                 toaster.error('Error loading materials');
//             } finally {
//                 commit(Constant.SET_LOADING, false);
//             }
//         },
//         updateFilters({ commit, dispatch }, filters) {
//             commit('UPDATE_FILTERS', filters);
//             dispatch(Constant.INITIALIZE_MATERIAL);
//         }
//     },
//     mutations: {
//         [Constant.SET_LOADING](state, status) {
//             state.loading = status;
//         },
//         [Constant.SET_ERROR](state, error) {
//             state.error = error;
//         },
//         [Constant.INITIALIZE_MATERIAL](state, materials) {
//             state.dashboardMaterials = materials;
//         },
//         UPDATE_FILTERS(state, filters) {
//             state.filters = { ...state.filters, ...filters };
//         }
//     },
//     getters: {
//         getDashboardMaterials: state => state.dashboardMaterials,
//         isLoading: state => state.loading,
//         getFilters: state => state.filters
//     }
// };


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