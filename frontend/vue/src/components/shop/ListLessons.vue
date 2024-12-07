<template>
  <div class="list-content">
    <!-- <div class="header-section">
      <br><br><br>
      <h2>Nuestras Clases Deportivas</h2>
      <p class="subtitle">Descubre y únete a las mejores clases deportivas</p>
    </div> -->
    <br><br><br>      <br><br><br>      <br><br>
    <!-- Mostrar cargando -->
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Cargando clases...</p>
    </div>

    <!-- Si no hay clases disponibles -->
    <div v-if="!loading && filteredLessons.length === 0" class="no-lessons">
      <i class="fas fa-exclamation-circle"></i>
      <p>No hay clases disponibles en este momento.</p>
    </div>

    <!-- Mostrar clases disponibles -->
    <div class="lessons-grid" v-if="!loading && filteredLessons.length > 0">
      <div v-for="lesson in paginatedLessons" :key="lesson.id" class="lesson-card">
        <div class="lesson-image">
          <div class="image-overlay">
            <button class="reserve-btn-overlay">¡Inscríbete Ahora!</button>
          </div>
          <img :src="require(`@/assets/img_lessons/${lesson.img}`)" :alt="lesson.nameClass" class="lesson-img" />
        </div>
        <div class="lesson-info">
          <div class="lesson-header">
            <span class="badge" :class="{ 'active-badge': lesson.active, 'inactive-badge': !lesson.active }">
              {{ lesson.active ? 'Activo' : 'Inactivo' }}
            </span>
            <h3>{{ lesson.nameClass }}</h3>
          </div>
          <div class="lesson-details">
            <div class="details-grid">
              <div class="detail-item">
                <i class="fas fa-user-tie"></i>
                <span>Coach:</span>
                <strong>{{ lesson.coach }}</strong>
              </div>
              <div class="detail-item">
                <i class="fas fa-users"></i>
                <span>Vacantes:</span>
                <strong>{{ lesson.vacancies }}</strong>
              </div>
              <div class="detail-item">
                <i class="fas fa-calendar-alt"></i>
                <span>Días:</span>
                <strong>{{ lesson.days }}</strong>
              </div>
              <div class="detail-item">
                <i class="fas fa-clock"></i>
                <span>Hora:</span>
                <strong>{{ lesson.time }}</strong>
              </div>
              <div class="detail-item">
                <i class="fas fa-hourglass-half"></i>
                <span>Duración:</span>
                <strong>{{ lesson.duration }} minutos</strong>
              </div>
              <div class="detail-item">
                <i class="fas fa-dollar-sign"></i>
                <span>Costo:</span>
                <strong>${{ lesson.baseCost }}</strong>
              </div>
              <div class="detail-item">
                <i class="fas fa-layer-group"></i>
                <span>Nivel:</span>
                <strong>{{ lesson.level }}</strong>
              </div>
            </div>
            <div class="description-box">
              <i class="fas fa-info-circle"></i>
              <p class="description">{{ lesson.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controles de paginación -->
    <div class="pagination-controls" v-if="!loading && filteredLessons.length > 0">
      <button :disabled="currentPage === 1" @click="currentPage--" class="pagination-btn">
        <i class="fas fa-chevron-left"></i> Anterior
      </button>
      <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="currentPage++" class="pagination-btn">
        Siguiente <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListLessons",
  props: {
    data: {
      type: Array,
      required: true,
    },
    filters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      itemsPerPage: 2,
    };
  },
  computed: {
    filteredLessons() {
      return this.data.filter((lesson) => {
        const matchesSport = this.filters.sport && this.filters.sport.length > 0
          ? lesson.idSport === parseInt(this.filters.sport[0])
          : true;
        return matchesSport;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredLessons.length / this.itemsPerPage);
    },
    paginatedLessons() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredLessons.slice(start, end);
    },
  },
  watch: {
    filters: {
      handler() {
        this.currentPage = 1; // Reinicia la página cuando cambian los filtros
      },
      deep: true,
    },
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Slab:wght@400;700&display=swap');

.list-content {
  padding: 2rem;
  background-color: #f4fafd;
  min-height: 100vh;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #333333, #111111);
  color: #ffffff;
  border-bottom: 2px solid #444444;
  margin-top: 120px;
  border-radius: 12px;
}

.header-section h2 {
  font-family: 'Roboto Slab', serif;
  font-size: 3rem;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #cccccc;
  font-weight: 400;
}

.lessons-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  animation: fadeIn 0.6s ease-in-out;
}

.lesson-card {
  display: flex;
  background: #222222;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  border: 1px solid #333333;
  width: 100%;
  min-height: 400px;
}

.lesson-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.8);
}

.lesson-image {
  flex: 0 0 500px;
  height: auto;
  overflow: hidden;
  position: relative;
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

.lesson-image:hover .image-overlay {
  opacity: 1;
}

.reserve-btn-overlay {
  font-family: 'Inter', sans-serif;
  padding: 1rem 2rem;
  background: #56ccf2;
  color: #111111;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(86, 204, 242, 0.2);
}

.reserve-btn-overlay:hover {
  background: #333333;
  color: #ffffff;
  transform: scale(1.1);
}

.lesson-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.lesson-card:hover .lesson-img {
  transform: scale(1.1);
}

.lesson-info {
  flex: 1;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
}

.lesson-header {
  margin-bottom: 1.5rem;
}

.lesson-info h3 {
  font-family: 'Roboto Slab', serif;
  color: #ffffff;
  font-size: 1.75rem;
  margin-top: 0.5rem;
  font-weight: 700;
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
  background: rgba(86, 204, 242, 0.1);
  border-radius: 6px;
}

.detail-item i {
  color: #56ccf2;
  width: 20px;
}

.detail-item span {
  color: #cccccc;
}

.detail-item strong {
  color: #ffffff;
  margin-left: 0.5rem;
}

.description-box {
  background: rgba(86, 204, 242, 0.05);
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.description-box i {
  color: #56ccf2;
  margin-top: 0.2rem;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #111111;
  color: #ffffff;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-transform: uppercase;
  border: 2px solid transparent;
  /* border-image: linear-gradient(to right, #f6f1de, #23232f, #525055, #92d8be, #9bada1, #f5ce8d, #fc9b70, #eb6a65); */
  border-image-slice: 1;
}

.active-badge {
  background: #81e19a;
  color: #000000;
  font-weight: bolder;
}

.inactive-badge {
  background: #de7b7b;
  color: #ffffff;
  font-weight: bolder;
}

.description {
  color: #999999;
  line-height: 1.6;
  margin: 0;
}

.loading, .no-lessons {
  text-align: center;
  padding: 3rem;
  background: #222222;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.loading i, .no-lessons i {
  font-size: 3.5rem;
  color: #56ccf2;
  margin-bottom: 1rem;
}

.loading p, .no-lessons p {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #cccccc;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  gap: 1rem;
  padding: 1rem;
}

.pagination-btn {
  padding: 0.75rem 1.5rem;
  background-color: #222222;
  color: #56ccf2;
  border: 1px solid #444444;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn:disabled {
  background-color: #444444;
  cursor: not-allowed;
  opacity: 0.7;
}

.pagination-btn:not(:disabled):hover {
  background-color: #333333;
  border-color: #56ccf2;
}

.page-info {
  color: #cccccc;
  font-size: 0.95rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .lesson-card {
    flex-direction: column;
    height: auto;
  }

  .lesson-image {
    flex: 0 0 300px;
  }

  .header-section {
    margin-top: 250px;
    padding: 3rem 1rem;
  }

  .header-section h2 {
    font-size: 2.5rem;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .pagination-controls {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (min-width: 1400px) {
  .lessons-grid {
    max-width: 1400px;
    margin: 0 auto;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>