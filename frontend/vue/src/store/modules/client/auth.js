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
        // Realizar el login a través del servicio de autenticación
        const response = await AuthService.login(credentials);
        const { accessToken, refreshToken } = response.data;

        console.log('Login successful, Access Token:', accessToken); // Verificación

        commit(Constant.LOGIN_SUCCESS, { accessToken, refreshToken });

        // Compara el accessToken y refreshToken
        if (accessToken === refreshToken) {
          // Si los tokens son iguales, redirigir a la página de admin
          window.location.href = 'http://localhost:3000/admin'; // Redirige a la app de React
        } else {
          // Si no, redirigir a la página de perfil
          router.push('/profile'); // Cambia '/profile' si tienes otro nombre de ruta
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
