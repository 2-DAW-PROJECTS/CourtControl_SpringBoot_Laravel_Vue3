<template>
  <div class="shop">
    <!-- Filtros -->
    <ShopFilters v-model="filters" />

    <!-- Contenido basado en el filtro -->
    <div v-if="loading">Cargando...</div>
    <ListContent
      v-if="!loading && filters.category === 'pistas'"
      :data="filteredData"
      :filters="filters"
    />
    <ListLessons
      v-if="!loading && filters.category === 'tecnificaciones'"
      :data="filteredData"
    />
    <ListSummers
      v-if="!loading && filters.category === 'academias'"
      :data="filteredData"
    />
  </div>
</template>

<script>
import ShopFilters from "@/components/shop/filters.vue";
import ListContent from "@/components/shop/ListContent.vue";
import ListLessons from "@/components/shop/ListLessons.vue";
import ListSummers from "@/components/shop/ListSummers.vue";
import axios from "axios";

export default {
  name: "ShopPage",
  components: {
    ShopFilters,
    ListContent,
    ListLessons,
    ListSummers,
  },
  data() {
    return {
      filters: {
        category: "pistas",
        sport: null,
      },
      data: [],
      loading: false,
    };
  },
  computed: {
    filteredData() {
      if (!this.filters.sport && !this.filters.category) {
        return this.data;
      }

      return this.data.filter((item) => {
        const matchesCategory = this.filters.category
          ? item.category === this.filters.category
          : true;

        const matchesSport = this.filters.sport
          ? item.sportId === parseInt(this.filters.sport)
          : true;

        return matchesCategory && matchesSport;
      });
    },
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.updateURL(newFilters);
        this.fetchData(newFilters);
      },
      deep: true,
    },
  },
  mounted() {
    this.initializeFilters();
  },
  methods: {
    updateURL(filters) {
      const queryParams = new URLSearchParams();

      // Añadir solo los filtros activos
      if (filters.category) {
        queryParams.append("category", filters.category);
      }

      if (filters.sport && filters.sport.length > 0) {
        queryParams.append("sport", filters.sport[0]);
      }

      // Actualizar la URL sin recargar la página
      history.replaceState(null, "", `?${queryParams.toString()}`);
    },
    initializeFilters() {
      // Recuperar los filtros de la URL
      const params = new URLSearchParams(window.location.search);
      this.filters.category = params.get("category") || "pistas";
      this.filters.sport = params.get("sport") ? [params.get("sport")] : [];

      // Aplica los filtros y carga los datos
      this.fetchData(this.filters);
    },
  async fetchData(filters) {
    this.loading = true;
    try {
      const sportQuery = filters.sport ? filters.sport : '';
      const response = await axios.get("http://localhost:8085/api/courts", {
        params: {
          sportIds: sportQuery,
          category: filters.category,
        },
      });
      this.data = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.loading = false;
    }
  },
},
};
</script>
  
  <style scoped>
  .shop {
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
  }
  
  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  p {
    text-align: center;
    margin-bottom: 40px;
    color: #555;
  }
  </style>
  