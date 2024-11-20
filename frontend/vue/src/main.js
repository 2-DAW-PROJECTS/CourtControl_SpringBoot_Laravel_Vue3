import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Importar el router

const app = createApp(App);

app.use(router);  // Usar el router en la aplicación
app.mount('#app');
