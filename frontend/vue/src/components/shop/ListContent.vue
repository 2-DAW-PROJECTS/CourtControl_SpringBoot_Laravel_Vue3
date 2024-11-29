<template>
  <div class="list-content">
    <div class="header-section">
      <br><br><br>
      <h2>Nuestras Pistas Deportivas</h2>
      <p class="subtitle">Descubre y reserva las mejores instalaciones deportivas</p>
    </div>

    <div v-if="courts.length === 0" class="no-courts">
      <i class="fas fa-exclamation-circle"></i>
      <p>No hay pistas disponibles en este momento.</p>
    </div>

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
      loading: false,
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
      this.loading = true;
      try {
        const sportQuery = Array.isArray(this.filters.sport) && this.filters.sport.length > 0
          ? this.filters.sport.join(',')
          : '';
        const response = await axios.get(`http://localhost:8085/api/courts`, {
          params: {
            sportIds: sportQuery,
            material: this.filters.material,
            category: this.filters.category,
            search: this.filters.search,
          },
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        if (response.status === 200) {
          this.courts = response.data;
          this.applyFilters(this.filters);
        } else {
          console.error('Error fetching courts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching courts:', error);
      } finally {
        this.loading = false;
      }
    },
    applyFilters(filters) {
      this.filteredCourts = this.courts.filter((court) => {
        const matchesSport = filters.sport && filters.sport.length > 0
          ? filters.sport.includes(court.sportId.toString())
          : true;
        const matchesMaterial = filters.material
          ? court.material === filters.material
          : true;
        const matchesSearch = filters.search
          ? (court.namePista && court.namePista.toLowerCase().includes(filters.search.toLowerCase())) ||
            (court.tagCourt && court.tagCourt.toLowerCase().includes(filters.search.toLowerCase()))
          : true;
        return matchesSport && matchesMaterial && matchesSearch;
      });
      this.currentPage = 1;
    },
  },
};
</script>


<style scoped>
/* usa esta gama de colores y hazlo mucho mas bonito:
#f6f1de
#23232f
#525055
#92d8be
#9bada1
#f5ce8d
#fc9b70
#eb6a65 */
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

/* Estilo general */
.list-content {
  padding: 2.5rem;
  background: linear-gradient(to bottom, #23232f, #2a2a38);
  min-height: 100vh;
  color: #ffffff;
}

.header-section {
  text-align: center;
  margin-bottom: 3.5rem;
  padding: 2.5rem 0;
  background: linear-gradient(135deg, #92d8be, #9bada1, #92d8be);
  color: #23232f;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(146, 216, 190, 0.3);
  position: relative;
  overflow: hidden;
}

.header-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1));
  pointer-events: none;
}

.header-section h2 {
  font-family: 'Russo One', sans-serif;
  font-size: 3rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
}

.subtitle {
  font-family: 'Russo One', sans-serif;
  font-size: 1.3rem;
  opacity: 0.95;
  letter-spacing: 1px;
}

/* Estilo para la cuadrícula de las pistas */
.courts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  padding: 1.5rem;
}

.court-card {
  background: linear-gradient(145deg, #525055, #474749);
  border-radius: 25px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(146, 216, 190, 0.15);
  position: relative;
}

.court-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 15px 35px rgba(146, 216, 190, 0.3);
  border-color: rgba(146, 216, 190, 0.4);
}

/* Estilo de la imagen de la pista */
.court-image {
  height: 250px;
  overflow: hidden;
  position: relative;
}

.court-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.court-card:hover .court-img {
  transform: scale(1.1);
}

/* Estilo de la información de la pista */
.court-info {
  padding: 2rem;
  position: relative;
}

.court-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(146, 216, 190, 0.3), transparent);
}

.court-info h3 {
  font-family: 'Russo One', sans-serif;
  color: #f5ce8d;
  font-size: 1.7rem;
  margin-bottom: 1.2rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.court-details {
  margin-bottom: 1.8rem;
}

.badge {
  font-family: 'Russo One', sans-serif;
  background: linear-gradient(135deg, #92d8be, #9bada1);
  color: #23232f;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  display: inline-block;
  margin-bottom: 1.2rem;
  box-shadow: 0 5px 15px rgba(146, 216, 190, 0.3);
  transition: all 0.3s ease;
}

.badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(146, 216, 190, 0.4);
}

.description {
  color: #f6f1de;
  line-height: 1.8;
  font-size: 1.1rem;
}

/* Estilo para el botón de reserva */
.reserve-btn {
  font-family: 'Russo One', sans-serif;
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #fc9b70, #eb6a65);
  color: #23232f;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(252, 155, 112, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.reserve-btn:hover {
  background: linear-gradient(135deg, #eb6a65, #fc9b70);
  box-shadow: 0 8px 25px rgba(235, 106, 101, 0.5);
  transform: translateY(-3px);
}

/* Estilo cuando no hay pistas disponibles */
.no-courts {
  text-align: center;
  padding: 4rem;
  background: linear-gradient(145deg, #525055, #474749);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(146, 216, 190, 0.15);
  margin: 2rem auto;
  max-width: 600px;
}

.no-courts i {
  font-size: 4rem;
  color: #92d8be;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px rgba(146, 216, 190, 0.5);
}

.no-courts p {
  font-family: 'Russo One', sans-serif;
  font-size: 1.4rem;
  color: #f6f1de;
  line-height: 1.6;
}

/* Estilos para la paginación */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  gap: 1.5rem;
  padding: 1rem;
}

.pagination-btn {
  font-family: 'Russo One', sans-serif;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #9bada1, #92d8be);
  color: #23232f;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(146, 216, 190, 0.2);
}

.pagination-btn:disabled {
  background: linear-gradient(135deg, #525055, #474749);
  cursor: not-allowed;
  opacity: 0.6;
}

.pagination-btn:not(:disabled):hover {
  background: linear-gradient(135deg, #92d8be, #9bada1);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(146, 216, 190, 0.4);
}

.page-info {
  font-family: 'Russo One', sans-serif;
  color: #f6f1de;
  font-size: 1.2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .courts-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .header-section h2 {
    font-size: 2.2rem;
  }

  .pagination-controls {
    flex-direction: column;
    gap: 1rem;
  }

  .court-card {
    margin: 0 1rem;
  }

  .court-info h3 {
    font-size: 1.5rem;
  }
}

@media (min-width: 1400px) {
  .courts-grid {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}
</style>