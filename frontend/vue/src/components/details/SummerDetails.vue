    <template>
        <br><br><br><br>
        <div class="summer-details-container" v-if="summer">
            <!-- Back Button -->
            <button class="back-button" @click="goBack">
                <font-awesome-icon :icon="['fas', 'backward']" /> Volver
            </button>
            <!-- Header -->
            <div class="summer-header">
                <h1>{{ summer.nameSummer }}</h1>
                <span class="age-tag">{{ summer.categoryAge }}</span>
            </div>
            <!-- Content -->
            <div class="summer-content">
                <!-- Left Column: Image -->
                <div class="summer-image">
                    <img :src="require('@/assets/img_summer/' + summer.img)" :alt="summer.nameSummer" />
                </div>
                <!-- Right Column: Info and Description -->
                <div class="info-section">
                    <h3>Características</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Fecha de inicio:</span>
                            <strong>{{ summer.startDate }}</strong>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-calendar-check"></i>
                            <span>Fecha de fin:</span>
                            <strong>{{ summer.endDate }}</strong>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-users"></i>
                            <span>Máx. Participantes:</span>
                            <strong>{{ summer.maxParticipants }}</strong>
                        </div>
                    </div>
                </div>
                <div class="description-section">
                    <h3>Descripción</h3>
                    <p>{{ summer.description }}</p>
                    <h3>Actividades</h3>
                    <p>{{ summer.activities }}</p>
                    <button class="reserve-button" :disabled="!summer.active">
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
        name: 'SummerDetails',
        setup() {
            const store = useStore();
            const route = useRoute();
            const router = useRouter();
            const summer = ref(null);

            onMounted(async () => {
                const summerId = route.params.id;
                await store.dispatch(`summers/${Constant.FETCH_SUMMER_BY_ID}`, summerId);
                summer.value = store.getters['summers/currentSummer'];
            });

            const goBack = () => {
                router.back();
            };

            return { summer, goBack };
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
    .summer-details-container {
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
    /* Back Button */
    .back-button {
        position: absolute;
        top: 90px;
        left: 20px;
        background-color: #3498db;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        text-align: center;
        transition: background-color 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .back-button:hover {
        background-color: #2980b9;
    }
    /* Header Section */
    .summer-header {
        text-align: center;
        margin-bottom: 20px;
    }
    .summer-header h1 {
        font-size: 2.5rem;
        color: #2c3e50;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .age-tag {
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
    .summer-content {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        gap: 20px;
        width: 100%;
        justify-content: space-between;
    }
    .summer-image img {
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
    /* .description-section {
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
    } */

    .description-section {
        flex: 1 1 300px;
        background: #ffffff;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .description-section:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }
    .description-section h3 {
        font-size: 1.6rem;
        color: #34495e;
        margin-bottom: 20px;
        font-weight: 700;
        border-bottom: 2px solid #3498db;
        padding-bottom: 10px;
    }
    .description-section p {
        font-size: 1rem;
        color: #2c3e50;
        line-height: 1.8;
        margin-bottom: 15px;
        text-align: justify;
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
    .reserve-button:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
    }
    .reserve-button:hover:not(:disabled) {
        background-color: #c0392b;
    }
    @media (max-width: 768px) {
        .summer-content {
            flex-direction: column;
            align-items: center;
        }
        .info-section,
        .description-section {
            width: 100%;
        }
        .summer-header h1 {
            font-size: 2rem;
        }
        .back-button {
            top: 90px;
            left: 10px;
            padding: 8px 16px;
            font-size: 0.9rem;
        }
    }
    </style>
