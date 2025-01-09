<template>
  <div class="profile-page">
    <!-- Estado de carga con animación -->
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando tu perfil...</p>
    </div>

    <!-- Mensaje de error estilizado -->
    <div v-else-if="error" class="error-container">
      <i class="fas fa-exclamation-circle"></i>
      <p>{{ error }}</p>
    </div>

    <!-- Contenido principal -->
    <div v-else class="profile-content">
      <DetailsUser :user="userProfile" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import DetailsUser from "@/components/profile/DetailsUser.vue";
import Constant from '@/Constant';

export default {
  name: "ProfilePage",
  components: {
    DetailsUser,
  },
  setup() {
    const store = useStore();
    const userProfile = computed(() => store.state.profile.userProfile);
    const isLoading = computed(() => store.state.profile.loading);
    const error = computed(() => store.state.profile.error);

    onMounted(() => {
      store.dispatch(`profile/${Constant.FETCH_USER_PROFILE}`);
    });

    return {
      userProfile,
      isLoading,
      error,
    };
  },
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-container i {
  font-size: 3rem;
  color: #e74c3c;
  margin-bottom: 1rem;
}

.error-container p {
  color: #2c3e50;
  font-size: 1.1rem;
}

.profile-content {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .profile-page {
    padding: 20px;
  }
}
</style>
