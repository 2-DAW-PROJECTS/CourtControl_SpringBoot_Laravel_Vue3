<template>
  <div class="list-content">
    <div class="header-section">
      <br><br><br>
      <h2>Nuestras Pistas Deportivas</h2>
      <p class="subtitle">Descubre y reserva las mejores instalaciones deportivas</p>
    </div>

    <!-- Si no hay pistas, mostramos un mensaje -->
    <div v-if="courts.length === 0" class="no-courts">
      <i class="fas fa-exclamation-circle"></i>
      <p>No hay pistas disponibles en este momento.</p>
    </div>

    <!-- Mostrar las pistas disponibles -->
    <div class="courts-grid" v-if="courts.length > 0">
      <div v-for="court in paginatedCourts" :key="court.id" class="court-card">
        <div class="court-image">
          <img
            v-if="court.img"
            :src="require('@/assets/img_courts/' + court.typePista + '.jpg')"
            :alt="court.namePista"
            class="court-img"
          />
        </div>
        <div class="court-info">
          <span class="badge">{{ court.tagCourt }}</span>
          <h3>{{ court.namePista }}</h3>
          <div class="court-details">
            <p><i class="fas fa-ruler-combined"></i> Dimensiones: {{ court.ancho }} metros</p>
            <p><i class="fas fa-layer-group"></i> Superficie: {{ court.typePista.split('_')[1].toUpperCase() }}</p>
            <p><i class="fas fa-clock"></i> Disponibilidad: 24/7</p>
            <p class="description"><i class="fas fa-star"></i> {{ court.description }}</p>
          </div>
          <button class="reserve-btn">Reservar Ahora</button>
        </div>
      </div>
    </div>

    <!-- Controles de paginación -->
    <div class="pagination-controls" v-if="courts.length > 0">
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
import axios from 'axios';

export default {
  name: "ListContent",
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      courts: [],
      filteredCourts: [],
      currentPage: 1,
      itemsPerPage: 3,
    };
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.applyFilters(newFilters);
      },
      deep: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredCourts.length / this.itemsPerPage);
    },
    paginatedCourts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCourts.slice(start, end);
    },
  },
  mounted() {
    this.fetchCourts();
  },
  methods: {
    async fetchCourts() {
      try {
        const sportQuery = Array.isArray(this.filters.sport) && this.filters.sport.length > 0
          ? this.filters.sport.join(',')
          : '';

        const response = await axios.get(`http://localhost:8085/api/courts`, {
          params: {
            sportIds: sportQuery,
            category: this.filters.category,
          },
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          this.courts = response.data;
          this.applyFilters(this.filters);  // Filtrar las pistas
        } else {
          console.error('Error fetching courts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching courts:', error);
      }
    },
    applyFilters(filters) {
      this.filteredCourts = this.courts.filter((court) => {
        const matchesSport = filters.sport && filters.sport.length > 0
          ? court.sportId === parseInt(filters.sport[0])
          : true;

        return matchesSport;
      });

      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

/* Estilo general */
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

/* Estilo para la cuadrícula de las pistas */
.courts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.court-card {
  background: #2a2a2a;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 6px 18px rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.1);
}

.court-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(46, 204, 113, 0.25);
  border-color: rgba(46, 204, 113, 0.3);
}

/* Estilo de la imagen de la pista */
.court-image {
  height: 200px;
  overflow: hidden;
}

.court-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.court-card:hover .court-img {
  transform: scale(1.08);
}

/* Estilo de la información de la pista */
.court-info {
  padding: 1.8rem;
}

.court-info h3 {
  font-family: 'Russo One', sans-serif;
  color: #2ecc71;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.court-details {
  margin-bottom: 1.5rem;
}

.badge {
  font-family: 'Russo One', sans-serif;
  background: #2ecc71;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.2);
}

.description {
  color: #b0b0b0;
  line-height: 1.6;
}

/* Estilo para el botón de reserva */
.reserve-btn {
  font-family: 'Russo One', sans-serif;
  width: 100%;
  padding: 1rem;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.2);
}

.reserve-btn:hover {
  background: #27ae60;
  box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
  transform: translateY(-2px);
}

/* Estilo cuando no hay pistas disponibles */
.no-courts {
  text-align: center;
  padding: 3rem;
  background: #2a2a2a;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.1);
}

.no-courts i {
  font-size: 3rem;
  color: #2ecc71;
  margin-bottom: 1rem;
}

.no-courts p {
  font-family: 'Russo One', sans-serif;
  font-size: 1.2rem;
  color: #b0b0b0;
}

/* Estilos para la paginación */
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
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn:disabled {
  background: #1a1a1a;
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-btn:not(:disabled):hover {
  background: #27ae60;
  transform: translateY(-2px);
}

.page-info {
  font-family: 'Russo One', sans-serif;
  color: #e0e0e0;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .courts-grid {
    grid-template-columns: 1fr;
  }
  
  .header-section h2 {
    font-size: 2rem;
  }

  .pagination-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>