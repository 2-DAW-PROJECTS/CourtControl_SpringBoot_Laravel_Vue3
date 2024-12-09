    <template>
        <br><br><br><br>
        <div class="lesson-details-container" v-if="lesson">

            <!-- Back Button -->
            <button class="back-button" @click="goBack">
                <font-awesome-icon :icon="['fas', 'backward']" /> Volver
            </button>

            <!-- Header -->
            <div class="lesson-header">
                <h1>{{ lesson.nameClass }}</h1>
                <span class="level-tag">{{ lesson.level }}</span>
            </div>

            <!-- Content -->
            <div class="lesson-content">
                <!-- Left Column: Image -->
                <div class="lesson-image">
                    <img 
                        :src="require('@/assets/img_lessons/' + lesson.img)"
                        :alt="lesson.nameClass"
                    />
                </div>

                <!-- Right Column: Info and Description -->
                <div class="info-section">
                    <h3>Características</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Días:</span>
                            <strong>{{ lesson.days }}</strong>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <span>Duración:</span>
                            <strong>{{ lesson.duration }} minutos</strong>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-user"></i>
                            <span>Coach:</span>
                            <strong>{{ lesson.coach }}</strong>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-users"></i>
                            <span>Capacidad Máxima:</span>
                            <strong>{{ lesson.maxCapacity }}</strong>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Costo Base:</span>
                            <strong>{{ lesson.baseCost }} €</strong>
                        </div>
                    </div>
                </div>

                <div class="description-section">
                    <h3>Descripción</h3>
                    <p>{{ lesson.description }}</p>
                    <button class="reserve-button" :disabled="!lesson.active">
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
    import { useRoute, useRouter } from 'vue-router';
    import Constant from '@/Constant';

    export default {
        name: 'LessonDetails',
        setup() {
            const store = useStore();
            const route = useRoute();
            const router = useRouter();
            const lesson = ref(null);

            onMounted(async () => {
                const lessonId = route.params.id;
                await store.dispatch(`lessons/${Constant.FETCH_LESSON_BY_ID}`, lessonId);
                lesson.value = store.getters['lessons/currentLesson'];
            });

            const goBack = () => {
                router.back();
            };

            return { lesson, goBack };
        },
    };
    </script>

    <style scoped>
    /* General Reset and Font Imports */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@300;600&display=swap');


    /* Main Container */
    .lesson-details-container {
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
    .lesson-header {
        text-align: center;
        margin-bottom: 20px;
    }

    .lesson-header h1 {
        font-size: 2.5rem;
        color: #2c3e50;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .level-tag {
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
    .lesson-content {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        gap: 20px;
        width: 100%;
        justify-content: space-between;
        
        justify-content: center;
        align-items: center;
    }

    .lesson-image img {
        width: 60%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    /* .lesson-image {
        flex: 1 1 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    } */







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

    .reserve-button:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
    }

    .reserve-button:hover:not(:disabled) {
        background-color: #c0392b;
    }

    @media (max-width: 768px) {
        .lesson-content {
            flex-direction: column;
            align-items: center;
        }

        .info-section,
        .description-section {
            width: 100%;
        }

        .lesson-header h1 {
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