<template>
  <div class="shop">
    <!-- Filtros -->
    <ShopFilters v-model="filters" />

    <!-- Contenido basado en el filtro -->
    <div v-if="loading">Cargando...</div>

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
      },
      data: [],
      loading: false,
    };
  },
  computed: {
    filteredData() {
      return this.data; // Aquí no aplicamos más filtros, solo retornamos los datos obtenidos del backend
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

    // Actualizar la URL con los filtros seleccionados
    updateURL(filters) {
      const queryParams = new URLSearchParams();

      // Aseguramos de agregar el filtro de categoría
      if (filters.category) {
        queryParams.append("category", filters.category);
      }

      // Si se selecciona un deporte, lo añadimos a los parámetros
      if (filters.sport) {
        queryParams.append("sportIds", filters.sport);  // sportIds=valor
      }

      // Actualizamos la URL sin recargar la página
      history.replaceState(null, "", `?${queryParams.toString()}`);
    },

    // Inicializar los filtros a partir de la URL (si existen)
    initializeFilters() {
      const params = new URLSearchParams(window.location.search);
      this.filters.category = params.get("category") || "pistas";  // Por defecto "pistas"
      this.filters.sport = params.get("sportIds") || null;  // Deporte seleccionado (si existe)
      this.fetchData(this.filters);  // Hacer la consulta inicial
    },

    // Obtener los datos del backend basados en los filtros seleccionados
    async fetchData(filters) {
      this.loading = true;
      try {
        let url = "http://localhost:8085/api/lessons"; // URL base de la API
        let params = {};

        // Si se selecciona un deporte, lo pasamos en los parámetros de la API
        if (filters.sport) {
          params.sportIds = filters.sport; // sportIds=valor (sin el array)
        }

        // Hacer la solicitud a la API con los parámetros
        const response = await axios.get(url, { params });
        this.data = response.data; // Asignar los datos obtenidos al array data
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
