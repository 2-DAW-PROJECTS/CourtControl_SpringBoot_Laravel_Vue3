<template>
  <div class="list-content">
    <div class="header-section">
      <br><br><br>
      <h2>Elite Sports Academy</h2>
      <p class="subtitle">Formación deportiva de alto rendimiento para jóvenes talentos</p>
    </div>

    <div class="summers-grid">
      <div v-for="summer in summers" :key="summer.id" class="summer-card">
        <div class="summer-image">
          <div class="image-overlay">
            <button class="reserve-btn-overlay">¡Inscríbete Ahora!</button>
          </div>
          <img :src="require(`@/assets/img_summer/${summer.img}`)" :alt="summer.nameSummer" class="summer-img"/>
        </div>
        <div class="summer-info">
          <div class="summer-header">
            <h3>{{ summer.nameSummer }}</h3>
          </div>
          <div class="details-grid">
            <div class="detail-item hover-effect">
              <i class="fas fa-trophy"></i>
              <span>Nivel:</span>
              <strong>{{ summer.categoryAge }}</strong>
            </div>
            <div class="detail-item hover-effect">
              <i class="fas fa-calendar-alt"></i>
              <span>Inicio programa:</span>
              <strong>{{ formatDate(summer.startDate) }}</strong>
            </div>
            <div class="detail-item hover-effect">
              <i class="fas fa-flag-checkered"></i>
              <span>Finalización:</span>
              <strong>{{ formatDate(summer.endDate) }}</strong>
            </div>
            <div class="detail-item hover-effect">
              <i class="fas fa-users-cog"></i>
              <span>Capacidad elite:</span>
              <strong>{{ summer.maxParticipants }}</strong>
            </div>
          </div>
          <div class="description-box hover-effect">
            <i class="fas fa-star"></i>
            <p class="description">{{ summer.description }}</p>
          </div>
          <div class="activities-box hover-effect">
            <details class="activities">
              <summary><i class="fas fa-dumbbell"></i> Programa de Alto Rendimiento</summary>
              <ul>
                <li v-for="activity in summer.activities.split(':')" :key="activity">
                  <i class="fas fa-medal"></i> {{ activity }}
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListSummers",
  data() {
    return {
      summers: [],
    };
  },
  methods: {
    fetchSummers() {
      axios
        .get("http://localhost:8085/api/summers")
        .then((response) => {
          this.summers = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los programas deportivos:", error);
        });
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("es-ES", options);
    },
  },
  mounted() {
    this.fetchSummers();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

.list-content {
  padding: 2rem;
  background-color: #1a1a1a;
  min-height: 100vh;
  color: #e0e0e0;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(46, 204, 113, 0.2);
}

.header-section h2 {
  font-family: 'Russo One', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-family: 'Russo One', sans-serif;
  font-size: 1.2rem;
  opacity: 0.9;
}

.summers-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.summer-card {
  display: flex;
  background: #2a2a2a;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 6px 18px rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.1);
  min-height: 400px;
}

.summer-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(46, 204, 113, 0.25);
  border-color: rgba(46, 204, 113, 0.3);
}

.summer-image {
  flex: 0 0 500px;
  position: relative;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.summer-image:hover .image-overlay {
  opacity: 1;
}

.reserve-btn-overlay {
  font-family: 'Russo One', sans-serif;
  padding: 1rem 2rem;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.2);
}

.reserve-btn-overlay:hover {
  background: #27ae60;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
}

.summer-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.summer-card:hover .summer-img {
  transform: scale(1.08);
}

.summer-info {
  flex: 1;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
}

.summer-header h3 {
  font-family: 'Russo One', sans-serif;
  color: #2ecc71;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(46, 204, 113, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.hover-effect {
  transition: all 0.3s ease;
}

.hover-effect:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
}

.detail-item i {
  color: #2ecc71;
  width: 20px;
}

.detail-item span {
  color: #b0b0b0;
}

.detail-item strong {
  color: #e0e0e0;
  margin-left: 0.5rem;
}

.description-box {
  background: rgba(46, 204, 113, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}

.description-box i {
  color: #2ecc71;
}

.description {
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0;
}

.activities-box {
  background: rgba(46, 204, 113, 0.05);
  padding: 1rem;
  border-radius: 8px;
}

.activities summary {
  font-family: 'Russo One', sans-serif;
  color: #2ecc71;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.activities ul {
  list-style: none;
  padding: 0.8rem 0 0 1.2rem;
  margin: 0;
}

.activities li {
  color: #b0b0b0;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.activities li:hover {
  color: #2ecc71;
}

.activities li i {
  color: #2ecc71;
}

@media (max-width: 768px) {
  .summer-card {
    flex-direction: column;
  }

  .summer-image {
    flex: 0 0 300px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
