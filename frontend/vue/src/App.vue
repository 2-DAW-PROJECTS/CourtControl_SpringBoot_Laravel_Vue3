<template>
  <div id="app">
    <Header /> 
    <router-view /> 
    <Footer /> 
  </div>
</template>

<script>
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import { useStore } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    const store = useStore();

    const accessToken = store.state.auth.accessToken || localStorage.getItem('accessToken');
    
    // console.log('APP.vue accessToken:', accessToken);

    if (accessToken) {
      store.commit('LOGIN_SUCCESS', {
        user: JSON.parse(localStorage.getItem('user')),
        accessToken
      });
    }
  }
};
</script>

<style>

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
