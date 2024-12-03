    // src/store/modules/client/sport.js
    import axios from 'axios';

    const state = {
        sports: [],
        loading: false,
    };

    const mutations = {
        setSports(state, sports) {
            state.sports = sports;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
    };

    const actions = {
        async fetchSports({ commit }) {
            commit('setLoading', true);
            try {
                const response = await axios.get('/api/sports');
                commit('setSports', response.data);
            } catch (error) {
                console.error('Error fetching sports:', error);
            } finally {
            commit('setLoading', false);
            }
        },
    };

    const getters = {
        allSports(state) {
            return state.sports;
        },
        isLoading(state) {
            return state.loading;
        },
    };

    export const sport = {
        namespaced: true,
        state,
        mutations,
        actions,
        getters,
    };