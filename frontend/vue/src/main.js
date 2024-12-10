import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Importar el router
import store from './store';  // Importar el store
import '@fortawesome/fontawesome-free/css/all.css';  // Importar Font Awesome


const app = createApp(App);

app.use(router);  // Usar el router en la aplicación
app.use(store); // Usa el store
app.mount('#app');
