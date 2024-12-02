    <template>
        <div class="list-content">
        <div class="header-section">
            <br><br><br>
            <h2 class="title">Nuestras Instalaciones Deportivas</h2>
            <p class="subtitle">Espacios de alto rendimiento para tu desarrollo deportivo</p>
        </div>
    
        <div class="courts-grid">
            <div v-for="court in courts" :key="court.id" class="sports-card">
            <div class="image-section">
                <div class="image-overlay">
                <button class="reserve-btn-overlay" @click="handleReservation(court.id)">
                    ¡Reservar Ahora!
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
                <h3 class="title">{{ court.nameCourt }}</h3>
                </div>
                <div class="details-grid">
                <div class="detail-item">
                    <i class="fas fa-ruler-combined"></i>
                    <span>Dimensiones:</span>
                    <strong>{{ court.dimensions }}</strong>
                </div>
                <div class="detail-item">
                    <i class="fas fa-users"></i>
                    <span>Capacidad:</span>
                    <strong>{{ court.capacity }}</strong>
                </div>
                <div class="detail-item">
                    <i class="fas fa-euro-sign"></i>
                    <span>Precio/Hora:</span>
                    <strong>{{ court.priceHour }}€</strong>
                </div>
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>Disponibilidad:</span>
                    <strong>{{ court.schedule }}</strong>
                </div>
                </div>
                <div class="description">
                <i class="fas fa-info-circle"></i>
                <p>{{ court.description }}</p>
                </div>
            </div>
            </div>
    
            <div ref="loadMoreTrigger" class="loading">
            <span v-if="isLoading">Cargando más instalaciones...</span>
            <span v-if="isComplete">No hay más instalaciones</span>
            <span v-if="hasError">Error al cargar las instalaciones</span>
            </div>
        </div>
        </div>
    </template>
    
    <script>
        import { ref, watch } from 'vue';
        import { useIntersectionObserver } from '@vueuse/core';
        import axios from 'axios';
        
        export default {
        name: 'InfiniteScrollCourts',
        
        setup() {
            const courts = ref([]);
            const currentPage = ref(1);
            const loadMoreTrigger = ref(null);
            const isLoading = ref(false);
            const isComplete = ref(false);
            const hasError = ref(false);
            const stopObserver = ref(false);
        
            const loadNextCourt = async () => {
                if (isComplete.value || isLoading.value || stopObserver.value) return;
                
                try {
                    isLoading.value = true;
            
                    const response = await axios.get(`http://localhost:8085/api/courts/${currentPage.value}`);
            
                    if (response.data) {
                    courts.value.push(response.data);
                    currentPage.value += 1;
                    } else {
                    isComplete.value = true;
                    stopObserver.value = true;
                    }
                } catch (error) {
                    isComplete.value = true;
                    stopObserver.value = true;
                } finally {
                    isLoading.value = false;
                }
            };
        
            const observer = useIntersectionObserver(
                loadMoreTrigger,
                ([{ isIntersecting }]) => {
                    if (isIntersecting && !stopObserver.value && !isLoading.value) {
                    loadNextCourt();
                    }
                },
                { 
                    threshold: 1.0,
                    rootMargin: '50px'
                }
            );
        
            watch(stopObserver, (newValue) => {
                if (newValue && observer) {
                    observer.stop();
                }
            });
        
            return {
                courts,
                loadMoreTrigger,
                isLoading,
                isComplete,
                hasError,
                handleReservation: (courtId) => {
                    console.log(`Reservando la pista ${courtId}`);
                }
            };
        }
        };
    </script>
          <style scoped>
          .list-content {
              padding: 2rem;
              background-color: #121212;
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
              color: #ff6f61;
              margin-bottom: 1.5rem;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 3px;
              text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
          }

          .subtitle {
              font-size: 1.6rem;
              color: #e0e0e0;
              line-height: 1.8;
              font-weight: 400;
          }

          .courts-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 3rem;
              padding: 2rem;
              max-width: 1400px;
              margin: 0 auto;
          }

          .sports-card {
              background: linear-gradient(165deg, #1e1e1e, #2a2a2a);
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
              transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
          }

          .sports-card:hover {
              transform: translateY(-10px);
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          }

          .image-section {
              position: relative;
              overflow: hidden;
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
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              backdrop-filter: blur(4px);
          }

          .image-section:hover .image-overlay {
              opacity: 1;
          }

          .reserve-btn-overlay {
              background: linear-gradient(145deg, #ff6f61, #ff8a75);
              color: #fff;
              border: none;
              padding: 1rem 2rem;
              cursor: pointer;
              border-radius: 30px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              box-shadow: 0 6px 20px rgba(255, 111, 97, 0.4);
          }

          .reserve-btn-overlay:hover {
              transform: scale(1.1);
              box-shadow: 0 8px 25px rgba(255, 111, 97, 0.5);
          }

          .img-responsive {
              width: 100%;
              height: 300px;
              object-fit: cover;
              transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .image-section:hover .img-responsive {
              transform: scale(1.15);
          }

          .content-section {
              padding: 2rem;
          }

          .court-header .title {
              font-size: 2rem;
              color: #ff6f61;
              margin-bottom: 1.2rem;
              font-weight: 700;
              letter-spacing: 1px;
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
              font-size: 1.2rem;
              font-weight: 500;
          }

          .detail-item i {
              margin-right: 1rem;
              color: #ff6f61;
              font-size: 1.4rem;
          }

          .description {
              margin-top: 1.8rem;
              color: #e0e0e0;
              line-height: 1.8;
              font-size: 1.2rem;
              font-weight: 400;
          }

          .loading {
              text-align: center;
              color: #e0e0e0;
              padding: 3rem;
              font-size: 1.4rem;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 1.5rem;
          }

          @keyframes pulse {
              0% { opacity: 0.5; transform: scale(0.95); }
              50% { opacity: 1; transform: scale(1.05); }
              100% { opacity: 0.5; transform: scale(0.95); }
          }

          .loading i {
              animation: pulse 1.8s infinite;
              color: #ff6f61;
              font-size: 1.6rem;
          }
          </style>
