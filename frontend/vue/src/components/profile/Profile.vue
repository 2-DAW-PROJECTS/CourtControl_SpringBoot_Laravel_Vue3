<template>
    <div class="profile">
      <h1>Perfil del Usuario</h1>
      <div v-if="loading">Cargando información...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <p><strong>ID:</strong> {{ profile.id }}</p>
        <p><strong>Nombre:</strong> {{ profile.name }}</p>
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Roles:</strong> {{ profile.roles.join(', ') }}</p>
        <p><strong>Fecha de Creación:</strong> {{ profile.createdAt }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { onMounted, ref, computed } from 'vue';
  
  export default {
    name: 'Profile',
    setup() {
      const store = useStore();
      const profile = ref(null);
      const loading = ref(true);
      const error = ref(null);
  
      const accessToken = computed(() => store.getters['auth/getAccessToken']);
  
      const fetchProfile = async () => {
        try {
          const response = await fetch('http://localhost:8085/api/users/profile', {
            headers: {
              Authorization: `Bearer ${accessToken.value}`,
            },
          });
          if (!response.ok) throw new Error('Error al obtener la información del perfil');
          profile.value = await response.json();
        } catch (err) {
          error.value = err.message;
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(() => {
        fetchProfile();
      });
  
      return {
        profile,
        loading,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  .profile {
    padding: 20px;
  }
  </style>
  