import Constant from '@/Constant';

export const profile = {
  namespaced: true,
  state: {
    profile: null,
    loading: false,
    error: null,
  },
  mutations: {
    [Constant.SET_LOADING](state, status) {
      state.loading = status;
    },
    [Constant.SET_ERROR](state, error) {
      state.error = error;
    },
    [Constant.SET_PROFILE](state, profile) {
      state.profile = profile;
    },
  },
  actions: {
    async fetchProfile({ commit, rootGetters }) {
      commit(Constant.SET_LOADING, true);
      try {
        const accessToken = rootGetters['auth/getAccessToken'];
        const response = await fetch('http://localhost:8085/api/users/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) throw new Error('Error al obtener la información del perfil');
        const profile = await response.json();
        commit(Constant.SET_PROFILE, profile);
      } catch (error) {
        commit(Constant.SET_ERROR, error.message);
      } finally {
        commit(Constant.SET_LOADING, false);
      }
    },
  },
  getters: {
    getProfile: (state) => state.profile,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
};
