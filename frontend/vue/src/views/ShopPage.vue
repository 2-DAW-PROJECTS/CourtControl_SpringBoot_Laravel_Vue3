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
        } if (params.has("sportIds")) {
          const sportIds = params.get("sportIds").split(",");
          this.filters.sport = sportIds.length === 1 && sportIds[0] === "" ? null : sportIds;
        } else {
          this.filters.sport = null;
        } if (params.has("search")) {
          this.filters.search = params.get("search");
        }
        this.fetchData(this.filters);
      },

      async fetchData(filters) {
        this.loading = true;
        
        try {
          // console.log("Filters received:", filters);
          let url = null;
          let params = {};

          if (filters.sport && filters.sport.length > 0 && filters.sport[0] !== '') {
            params.sportIds = filters.sport.join(','); // Convertir a una lista de valores separados por comas
            // console.log("Sport filter applied:", params.sportIds);
          } else {
            // console.log("No sports selected, fetching all data");
          }

          if (filters.category === "academias") {
            url = "http://localhost:8085/api/summers";
          } else if (filters.category === "tecnificaciones") {
            url = "http://localhost:8085/api/lessons";
          } else if (filters.category === "pistas") {
            url = "http://localhost:8085/api/courts";
          }

          if (filters.search) {
            params.search = filters.search;
            // console.log("Search filter applied:", params.search);
          }
          // console.log("Selected URL:", url);
          if (url) {
            // console.log("Fetching data from URL:", url, "with params:", params);
            const response = await axios.get(url, { params });
            this.data = response.data;
            // console.log("Data received:", this.data);
          } else {
            // console.log("No valid category selected, no request will be made.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          this.loading = false;
          // console.log("Loading state set to false");
        }
      }
    },
  };
</script>



<style scoped>
.shop {
  /* padding: 20px; */
  background-color: #303030;
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
