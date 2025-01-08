import router from '@/router';
import Constant from '@/Constant';
import AuthService from '@/services/client/authService';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const auth = {
  namespaced: true,
  state: {
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
    status: { loggedIn: false },
    loading: false,
    error: null,
  },
  mutations: {
    [Constant.SET_LOADING](state, status) {
      state.loading = status;
    },
    [Constant.SET_ERROR](state, error) {
      state.error = error;
      toaster.error(error);
    },
    [Constant.LOGIN_SUCCESS](state, { user, accessToken }) {
      state.status.loggedIn = true;
      state.user = user;
      state.accessToken = accessToken;

      localStorage.setItem('accessToken', accessToken);
      toaster.success('Login successful');
    },
    [Constant.LOGOUT](state) {
      state.status.loggedIn = false;
      state.user = null;
      state.accessToken = null;

      localStorage.removeItem('accessToken');
      toaster.success('Logged out successfully');
    },
    [Constant.LOGIN_FAILURE](state) {
      state.status.loggedIn = false;
      state.user = null;
      state.accessToken = null;
      toaster.error('Login failed');
    },
    [Constant.REGISTER_SUCCESS](state) {
      state.status.loggedIn = false;
      toaster.success('Registration successful');
    },
    [Constant.REGISTER_FAILURE](state) {
      state.status.loggedIn = false;
      toaster.error('Registration failed');
    },
    initializeState(state) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        state.status.loggedIn = true;
        state.accessToken = token;
      }
    }
  },
  actions: {
    async [Constant.LOGIN_SUCCESS]({ commit }, credentials) {
      commit(Constant.SET_LOADING, true);
      try {
        const response = await AuthService.login(credentials);
        const { user, accessToken } = response.data;
        commit(Constant.LOGIN_SUCCESS, { user, accessToken });

        router.push('/profile'); 
        return response;
      } catch (error) {
        console.error('LOGIN error:', error);
        commit(Constant.SET_ERROR, error.message);
        commit(Constant.LOGIN_FAILURE);
        throw error;
      } finally {
        commit(Constant.SET_LOADING, false);
      }
    },
    logout({ commit }) {
      commit(Constant.LOGOUT);
    },
    async [Constant.REGISTER_SUCCESS]({ commit }, userData) {
      commit(Constant.SET_LOADING, true);
      try {
        const response = await AuthService.register(userData);
        commit(Constant.REGISTER_SUCCESS, response);
        return response;
      } catch (error) {
        console.error('REGISTER error:', error);
        commit(Constant.SET_ERROR, error.message);
        commit(Constant.REGISTER_FAILURE);
        throw error;
      } finally {
        commit(Constant.SET_LOADING, false);
      }
    }
  },
  getters: {
    isLoading: state => state.loading,
    getError: state => state.error,
    getUser: state => state.user,
    getAccessToken: state => state.accessToken,
    isLoggedIn: state => state.status.loggedIn || !!state.accessToken
  }
};
