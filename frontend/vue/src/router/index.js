// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ShopPage from '../views/ShopPage.vue'; // Importa la página del Shop

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home', 
      component: HomePage
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopPage // Define la nueva ruta
    },
    {
      path: '/auth',
      name: 'React-auth',
      beforeEnter() {
        window.location.href = 'http://localhost:3000'; // URL del frontend de React
      }
    }
  ]
});

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// });

export default router;
