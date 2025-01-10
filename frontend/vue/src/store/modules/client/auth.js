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
    refreshToken: localStorage.getItem('refreshToken') || null,
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
      [Constant.LOGIN_SUCCESS](state, { accessToken, refreshToken }) {
        state.status.loggedIn = true;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        toaster.success('Login successful');
      },
      [Constant.LOGOUT](state) {
        state.status.loggedIn = false;
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.clear();
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
        const accessToken = state.accessToken || localStorage.getItem('accessToken');
        const refreshToken = state.refreshToken || localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {{
          state.status.loggedIn = true;
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
        }
      }
    }
  },
  actions: {
    async [Constant.LOGIN_SUCCESS]({ commit }, credentials) {
      commit(Constant.SET_LOADING, true);
      try {
        const response = await AuthService.login(credentials);
        const { accessToken, refreshToken } = response.data;
        // console.log('Login successful, Access Token:', accessToken); 
        const user = await AuthService.getUserByEmail(credentials.email);

        commit(Constant.LOGIN_SUCCESS, { accessToken, refreshToken, user });

        const storedAccessToken = this.state.accessToken || localStorage.getItem('accessToken');
        const storedRefreshToken = this.state.refreshToken || localStorage.getItem('refreshToken');

        // console.log('suth.js 82', user);
        // console.log('Stored Access Token:', storedAccessToken);
        // console.log('Stored Refresh Token:', storedRefreshToken);

        if (storedAccessToken === storedRefreshToken) {
          const encryptedAccessToken = btoa(storedAccessToken);
          const encryptedRefreshToken = btoa(storedRefreshToken);
          // console.log('Encrypted Access Token:', encryptedAccessToken);
          // console.log('Encrypted Refresh Token:', encryptedRefreshToken);
          // console.log('Stored Access Token:', storedAccessToken);
          // alert(storedAccessToken);
          window.location.href = `http://localhost:3000?accessToken=${encryptedAccessToken}&refreshToken=${encryptedRefreshToken}&user=${encodeURIComponent(JSON.stringify(user))}`;
        } else {
          router.push('/profile');
        }
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
    getAccessToken: state => state.accessToken,
    isLoggedIn: state => state.status.loggedIn || !!state.accessToken
  }
};
