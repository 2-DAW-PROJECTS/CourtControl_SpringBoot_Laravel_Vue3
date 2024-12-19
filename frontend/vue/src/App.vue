<template>
  <div id="app">
    <Header /> <!-- Incluir el header -->
    <router-view /> <!-- Aquí se renderizarán las vistas de cada ruta -->
    <Footer /> <!-- Incluir el footer -->
  </div>
</template>

<script>
// Importar los componentes Header y Footer
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import { useStore } from 'vuex'; // Importar Vuex para manejar el store

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    const store = useStore();

    // Verificar si el accessToken existe en localStorage al cargar la app
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      // Restauramos la sesión desde localStorage
      store.commit('LOGIN_SUCCESS', {
        user: JSON.parse(localStorage.getItem('user')),
        accessToken
      });
    }
  }
};
</script>

<style>
/* Estilos globales para la app */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
}

#app {
  width: 100%;
  margin: 0;
  padding: 0;
}

</style>
