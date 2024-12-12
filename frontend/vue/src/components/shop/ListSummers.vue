<template>
  <div class="list-content">
    <!-- <div class="header-section">
      <br><br><br>
      <h2>Elite Sports Academy</h2>
      <p class="subtitle">Formación deportiva de alto rendimiento para jóvenes talentos</p>
    </div> -->
    <br><br><br>
    <br><br><br>
    <br><br>

    <!-- Mostrar cargando -->
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Cargando programas...</p>
    </div>

    <!-- Si no hay programas disponibles -->
    <div v-if="!loading && filteredSummers.length === 0" class="no-lessons">
      <i class="fas fa-exclamation-circle"></i>
      <p>No hay programas disponibles en este momento.</p>
    </div>

    <!-- Mostrar programas disponibles -->
    <div class="summers-grid" v-if="!loading && filteredSummers.length > 0">
      <div v-for="summer in paginatedSummers" :key="summer.id" class="summer-card">

        <div class="summer-image">
          <span class="badge-right" :class="{ 'active-badge': summer.isActive, 'inactive-badge': !summer.isActive }">
            {{ summer.isActive ? 'Open' : 'Closed' }}
          </span> 
          <div class="image-overlay">
            <button class="reserve-btn-overlay" @click="goToDetails(summer.id)">¡Inscríbete Ahora!</button>
          </div>
          <!-- Aquí usamos require para cargar la imagen -->
          <img :src="require(`@/assets/img_summer/${summer.img}`)" :alt="summer.nameSummer" class="summer-img" />
        </div>

        <div class="summer-info">
          <div class="summer-header">
            <h3>{{ summer.nameSummer }}</h3>
          </div>
          <br>
          <div class="details-grid">
            <div class="detail-item hover-effect">
              <i class="fas fa-child"></i>
              <span>Edades:</span>
              <strong>{{ summer.categoryAge }}</strong>
            </div>
            <div class="detail-item hover-effect">
              <i class="fas fa-calendar-alt"></i>
              <span>Inicio:</span>
              <strong>{{ formatDate(summer.startDate) }}</strong>
            </div>
            <div class="detail-item hover-effect">
              <i class="fas fa-flag-checkered"></i>
              <span>Finalización:</span>
              <strong>{{ formatDate(summer.endDate) }}</strong>
            </div>
            <div class="detail-item hover-effect">
              <i class="fas fa-users-cog"></i>
              <span>Capacidad:</span>
              <strong>{{ summer.maxParticipants }}</strong>
            </div>
          </div>
          <div class="description-box hover-effect">
            <i class="fas fa-star"></i>
            <p class="description">{{ summer.description }}</p>
          </div>
          <br>
          <div class="activities-box hover-effect">
            <details class="activities">
              <summary><i class="fas fa-dumbbell"></i> Actividades</summary>
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

    <!-- Controles de paginación -->
    <div class="pagination-controls" v-if="!loading && filteredSummers.length > 0">
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
  name: "ListSummers",
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
    filteredSummers() {
      return this.data.filter((summer) => {
        const matchesSport = this.filters.sport && this.filters.sport.length > 0
          ? summer.idSport === parseInt(this.filters.sport[0])
          : true;
        return matchesSport;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredSummers.length / this.itemsPerPage);
    },
    paginatedSummers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredSummers.slice(start, end);
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
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("es-ES", options);
    },

    goToDetails(id) {
      this.$router.push({ name: 'SummerDetails', params: { id } });
    }
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
  .pagination-controls {
    flex-direction: column;
    gap: 1rem;
  }
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

.summers-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
.badge-right {
  position: absolute;
  padding: 0.5rem 1rem;
  background-color: #111111;
  color: #ffffff;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 10px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  border: 2px solid transparent;
  z-index: 100;
  float: left;
  font-family: Russo One, 'sans-serif';
  text-align: center;
}


.active-badge {
  background: #42cd67;
  color: #000000;
  font-weight: bolder;
  letter-spacing: 5px;
}

.inactive-badge {
  background: #de7b7b;
  color: #ffffff;
  font-weight: bolder;
  font-size: 1.5rem;
  transform: rotate(-45deg);
  padding: 1rem 2rem;
  position: absolute;
  letter-spacing: 0.5cap;
  top: 44%;
  left: 49%;
  transform-origin: center;
  transform: translate(-50%, -50%) rotate(-45deg);
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

.summer-card {
  display: flex;
  background: #222222;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  border: 1px solid #333333;
  width: 80%;
  min-height: 400px;
  margin: 0 auto;
}

.summer-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.8);
}

.summer-image {
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

.summer-image:hover .image-overlay {
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

.summer-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.summer-card:hover .summer-img {
  transform: scale(1.1);
}

.summer-info {
  flex: 1;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
}

.summer-header h3 {
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
}

.description {
  color: #999999;
  line-height: 1.6;
  margin: 0;
}

.activities-box {
  background: rgba(86, 204, 242, 0.05);
  padding: 1rem;
  border-radius: 6px;
}

.activities summary {
  font-family: 'Roboto Slab', serif;
  color: #56ccf2;
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
  color: #cccccc;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.activities li:hover {
  color: #56ccf2;
}

.activities li i {
  color: #56ccf2;
}

@media (max-width: 768px) {
  .summer-card {
    flex-direction: column;
  }

  .header-section {
    margin-top: 250px;
    padding: 3rem 1rem;
  }

  .summer-image {
    flex: 0 0 300px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>