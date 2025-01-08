import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ShopPage from '../views/ShopPage.vue';
import ProfilePage from '../views/ProfilePage.vue'; // Asegúrate de que ProfilePage esté importado
import CourtDetails from '../components/details/CourtDetails.vue';
import LessonDetails from '../components/details/LessonDetails.vue';
import SummerDetails from '../components/details/SummerDetails.vue';
import AuthPage from '../components/auth/Auth.vue';
import Logout from '../components/auth/logout.vue'; // Importa el nuevo componente


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
    name: 'auth',
    component: AuthPage  
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
