<template>
  <div class="details-user">
    <div v-if="user" class="user-profile-container">
      <div class="profile-header">
        <div class="profile-image">
          <img :src="randomProfileImage" alt="Profile Picture">
          <div class="profile-status" :class="{ 'online': isOnline }"></div>
        </div>
        <div class="profile-name">
          <h2>{{ user.name }}</h2>
          <span class="user-roles">{{ user.roles.join(', ') }}</span>
          <p class="user-bio">{{ userBio }}</p>
        </div>
        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-value">{{ sessionsCount }}</span>
            <span class="stat-label">Sesiones</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ athletesCount }}</span>
            <span class="stat-label">Atletas</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ achievementsCount }}</span>
            <span class="stat-label">Logros</span>
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="info-section">
          <h3>Información Personal</h3>
          <div class="info-card">
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <div class="info-content">
                <label>Email</label>
                <p>{{ user.email }}</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-calendar-alt"></i>
              <div class="info-content">
                <label>Miembro desde</label>
                <p>{{ formattedCreatedAt }}</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <div class="info-content">
                <label>Instalación</label>
                <p>{{ location }}</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-running"></i>
              <div class="info-content">
                <label>Especialidad</label>
                <p>{{ department }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="info-section">
          <h3>Especialidades Deportivas</h3>
          <div class="skills-container">
            <span v-for="skill in skills" :key="skill" class="skill-tag">{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading-state">
      <div class="spinner"></div>
      <p>Cargando detalles del perfil...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsUser",
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      randomProfileImage: 'https://picsum.photos/400',
      isOnline: true,
      userBio: "Entrenador deportivo especializado en tecnificación de alto rendimiento. Experto en metodologías avanzadas de entrenamiento y desarrollo atlético.",
      sessionsCount: 342,
      athletesCount: 89,
      achievementsCount: 156,
      location: "Polideportivo Municipal Las Rozas",
      department: "Tecnificación Deportiva",
      skills: [
        "Fútbol", "Baloncesto", "Atletismo", "Natación", "Tenis", 
        "Preparación Física", "Nutrición Deportiva", "Psicología Deportiva", "Rehabilitación", "Biomecánica"
      ]
    }
  },
  computed: {
    formattedCreatedAt() {
      return this.user && this.user.createdAt
        ? new Date(this.user.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : 'Fecha no disponible';
    },
  },
};
</script>

<style scoped>
.details-user {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px;
}

.user-profile-container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
}

.profile-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 2px solid #eef2f7;
  margin-bottom: 3rem;
}

.profile-image {
  position: relative;
}

.profile-image img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #ffffff;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.profile-image img:hover {
  transform: scale(1.05);
}

.profile-status {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid white;
}

.profile-status.online {
  background-color: #2ecc71;
}

.profile-name {
  align-self: center;
}

.profile-name h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.user-roles {
  color: #666;
  font-size: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  display: inline-block;
  margin-bottom: 1rem;
}

.user-bio {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.profile-stats {
  display: flex;
  gap: 2rem;
  align-self: center;
}

.stat-item {
  text-align: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-value {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
}

.stat-label {
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.info-section {
  margin-bottom: 2rem;
}

.info-section h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.info-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.info-item i {
  font-size: 1.4rem;
  color: #667eea;
  width: 24px;
  text-align: center;
}

.info-content label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.4rem;
}

.info-content p {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 500;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.skill-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.skill-tag:hover {
  transform: translateY(-2px);
}

.loading-state {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 1024px) {
  .profile-header {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .profile-image {
    justify-self: center;
  }
  
  .profile-stats {
    justify-content: center;
  }
  
  .details-user {
    padding: 20px;
  }
  
  .user-profile-container {
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .stat-item {
    padding: 0.8rem 1.5rem;
  }
  
  .profile-name h2 {
    font-size: 2rem;
  }
  
  .info-card {
    grid-template-columns: 1fr;
  }
}
</style>
