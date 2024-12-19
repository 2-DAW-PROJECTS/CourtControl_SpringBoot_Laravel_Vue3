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
import Constant from '@/Constant';  // Asegúrate de importar las constantes

export default {
  name: "ProfilePage",
  components: {
    DetailsUser,
  },
  computed: {
    ...mapState('profile', ['userProfile', 'loading', 'error']),
    isLoading() {
      return this.loading;  // Se utiliza la propiedad 'loading' de Vuex para determinar si los datos están siendo cargados
    },
  },
  methods: {
    ...mapActions('profile', [Constant.FETCH_USER_PROFILE]),  // Cambié a usar la constante de acción
  },
  mounted() {
    // Eliminar o comentar este console.log para ver errores directamente
    // console.log('Cargando perfil...');
    this.FETCH_USER_PROFILE();  // Llamamos a la acción con el nombre correcto
  },
};
</script>

<style scoped>
.profile-page {
  padding: 20px;
}
</style>
