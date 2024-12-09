// // src/router/index.js
// import { createRouter, createWebHistory } from 'vue-router';
// import HomePage from '../views/HomePage.vue';
// import ShopPage from '../views/ShopPage.vue'; // Importa la página del Shop

// const routes = [
//   {
//     path: '/',
//     redirect: '/home'
//   },
//   {
//     path: '/home',
//     name: 'home', 
//     component: HomePage
//   },
//   {
//     path: '/shop',
//     name: 'shop',
//     component: ShopPage // Define la nueva ruta
//   },
//   {
//     path: '/auth',
//     name: 'React-auth',
//     beforeEnter() {
//       window.location.href = 'http://localhost:3000'; // URL del frontend de React
//     }
//   }
// ];

// const router = createRouter({
//   history: createWebHistory('/'),
//   routes
// });

// export default router;

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ShopPage from '../views/ShopPage.vue';
import CourtDetails from '../components/details/CourtDetails.vue';
import LessonDetails from '../components/details/LessonDetails.vue';
import SummerDetails from '../components/details/SummerDetails.vue';

const routes = [
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
    component: ShopPage
  },
  {
    path: '/court/:id',
    name: 'CourtDetails',
    component: CourtDetails
  },
  {
    path: '/lesson/:id',
    name: 'LessonDetails',
    component: LessonDetails
  },
  {
    path: '/summer/:id',
    name: 'SummerDetails',
    component: SummerDetails
  },
  {
    path: '/auth',
    name: 'React-auth',
    beforeEnter() {
      window.location.href = 'http://localhost:3000';
    }
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;