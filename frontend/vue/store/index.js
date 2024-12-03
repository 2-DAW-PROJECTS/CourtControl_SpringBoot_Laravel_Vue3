// src/store/index.js
import Vuex from "vuex";

import { sport } from './modules/client/sport';
import { sportDashboard } from './modules/dashboard/sportDashboard';
// Importa otros módulos de ejemplo


export default Vuex.createStore({
    modules: {
        sport: sport,
        sportDashboard: sportDashboard,
    }
});