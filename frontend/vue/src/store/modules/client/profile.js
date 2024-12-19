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
    async [Constant.FETCH_USER_PROFILE]({ commit, rootState }) {
      commit(Constant.SET_LOADING, true);
      try {
        const token = rootState.auth.accessToken;  // Obtener el token desde el estado global
        console.log('Token:', token);
        const profileData = await DetailsUserService.getUserProfile(token);  // Llamar al servicio
        commit(Constant.SET_USER_PROFILE, profileData);  // Guardar el perfil en el estado
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
