<!-- Template section remains the same -->
<template>
  <div class="list-content">
    <!-- <div class="header-section">
      <br><br><br>
      <h2>Nuestras Pistas Deportivas</h2>
      <p class="subtitle">Descubre y reserva las mejores instalaciones deportivas</p>
    </div> -->
    <br><br><br><br><br><br><br><br><br>
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import Constant from '@/Constant';

export default {
  name: "ListContent",
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const listContentRef = ref(null);
    const filteredCourts = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 3;

    const courts = computed(() => store.state.courts.courts);
    const loading = computed(() => store.state.courts.loading);
    const error = computed(() => store.state.courts.error);

    const totalPages = computed(() => {
      return filteredCourts.value ? Math.ceil(filteredCourts.value.length / itemsPerPage) : 0;
    });

    const paginatedCourts = computed(() => {
      if (!filteredCourts.value) return [];
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredCourts.value.slice(start, end);
    });

    const fetchCourts = async () => {
      try {
        await store.dispatch(`courts/${Constant.INITIALIZE_COURTS}`, props.filters);
        applyFilters(props.filters);
      } catch (error) {
        console.error('Error fetching courts:', error);
      }
    };

    const applyFilters = (filters) => {
      if (!courts.value) return;
      filteredCourts.value = courts.value.filter((court) => {
        // Your existing filter logic
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
      currentPage.value = 1;
    };

    const changePage = (direction) => {
      if (direction === 1 && currentPage.value < totalPages.value) {
        currentPage.value++;
      } else if (direction === -1 && currentPage.value > 1) {
        currentPage.value--;
      }
    };

    watch(() => props.filters, (newFilters) => {
      applyFilters(newFilters);
    }, { deep: true });

    onMounted(() => {
      fetchCourts();
    });

    onUnmounted(() => {
      // Clean up any event listeners or timers if necessary
    });

    return {
      listContentRef,
      filteredCourts,
      currentPage,
      totalPages,
      paginatedCourts,
      loading,
      error,
      courts,
      itemsPerPage,
      fetchCourts,
      applyFilters,
      changePage
    };
  }
};
</script>
<!-- 
<script>
import { mapState, mapActions } from 'vuex';

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
      filteredCourts: [],
      currentPage: 1,
      itemsPerPage: 3,
      loading: false,
    };
  },
  computed: {
    ...mapState('courts', ['courts']),
    totalPages() {
      return Math.ceil(this.filteredCourts.length / this.itemsPerPage);
    },
    paginatedCourts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCourts.slice(start, end);
    },
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.applyFilters(newFilters);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('courts', ['INITIALIZE_COURTS', 'updateFilters']),
    
    async fetchCourts() {
      this.loading = true;
      try {
        await this.INITIALIZE_COURTS(this.filters);
        this.applyFilters(this.filters);
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
  mounted() {
    this.fetchCourts();
  },
};
</script>  -->



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

.courts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
  animation: fadeIn 0.6s ease-in-out;
}

.court-card {
  background: #222222;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  border: 1px solid #333333;
}

.court-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.8);
}

.court-image {
  height: 240px;
  overflow: hidden;
}

.court-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.court-card:hover .court-img {
  transform: scale(1.1);
}

.court-info {
  padding: 1.5rem;
}

/* .badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #111111;
  color: #ffffff;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-transform: uppercase;
} */
.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #111111; /* Fondo negro */
  color: #ffffff; /* Texto blanco */
  border-radius: 6px; /* Bordes redondeados */
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-transform: uppercase;
  border: 2px solid transparent; /* Borde transparente para aplicar el gradiente */
  border-image: linear-gradient(to right, #f6f1de, #23232f, #525055, #92d8be, #9bada1, #f5ce8d, #fc9b70, #eb6a65);
  border-image-slice: 1; /* Aplica el gradiente completo */
}



.court-info h3 {
  font-family: 'Roboto Slab', serif;
  font-size: 1.75rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: 700;
}

.court-details {
  margin-bottom: 1.5rem;
}

.court-details p {
  margin: 0.75rem 0;
  color: #cccccc;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.court-details i {
  color: #56ccf2;
  font-size: 1.25rem;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #999999;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #444444;
}

.reserve-btn {
  width: 100%;
  padding: 1rem;
  background-color: #111111;
  color: #56ccf2;
  border: 2px solid #56ccf2;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-transform: uppercase;
}

.reserve-btn:hover {
  background-color: #3f4344;
  color: #ffffff;
  transform: translateY(-3px);
}

.no-courts {
  text-align: center;
  padding: 3rem;
  background: #222222;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  margin: 2rem auto;
  max-width: 600px;
}

.no-courts i {
  font-size: 3.5rem;
  color: #56ccf2;
  margin-bottom: 1rem;
}

.no-courts p {
  color: #cccccc;
  font-size: 1.2rem;
  font-weight: 500;
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

.pagination-btn:hover:not(:disabled) {
  background-color: #333333;
  border-color: #56ccf2;
}

.pagination-btn:disabled {
  background-color: #444444;
  cursor: not-allowed;
  opacity: 0.7;
}

.page-info {
  color: #cccccc;
  font-size: 0.95rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .header-section {
    padding: 3rem 1rem;
    margin-top: 250px;
  }

  .header-section h2 {
    font-size: 2.5rem;
  }

  .courts-grid {
    grid-template-columns: 1fr;
    padding: 0 0.5rem;
  }

  .pagination-controls {
    flex-direction: column;
    gap: 1rem;
  }

  .court-card {
    margin: 0 0.5rem;
  }
}

@media (min-width: 1400px) {
  .courts-grid {
    grid-template-columns: repeat(3, 1fr);
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