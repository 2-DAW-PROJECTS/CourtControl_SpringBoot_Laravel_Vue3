<template>
  <div class="filters">
    <div class="filter-group">
      <div class="dropdown">
        <button class="dropdown-btn" @click="toggleDropdown">
          <span>Filtrar por</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="dropdown-content" :class="{ 'show': isOpen }">
          <div class="filter-section">
            <h4>Categorías</h4>
            <label class="radio-container">
              <input type="radio" v-model="filters.category" value="pistas" @change="handleCategoryChange" />
              <span class="radio-mark"></span>
              <span class="radio-text">Pistas</span>
            </label>
            <label class="radio-container">
              <input type="radio" v-model="filters.category" value="tecnificaciones" @change="handleCategoryChange" />
              <span class="radio-mark"></span>
              <span class="radio-text">Tecnificaciones</span>
            </label>
            <label class="radio-container">
              <input type="radio" v-model="filters.category" value="academias" @change="handleCategoryChange" />
              <span class="radio-mark"></span>
              <span class="radio-text">Academias de Verano</span>
            </label>
          </div>
        </div>
      </div>

      <select v-model="selectedSport" class="sport-select" @change="updateSportFilter">
        <option value="" disabled selected>Seleccione deporte</option>
        <option value="1">Volei</option>
        <option value="2">Basket</option>
    </select>

      <!-- Filtro de material dinámico -->
      <select v-if="filters.category === 'pistas'" v-model="selectedMaterial" class="sport-select" @change="updateMaterialFilter">
        <option value="" disabled selected>Seleccione material</option>
        <option v-for="(material, index) in materials" :key="index" :value="material">
          {{ material }}
        </option>
      </select>

      <button class="clear-filters" @click="clearFilters">Limpiar Filtros</button>
    </div>
  </div>
</template>


<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Constant from '../../Constant';

export default {
  name: "ShopFilters",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();

    const isOpen = ref(false);
    const selectedSport = ref(route.query.sport ? route.query.sport[0] : "");
    const selectedMaterial = ref("");

    const filters = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });

    const materials = computed(() => store.state.materials.materials);
    const loading = computed(() => store.state.materials.loading);
    const error = computed(() => store.state.materials.error);

    const initializeMaterial = async (sportId = null) => {
      await store.dispatch(`materials/${Constant.INITIALIZE_MATERIAL}`, sportId);
    };

    const updateSportFilter = async () => {
      await initializeMaterial(selectedSport.value);
      emit("update:modelValue", {
        ...filters.value,
        sport: selectedSport.value ? [selectedSport.value] : [],
      });
    };

    const updateMaterialFilter = () => {
      emit("update:modelValue", {
        ...filters.value,
        material: selectedMaterial.value,
      });
    };

    const clearFilters = () => {
      emit("update:modelValue", {
        ...filters.value,
        category: 'pistas',
        sport: [],
        material: "",
        search: "",
      });
      selectedSport.value = "";
      selectedMaterial.value = "";
      initializeMaterial();
    };

    const handleCategoryChange = () => {
      emit("update:modelValue", filters.value);
      window.location.reload();
    };

    watch(() => route.query, (query) => {
      if (query.category) {
        emit("update:modelValue", {
          ...props.modelValue,
          category: query.category
        });
      }
      if (query.sport) {
        selectedSport.value = query.sport[0];
        updateSportFilter();
      }
    }, { immediate: true });

    onMounted(async () => {
      if (route.query.sport) {
        await initializeMaterial(route.query.sport[0]);
      } else {
        await initializeMaterial();
      }
      
      if (route.query.category) {
        emit("update:modelValue", {
          ...props.modelValue,
          category: route.query.category
        });
      }
    });

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      isOpen,
      selectedSport,
      selectedMaterial,
      filters,
      materials,
      loading,
      error,
      toggleDropdown,
      updateSportFilter,
      updateMaterialFilter,
      clearFilters,
      handleCategoryChange,
    };
  }
};
</script>
<!-- <script>
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Constant from '../../Constant';

export default {
  name: "ShopFilters",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();

    
    const isOpen = ref(false);
    const selectedSport = ref(route.query.sport ? route.query.sport[0] : "");
    const selectedMaterial = ref("");

    const filters = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });

    const materials = computed(() => store.state.materials.materials);
    const loading = computed(() => store.state.materials.loading);
    const error = computed(() => store.state.materials.error);

    const initializeMaterial = async (sportId = null) => {
      await store.dispatch(`materials/${Constant.INITIALIZE_MATERIAL}`, sportId);
    };

    const updateSportFilter = async () => {
      await initializeMaterial(selectedSport.value);
      emit("update:modelValue", {
        ...filters.value,
        sport: selectedSport.value ? [selectedSport.value] : [],
      });
    };

    watch(() => route.query, (query) => {
      if (query.category) {
        emit("update:modelValue", {
          ...props.modelValue,
          category: query.category
        });
      }
      if (query.sport) {
        selectedSport.value = query.sport[0];
        updateSportFilter();
      }
    }, { immediate: true });

    onMounted(async () => {
      if (route.query.sport) {
        await initializeMaterial(route.query.sport[0]);
      } else {
        await initializeMaterial();
      }
      
      if (route.query.category) {
        emit("update:modelValue", {
          ...props.modelValue,
          category: route.query.category
        });
      }
    });

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const updateMaterialFilter = () => {
      emit("update:modelValue", {
        ...filters.value,
        material: selectedMaterial.value,
      });
    };

    const clearFilters = () => {
      emit("update:modelValue", {
        ...filters.value,
        category: 'pistas',
        sport: [],
        material: "",
        search: "",
      });
      selectedSport.value = "";
      selectedMaterial.value = "";
      initializeMaterial();
    };

    const handleCategoryChange = () => {
      emit("update:modelValue", filters.value);
      window.location.reload();
    };

    return {
      isOpen,
      selectedSport,
      selectedMaterial,
      filters,
      materials,
      loading,
      error,
      toggleDropdown,
      updateSportFilter,
      updateMaterialFilter,
      clearFilters,
      handleCategoryChange,
    };
  }
};
</script> -->





<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

.filters {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background-color: rgba(35, 35, 47, 0.8);
  padding: 0px 20px;
  backdrop-filter: blur(10px);
  z-index: 999;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

.filter-group {
  display: flex;
  gap: 20px;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 15px 0;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  font-family: 'Russo One', sans-serif;
  background-color: #92d8be;
  color: #23232f;
  padding: 12px 25px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(146, 216, 190, 0.2);
}

.dropdown-btn:hover {
  background-color: #9bada1;
  transform: translateY(-2px);
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgba(35, 35, 47, 0.95);
  min-width: 250px;
  box-shadow: 0 8px 20px rgba(146, 216, 190, 0.2);
  border-radius: 15px;
  padding: 15px;
  z-index: 1;
  margin-top: 10px;
  border: 1px solid rgba(146, 216, 190, 0.2);
}

.dropdown-content.show {
  display: block;
}

.filter-section {
  padding: 15px 0;
  border-bottom: 1px solid rgba(146, 216, 190, 0.2);
}

.filter-section h4 {
  font-family: 'Russo One', sans-serif;
  margin: 0 0 15px 0;
  color: #92d8be;
  font-size: 1.1rem;
  font-weight: 600;
}

.radio-container {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 0;
  margin: 5px 0;
  color: #f6f1de;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.radio-container input[type="radio"] {
  display: none;
}

.radio-mark {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 2px solid #92d8be;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.radio-mark::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 10px;
  height: 10px;
  background-color: #92d8be;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.radio-container input[type="radio"]:checked + .radio-mark::after {
  transform: translate(-50%, -50%) scale(1);
}

.radio-container:hover {
  color: #92d8be;
}

.radio-container:hover .radio-mark {
  border-color: #9bada1;
  box-shadow: 0 0 5px rgba(146, 216, 190, 0.3);
}

.radio-text {
  font-family: 'Russo One', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

.sport-select {
  font-family: 'Russo One', sans-serif;
  padding: 12px 25px;
  border: 2px solid #92d8be;
  border-radius: 12px;
  font-size: 1rem;
  color: #f6f1de;
  background-color: rgba(35, 35, 47, 0.95);
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  min-width: 200px;
  box-shadow: 0 4px 15px rgba(146, 216, 190, 0.1);
}

.sport-select:hover {
  border-color: #9bada1;
  transform: translateY(-2px);
}

.sport-select:focus {
  border-color: #9bada1;
  box-shadow: 0 0 0 2px rgba(146, 216, 190, 0.2);
}

.sport-select option {
  background-color: #525055;
  color: #f6f1de;
  padding: 12px;
}

.clear-filters {
  font-family: 'Russo One', sans-serif;
  background-color: rgba(35, 35, 47, 0.95);
  color: #92d8be;
  border: 2px solid #92d8be;
  padding: 12px 25px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(146, 216, 190, 0.1);
}

.clear-filters:hover {
  background-color: #92d8be;
  color: #23232f;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(146, 216, 190, 0.2);
}

@media (max-width: 1024px) {
  .filter-group {
    gap: 15px;
  }
  
  .dropdown-btn,
  .sport-select,
  .clear-filters {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .sport-select {
    min-width: 180px;
  }
}

@media (max-width: 768px) {
  .filter-group {
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px 0;
  }

  .dropdown,
  .sport-select,
  .clear-filters {
    width: calc(50% - 10px);
  }

  .dropdown-content {
    width: 100%;
    min-width: unset;
  }
}

@media (max-width: 480px) {
  .filters {
    top: 60px;
    padding: 10px;
  }

  .filter-group {
    flex-direction: column;
    gap: 10px;
  }

  .dropdown,
  .sport-select,
  .clear-filters {
    width: 100%;
  }

  .dropdown-btn,
  .sport-select,
  .clear-filters {
    width: 100%;
    padding: 8px 15px;
    font-size: 0.85rem;
  }

  .radio-text {
    font-size: 0.9rem;
  }
}
</style>
