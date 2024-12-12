import Constant from '@/Constant';
import AuthService from '@/services/client/authService';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const auth = {
    namespaced: true,
    state: {
        user: null,
        status: { loggedIn: false },
        loading: false,
        error: null,
    },
    mutations: {
        [Constant.SET_LOADING](state, status) {
            console.log('SET_LOADING mutation:', status);
            state.loading = status;
        },
        [Constant.SET_ERROR](state, error) {
            console.log('SET_ERROR mutation:', error);
            state.error = error;
            toaster.error(error);
        },
        [Constant.LOGIN_SUCCESS](state, user) {
            console.log('LOGIN_SUCCESS mutation:', user);
            state.status.loggedIn = true;
            state.user = user;
            toaster.success('Login successful');
        },
        [Constant.LOGIN_FAILURE](state) {
            console.log('LOGIN_FAILURE mutation');
            state.status.loggedIn = false;
            state.user = null;
            toaster.error('Login failed');
        },
        [Constant.LOGOUT](state) {
            console.log('LOGOUT mutation');
            state.status.loggedIn = false;
            state.user = null;
            toaster.success('Logged out successfully');
        },
        [Constant.REGISTER_SUCCESS](state) {
            console.log('REGISTER_SUCCESS mutation');
            state.status.loggedIn = false;
            toaster.success('Registration successful');
        },
        [Constant.REGISTER_FAILURE](state) {
            console.log('REGISTER_FAILURE mutation');
            state.status.loggedIn = false;
            toaster.error('Registration failed');
        }
    },
    actions: {
        async [Constant.LOGIN_SUCCESS]({ commit }, credentials) {
            console.log('LOGIN action:', credentials);
            commit(Constant.SET_LOADING, true);
            try {
                const response = await AuthService.login(credentials);
                console.log('LOGIN response:', response);
                commit(Constant.LOGIN_SUCCESS, response.data);
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
        async [Constant.REGISTER_SUCCESS]({ commit }, userData) {
            console.log('REGISTER action:', userData);
            commit(Constant.SET_LOADING, true);
            // try {
            //     const response = await AuthService.register(userData);
            //     console.log('REGISTER response:', response);
            //     commit(Constant.REGISTER_SUCCESS, response.data);
            //     return response;
            // } catch (error) {
            //     console.error('REGISTER error:', error);
            //     commit(Constant.SET_ERROR, error.message);
            //     commit(Constant.REGISTER_FAILURE);
            //     throw error;
            // } finally {
            //     commit(Constant.SET_LOADING, false);
            // }
        }
    },
    getters: {
        isLoading: state => state.loading,
        getError: state => state.error,
        getUser: state => state.user
    }
};