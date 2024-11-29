<template>
  <div class="shop">
    <!-- Filtros -->
    <ShopFilters v-model="filters" />

    <!-- Contenido basado en el filtro -->
    <div v-if="loading">Cargando...</div>

    <!-- Seleccionamos dinámicamente el componente según la categoría -->
    <component
      v-if="!loading"
      :is="getComponentByCategory(filters.category)"
      :data="filteredData"
      :filters="filters"
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
        category: "pistas", // Iniciar con "pistas"
        sport: null, // El deporte inicialmente no está seleccionado
        search: "", // Búsqueda por defecto vacía

      },
      data: [],
      loading: false,
    };
  },
  created() {
    const sport = this.$route.query.sport;
    if (sport) {
      this.filters.sport = sport;
    }
  },
  computed: {
    filteredData() {
      return this.data;
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
    "filters.category"(newCategory) {
      if (newCategory !== "pistas") {
        this.filters.sport = null;
      }
    },
  },
  mounted() {
    this.initializeFilters();
  },
  methods: {
    getComponentByCategory(category) {
      switch (category) {
        case "pistas":
          return "ListContent";
        case "tecnificaciones":
          return "ListLessons";
        case "academias":
          return "ListSummers";
        default:
          return null;
      }
    },

    updateURL(filters) {
      const queryParams = new URLSearchParams();

      if (filters.category) {
        queryParams.append("category", filters.category);
      }

      if (filters.sport) {
        queryParams.append("sportIds", filters.sport);
      }

      if (filters.search) {
        queryParams.append("search", filters.search);
      }

      history.replaceState(null, "", `?${queryParams.toString()}`);
    },

    initializeFilters() {
      const params = new URLSearchParams(window.location.search);
      if (params.has("category")) {
        this.filters.category = params.get("category") || "pistas";
      }
      if (params.has("sportIds")) {
        this.filters.sport = params.get("sportIds").split(",") || null;
      }
      if (params.has("search")) {
        this.filters.search = params.get("search");
      }

      this.fetchData(this.filters);
    },

    async fetchData(filters) {
      this.loading = true;
      try {
        let url = "http://localhost:8085/api/lessons";
        let params = {};

        if (filters.sport) {
          params.sportIds = filters.sport;
        }

        if (filters.category === "academias") {
          url = "http://localhost:8085/api/summers";
        }

        if (filters.search) {
          params.search = filters.search; // Filtrar por término de búsqueda
        }

        const response = await axios.get(url, { params });
        this.data = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },
  },};
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
