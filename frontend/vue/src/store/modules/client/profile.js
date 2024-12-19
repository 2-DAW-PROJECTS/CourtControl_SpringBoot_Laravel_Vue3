import Constant from '@/Constant';  // Importar las constantes
import { DetailsUserService } from '@/services/client/DetailsUserService';  // Importar el servicio

export const profile = {
  namespaced: true,
  state: {
    userProfile: null,
    loading: false,
    error: null,
  },
  mutations: {
    [Constant.SET_USER_PROFILE](state, profile) {
      state.userProfile = profile;
    },
    [Constant.SET_LOADING](state, isLoading) {
      state.loading = isLoading;
    },
    [Constant.SET_ERROR](state, error) {
      state.error = error;
    },
  },
  actions: {
    // Cambia el nombre de la acción a FETCH_USER_PROFILE
    async FETCH_USER_PROFILE({ commit, rootState }) {
      commit(Constant.SET_LOADING, true);
      try {
        const token = rootState.auth.accessToken;  // Asegúrate de que el token esté correctamente accesible
        const profileData = await DetailsUserService.getUserProfile(token);  // Llamada al servicio
        commit(Constant.SET_USER_PROFILE, profileData);  // Guarda el perfil en el estado
      } catch (error) {
        commit(Constant.SET_ERROR, error.message);
        console.error('Error al cargar perfil:', error.message);
      } finally {
        commit(Constant.SET_LOADING, false);
      }
    },
  },
  getters: {
    userProfile: state => state.userProfile,
    loading: state => state.loading,
    error: state => state.error,
  }
};
