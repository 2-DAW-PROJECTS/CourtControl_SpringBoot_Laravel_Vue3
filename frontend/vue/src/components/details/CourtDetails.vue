<template>
    <br><br>
    <div class="court-details-container" v-if="court">
        <!-- Header -->
        <div class="court-header">
            <h1>{{ court.namePista }}</h1>
            <span class="sport-tag">{{ court.tagCourt }}</span>
        </div>

        <!-- Content -->
        <div class="court-content">
            <!-- Left Column: Image -->
            <div class="court-image">
                <img 
                    :src="require('@/assets/img_courts/' + court.typePista + '.jpg')"
                    :alt="court.namePista"
                />
            </div>

            <!-- Right Column: Info and Description -->
            <div class="info-section">
                <h3>Características</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span>Dimensiones:</span>
                        <strong>{{ court.ancho }}</strong>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-layer-group"></i>
                        <span>Superficie:</span>
                        <strong>{{ court.typePista.split('_')[1].toUpperCase() }}</strong>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-tools"></i>
                        <span>Material:</span>
                        <strong>{{ court.material }}</strong>
                    </div>
                </div>
            </div>

            <div class="description-section">
                <h3>Descripción</h3>
                <p>{{ court.description }}</p>
                <button class="reserve-button">
                    <i class="fas fa-calendar-plus"></i>
                    Reservar Ahora
                </button>
            </div>
        </div>
    </div>

    <!-- Loading Section -->
    <div v-else class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        Cargando detalles...
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Constant from '@/Constant';

export default {
    name: 'CourtDetails',
    setup() {
        const store = useStore();
        const route = useRoute();
        const court = ref(null);

        onMounted(async () => {
            const courtId = route.params.id;
            console.log('Court ID:', courtId);
            await store.dispatch(`courts/${Constant.FETCH_COURT_BY_ID}`, courtId);
            court.value = store.getters['courts/currentCourt'];
            console.log('Court Data:', court.value);
        });

        return { court };
    },
};
</script>

<style scoped>
/* General Reset and Font Imports */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@300;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    color: #333;
    background-color: #f9f9f9;
    line-height: 1.6;
}

/* Main Container */
.court-details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 40px auto;
    overflow: hidden;
}

/* Header Section */
.court-header {
    text-align: center;
    margin-bottom: 20px;
}

.court-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    font-weight: 700;
    margin-bottom: 10px;
}

.sport-tag {
    display: inline-block;
    background-color: #3498db;
    color: #fff;
    padding: 8px 20px;
    border-radius: 20px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.9rem;
}

/* Content Section */
.court-content {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    gap: 20px;
    width: 100%;
    justify-content: space-between;
}

.court-image img {
    width: 60%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Info Section */
.info-section {
    flex: 1 1 300px;
    background-color: #f0f4f8;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-section h3 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 15px;
    font-weight: 700;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-item i {
    font-size: 1.5rem;
    color: #3498db;
}

.info-item span {
    font-size: 1rem;
    font-weight: 600;
    color: #34495e;
}

/* Description Section */
.description-section {
    flex: 1 1 300px;
    background: #ecf0f1;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.description-section h3 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 15px;
    font-weight: 700;
}

.description-section p {
    font-size: 1rem;
    color: #7f8c8d;
    line-height: 1.8;
}

/* Reserve Button */
.reserve-button {
    display: inline-block;
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.reserve-button:hover {
    background-color: #c0392b;
}

/* Responsive Design */
@media (max-width: 768px) {
    .court-content {
        flex-direction: column;
        align-items: center;
    }

    .info-section,
    .description-section {
        width: 100%;
    }

    .court-header h1 {
        font-size: 2rem;
    }
}
</style>