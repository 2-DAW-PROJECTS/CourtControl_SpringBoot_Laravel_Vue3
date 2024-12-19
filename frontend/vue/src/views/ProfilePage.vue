<template>
  <div class="profile-page">
    <h1>Este es tu perfil</h1>

    <!-- Muestra un mensaje de carga mientras los datos están siendo recuperados -->
    <div v-if="isLoading">Cargando...</div>

    <!-- Muestra un mensaje de error si ocurre algún problema -->
    <div v-else-if="error">{{ error }}</div>

    <!-- Muestra el componente DetailsUser solo si los datos están disponibles -->
    <div v-else>
      <DetailsUser :user="userProfile" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DetailsUser from "@/components/profile/DetailsUser.vue";

export default {
  name: "ProfilePage",
  components: {
    DetailsUser,
  },
  computed: {
    // Usando mapState con el namespace 'client/profile' para acceder a los datos
    ...mapState('client/profile', ['userProfile', 'loading', 'error']),
    isLoading() {
      return this.loading;  // Se utiliza la propiedad 'loading' de Vuex para determinar si los datos están siendo cargados
    },
  },
  methods: {
    // Usando mapActions con el namespace 'client/profile' para acceder a la acción de cargar el perfil
    ...mapActions('client/profile', ['loadUserProfile']),
  },
  mounted() {
    console.log('Cargando perfil...');
    this.loadUserProfile();  // Llamamos a la acción para cargar el perfil cuando el componente se monta
  },
};
</script>

<style scoped>
.profile-page {
  padding: 20px;
}
</style>
