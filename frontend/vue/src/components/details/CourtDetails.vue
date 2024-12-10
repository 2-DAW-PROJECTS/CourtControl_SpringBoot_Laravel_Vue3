<template>
    <br><br><br><br>
    <div class="court-details-container" v-if="court">
        <!-- Back Button -->
        <button class="back-button" @click="goBack">
            <font-awesome-icon :icon="['fas', 'backward']" /> Volver
        </button>

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
                <button class="reserve-button" :disabled="!court.active">
                    <i class="fas fa-calendar-plus"></i> Reservar Ahora
                </button>
            </div>
        </div>
    </div>

    <!-- Loading Section -->
    <div v-else class="loading">
        <i class="fas fa-spinner fa-spin"></i> Cargando detalles...
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Constant from '@/Constant';

export default {
    name: 'CourtDetails',
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const court = ref(null);

        onMounted(async () => {
            const courtId = route.params.id;
            await store.dispatch(`courts/${Constant.FETCH_COURT_BY_ID}`, courtId);
            court.value = store.getters['courts/currentCourt'];
        });

        const goBack = () => {
            router.back();
        };

        return { court, goBack };
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.court-details-container {
    max-width: 1400px;
    margin: 2rem auto;
    padding: 2rem;
    animation: fadeIn 1s ease-in-out;
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

.back-button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.back-button:hover {
    background: #ff4757;
    transform: scale(1.1);
}

.court-header {
    text-align: center;
    margin-bottom: 3rem;
}

.court-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-weight: 600;
    animation: bounceIn 1s ease;
}

@keyframes bounceIn {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

.sport-tag {
    background: #ff6b6b;
    color: white;
    padding: 6px 16px;
    border-radius: 50px;
    font-weight: 500;
    font-size: 0.9rem;
}

.court-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
}

.court-image {
    grid-column: 1 / 2;
}

.court-image img {
    width: 100%;
    border-radius: 10px;
    transition: transform 0.3s ease;
}

.court-image img:hover {
    transform: scale(1.05);
}

.info-section {
    grid-column: 2 / 3;
    background: #f8f9fa;
    border-radius: 10px;
    padding: 2rem;
    animation: fadeIn 1s ease-in-out;
}

.info-section h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    font-weight: 600;
}

.info-grid {
    display: grid;
    gap: 1rem;
}

.info-item {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid #e9ecef;
    transition: transform 0.3s ease;
}

.info-item:hover {
    transform: scale(1.05);
}

.info-item i {
    font-size: 1.2rem;
    color: #2c3e50;
}

.description-section {
    grid-column: 3 / 4;
    background: #f8f9fa;
    border-radius: 10px;
    padding: 2rem;
    animation: fadeIn 1s ease-in-out;
}

.description-section h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    font-weight: 600;
}

.description-section p {
    color: #495057;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1rem;
}

.reserve-button {
    width: 100%;
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    margin-top: 1.5rem;
}

.reserve-button:hover:not(:disabled) {
    background: #ff4757;
    transform: scale(1.1);
}

.reserve-button:disabled {
    background: #dee2e6;
    cursor: not-allowed;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    font-size: 1.5rem;
    color: #2c3e50;
}

@media (max-width: 1200px) {
    .court-content {
        grid-template-columns: 1fr 1fr;
    }
    .court-image {
        grid-column: 1 / 2;
    }
    .info-section {
        grid-column: 2 / 3;
    }
    .description-section {
        grid-column: 1 / 3;
    }
}

@media (max-width: 768px) {
    .court-content {
        grid-template-columns: 1fr;
    }
    .court-image, .info-section, .description-section {
        grid-column: 1 / 2;
    }
    .back-button {
        top: 80px;
        left: 20px;
        padding: 10px 20px;
    }
    .court-header h1 {
        font-size: 2rem;
    }
}
</style>
