<template>
    <div class="list-content">
        <div class="header-section">
            <br><br><br>
            <h2 class="title">Nuestras Instalaciones Deportivas</h2>
            <p class="subtitle">Descubre espacios excepcionales para tu pasión deportiva</p>
        </div>

        <div class="courts-grid">
            <div v-for="court in courts" :key="court.id" class="sports-card">
                <div class="image-section">
                    <div class="image-overlay">
                        <button class="reserve-btn-overlay" @click="handleReservation(court.id)">
                            Reservar Instalación
                        </button>
                    </div>
                    <img 
                        v-if="court.img"
                        :src="require('@/assets/img_courts/' + court.typePista + '.jpg')"
                        :alt="court.namePista"
                        class="img-responsive"
                    />
                </div>
                <div class="content-section">
                    <div class="court-header">
                        <h3 class="title">{{ court.namePista }}</h3>
                        <span class="tag">{{ court.tagCourt }}</span>
                    </div>
                    <div class="details-grid">
                        <div class="detail-item">
                            <i class="fas fa-ruler-combined"></i>
                            <span>Dimensiones:</span>
                            <strong>{{ court.ancho }}</strong>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-layer-group"></i>
                            <span>Material:</span>
                            <strong>{{ court.material }}</strong>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-tag"></i>
                            <span>Tipo:</span>
                            <strong>{{ court.typePista }}</strong>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-hashtag"></i>
                            <span>ID Pista:</span>
                            <strong>{{ court.id }}</strong>
                        </div>
                    </div>
                    <div class="description">
                        <i class="fas fa-info-circle"></i>
                        <p>{{ court.description }}</p>
                    </div>
                    <button class="reserve-btn" @click="handleReservation(court.id)">
                        <i class="fas fa-calendar-check"></i>
                        Reservar Ahora
                    </button>
                </div>
            </div>

            <div ref="loadMoreTrigger" class="loading">
                <div v-if="isLoading" class="loader">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Cargando más instalaciones...</span>
                </div>
                <span v-if="isComplete" class="complete-message">
                    <i class="fas fa-check-circle"></i>
                    Has visto todas las instalaciones
                </span>
                <span v-if="hasError" class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    Error al cargar las instalaciones
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    export default {
        name: 'InfiniteScrollCourts',

        setup() {
            const courts = ref([]);
            const loadMoreTrigger = ref(null);
            const isLoading = ref(false);
            const isComplete = ref(false);
            const hasError = ref(false);
            const observer = ref(null);
            const page = ref(1);
            const limit = 6;
            const loadedCourtIds = ref(new Set());

            const loadNextCourt = async () => {
                if (isComplete.value || isLoading.value) return;
                
                try {
                    isLoading.value = true;
                    const response = await axios.get(`http://localhost:8085/api/courts?page=${page.value}&limit=${limit}`);
                    
                    if (response.data && response.data.length > 0) {
                        const newCourts = response.data.filter(court => !loadedCourtIds.value.has(court.id));
                        
                        if (newCourts.length > 0) {
                            newCourts.forEach(court => loadedCourtIds.value.add(court.id));
                            courts.value.push(...newCourts);
                            page.value += 1;
                        } else {
                            isComplete.value = true;
                            if (observer.value) observer.value.disconnect();
                        }
                    } else {
                        isComplete.value = true;
                        if (observer.value) observer.value.disconnect();
                    }
                } catch (error) {
                    isComplete.value = true;
                    hasError.value = true;
                    if (observer.value) observer.value.disconnect();
                } finally {
                    isLoading.value = false;
                }
            };

            onMounted(() => {
                observer.value = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting && !isLoading.value && !isComplete.value) {
                        loadNextCourt();
                    }
                }, {
                    threshold: 0.5,
                    rootMargin: '100px'
                });

                if (loadMoreTrigger.value) {
                    observer.value.observe(loadMoreTrigger.value);
                }
            });

            const handleReservation = (courtId) => {
                console.log(`Iniciando reserva para la pista ${courtId}`);
            };

            return {
                courts,
                loadMoreTrigger,
                isLoading,
                isComplete,
                hasError,
                handleReservation
            };
        }
    };
</script>

<style scoped>
.list-content {
    padding: 2rem;
    background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
    min-height: 100vh;
    color: #f0f0f0;
}

.header-section {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem 0;
}

.header-section .title {
    font-size: 3.5rem;
    background: linear-gradient(45deg, #ff6f61, #ff8f70);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
    font-size: 1.6rem;
    color: #e0e0e0;
    line-height: 1.8;
    font-weight: 400;
}

.courts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 3rem;
    padding: 2rem;
    max-width: 1600px;
    margin: 0 auto;
}

.sports-card {
    background: linear-gradient(165deg, #1e1e1e, #2a2a2a);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
}

.sports-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.image-section {
    position: relative;
    overflow: hidden;
    height: 300px;
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.5s ease;
    backdrop-filter: blur(4px);
}

.image-section:hover .image-overlay {
    opacity: 1;
}

.reserve-btn-overlay {
    background: linear-gradient(145deg, #ff6f61, #ff8a75);
    color: #fff;
    border: none;
    padding: 1.2rem 2.5rem;
    cursor: pointer;
    border-radius: 30px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(255, 111, 97, 0.4);
}

.reserve-btn-overlay:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 111, 97, 0.5);
}

.img-responsive {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.image-section:hover .img-responsive {
    transform: scale(1.15);
}

.content-section {
    padding: 2rem;
}

.court-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.court-header .title {
    font-size: 2rem;
    color: #ff6f61;
    font-weight: 700;
    letter-spacing: 1px;
}

.tag {
    background: linear-gradient(45deg, #ff6f61, #ff8f70);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
}

.details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin: 1.8rem 0;
}

.detail-item {
    display: flex;
    align-items: center;
    color: #e0e0e0;
    font-size: 1.1rem;
    font-weight: 500;
}

.detail-item i {
    margin-right: 1rem;
    color: #ff6f61;
    font-size: 1.3rem;
}

.description {
    margin: 1.8rem 0;
    color: #e0e0e0;
    line-height: 1.8;
    font-size: 1.1rem;
    font-weight: 400;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
}

.reserve-btn {
    width: 100%;
    background: linear-gradient(145deg, #ff6f61, #ff8a75);
    color: #fff;
    border: none;
    padding: 1rem;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

.reserve-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 111, 97, 0.4);
}

.loading {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
}

.loader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: #ff6f61;
}

.complete-message, .error-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    color: #e0e0e0;
}

.complete-message i {
    color: #4CAF50;
}

.error-message i {
    color: #f44336;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.fa-spinner {
    animation: spin 1s linear infinite;
}

@media (max-width: 768px) {
    .courts-grid {
        grid-template-columns: 1fr;
    }
    
    .header-section .title {
        font-size: 2.5rem;
    }
    
    .subtitle {
        font-size: 1.2rem;
    }
}
</style>
