// src/store/modules/dashboard/sportDashboard.js
import Constant from '../../../Constant';
import SportServiceDashboard from '../../../services/dashboard/SportServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";
import router from '../../../router/index.js';

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const sportDashboard = {
    namespaced: true,
    state: {
        sports: [],
        sport: null,
    },
    actions: {
        [Constant.INITIALIZE_SPORT]: async (store) => {
            try {
                const response = await SportServiceDashboard.GetSports();
                if (response.status === 200) {
                    store.commit(Constant.INITIALIZE_SPORT, response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }, // INITIALIZE_SPORT

        [Constant.INITIALIZE_ONE_SPORT]: async (store, payload) => {
            try {
                const data = store.state.sports ?? [];
                const index = data.findIndex(item => item.id == payload);
                if (index === -1) {
                    const response = await SportServiceDashboard.GetOneSport(payload);
                    store.commit(Constant.INITIALIZE_ONE_SPORT, response.data.data);
                } else {
                    store.commit(Constant.INITIALIZE_ONE_SPORT, store.state.sports[index]);
                }
            } catch (error) {
                console.error(error);
            }
        }, // INITIALIZE_ONE_SPORT

        [Constant.DELETE_SPORT]: async (store, payload) => {
            try {
                const response = await SportServiceDashboard.DeleteSport(payload);
                if (response.status === 200) {
                    store.commit(Constant.DELETE_SPORT, payload);
                }
            } catch (error) {
                console.error(error);
            }
        }, // DELETE_SPORT

        [Constant.UPDATE_SPORT]: async (store, payload) => {
            try {
                const response = await SportServiceDashboard.UpdateSport(payload);
                if (response.status === 200) {
                    store.commit(Constant.UPDATE_SPORT, response.data.data);
                }
            } catch (error) {
                if (error.response.status === 400) {
                    toaster.error('Sport name or code taken');
                }
            }
        }, // UPDATE_SPORT

        [Constant.ADD_SPORT]: async (store, payload) => {
            try {
                const response = await SportServiceDashboard.CreateSport(payload);
                if (response.status === 201) {
                    store.commit(Constant.ADD_SPORT, response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }, // ADD_SPORT
    }, // actions
    mutations: {
        [Constant.INITIALIZE_SPORT]: (state, payload) => {
            if (payload) {
                state.sports = payload;
            }
        }, // INITIALIZE_SPORT

        [Constant.INITIALIZE_ONE_SPORT]: (state, payload) => {
            if (payload) {
                state.sport = payload;
            }
        }, // INITIALIZE_ONE_SPORT

        [Constant.DELETE_SPORT]: (state, payload) => {
            if (payload) {
                state.sports = state.sports.filter(item => item.id !== payload);
            }
        }, // DELETE_SPORT

        [Constant.UPDATE_SPORT]: (state, payload) => {
            const index = (state.sports ?? []).findIndex(item => item.id == payload.id);
            if (index !== -1) {
                let data = { ...payload };
                state.sports[index] = data;
                toaster.success('Sport updated');
                router.push({ name: 'sportsList' });
            }
        }, // UPDATE_SPORT

        [Constant.ADD_SPORT]: (state, payload) => {
            if (payload) {
                let data = { ...payload };
                state.sports.push(data);
            }
        }, // ADD_SPORT
    }, // mutations
    getters: {
        GetSports(state) {
            return state.sports;
        },

        GetSport(state) {
            return state.sport;
        },
    } // getters
}; // export