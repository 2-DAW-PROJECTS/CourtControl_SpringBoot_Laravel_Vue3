<!-- src/App.vue -->
<template>
  <div id="app">
    <Header /> <!-- Incluir el header -->
    <router-view /> <!-- Aquí se renderizarán las vistas de cada ruta -->
    <Footer /> <!-- Incluir el footer -->
  </div>
</template>

<script>
// Importar los componentes Header y Footer
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
</script>

<style>
/* Estilos globales para la app */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
