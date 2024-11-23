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
    }
  ]
});

export default router;
