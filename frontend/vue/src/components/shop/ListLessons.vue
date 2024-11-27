<template>
  <div class="list-content">
    <div class="header-section">
      <br><br><br>
      <h2>Nuestras Clases Deportivas</h2>
      <p class="subtitle">Descubre y únete a las mejores clases deportivas</p>
    </div>

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

/* usa esta gama de colores y hazlo mucho mas bonito
#f6f1de
#23232f
#525055
#92d8be
#9bada1
#f5ce8d
#fc9b70
#eb6a65 */
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

.list-content {
  padding: 2rem;
  background-color: #23232f;
  min-height: 100vh;
  color: #f6f1de;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, #92d8be, #9bada1);
  color: #23232f;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(146, 216, 190, 0.2);
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

.lessons-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.lesson-card {
  display: flex;
  background: #525055;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 6px 18px rgba(146, 216, 190, 0.1);
  border: 1px solid rgba(146, 216, 190, 0.1);
  width: 100%;
  min-height: 400px;
}

.lesson-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(146, 216, 190, 0.25);
  border-color: rgba(146, 216, 190, 0.3);
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
  background: rgba(35, 35, 47, 0.5);
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
  font-family: 'Russo One', sans-serif;
  padding: 1rem 2rem;
  background: #92d8be;
  color: #23232f;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(146, 216, 190, 0.2);
}

.reserve-btn-overlay:hover {
  background: #9bada1;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(146, 216, 190, 0.4);
}

.lesson-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.lesson-card:hover .lesson-img {
  transform: scale(1.08);
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
  font-family: 'Russo One', sans-serif;
  color: #92d8be;
  font-size: 1.5rem;
  margin-top: 0.5rem;
  font-weight: 600;
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
  background: rgba(146, 216, 190, 0.1);
  border-radius: 8px;
}

.detail-item i {
  color: #92d8be;
  width: 20px;
}

.detail-item span {
  color: #f6f1de;
}

.detail-item strong {
  color: #f6f1de;
  margin-left: 0.5rem;
}

.description-box {
  background: rgba(146, 216, 190, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.description-box i {
  color: #92d8be;
  margin-top: 0.2rem;
}

.badge {
  font-family: 'Russo One', sans-serif;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  display: inline-block;
  box-shadow: 0 4px 10px rgba(146, 216, 190, 0.2);
}

.active-badge {
  background: #92d8be;
  color: #23232f;
}

.inactive-badge {
  background: #eb6a65;
  color: #f6f1de;
}

.description {
  color: #f6f1de;
  line-height: 1.6;
  margin: 0;
}

.loading, .no-lessons {
  text-align: center;
  padding: 3rem;
  background: #525055;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(146, 216, 190, 0.1);
  border: 1px solid rgba(146, 216, 190, 0.1);
}

.loading i, .no-lessons i {
  font-size: 3rem;
  color: #92d8be;
  margin-bottom: 1rem;
}

.loading p, .no-lessons p {
  font-family: 'Russo One', sans-serif;
  font-size: 1.2rem;
  color: #f6f1de;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.pagination-btn {
  font-family: 'Russo One', sans-serif;
  padding: 0.8rem 1.5rem;
  background: #92d8be;
  color: #23232f;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn:disabled {
  background: #525055;
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-btn:not(:disabled):hover {
  background: #9bada1;
  transform: translateY(-2px);
}

.page-info {
  font-family: 'Russo One', sans-serif;
  color: #f6f1de;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .lesson-card {
    flex-direction: column;
    height: auto;
  }

  .lesson-image {
    flex: 0 0 300px;
  }

  .header-section h2 {
    font-size: 2rem;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .pagination-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>