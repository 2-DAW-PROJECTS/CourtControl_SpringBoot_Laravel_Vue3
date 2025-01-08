import Constant from '@/Constant';
import UserService from '@/services/client/UserService';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const user = {
  namespaced: true,
  state: {
    user: null,
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
    [Constant.SET_USER](state, user) {
      state.user = user;
    },
  },
  actions: {
    async updateUserProfile({ commit }, user) {
      commit(Constant.SET_LOADING, true);
      try {
        const response = await UserService.updateUserProfile(user);
        if (response.status === Constant.STATUS_OK) {
          commit(Constant.SET_USER, response.data);
          toaster.success('Perfil actualizado con éxito');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        commit(Constant.SET_ERROR, error.message);
        toaster.error('Error actualizando el perfil');
        console.error('Error actualizando el perfil:', error);
      } finally {
        commit(Constant.SET_LOADING, false);
      }
    },
  },
  getters: {
    user: state => state.user,
    isLoading: state => state.loading,
    getError: state => state.error,
  }
};