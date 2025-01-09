import Constant from '@/Constant';  
import { DetailsUserService } from '@/services/client/DetailsUserService';

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
    async FETCH_USER_PROFILE({ commit, rootState }) {
      commit(Constant.SET_LOADING, true);
      try {
        // console.log('Fetching user profile...');
        const token = rootState.auth.accessToken;
        // console.log('Access token:', token);
        const profileData = await DetailsUserService.getUserProfile(token);
        // console.log('Profile data received:', profileData);
        commit(Constant.SET_USER_PROFILE, profileData);
      } catch (error) {
        commit(Constant.SET_ERROR, error.message);
        console.error('Error al cargar perfil:', error.message);
      } finally {
        commit(Constant.SET_LOADING, false);
        // console.log('Finished fetching user profile.');
      }
    },
  },
  getters: {
    userProfile: state => state.userProfile,
    loading: state => state.loading,
    error: state => state.error,
  }
};
