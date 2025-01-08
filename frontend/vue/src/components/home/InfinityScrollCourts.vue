<template>
        <div class="list-content">
        <div class="header-section">
            <br><br><br>
            <h2 class="title">Nuestras Instalaciones Deportivas</h2>
            <p class="subtitle">Espacios de alto rendimiento para tu desarrollo deportivo</p>
        </div>
    
        <div class="pin"><img src="" alt=""></div>
        <div class="courts-grid">
            <div v-for="court in courts" :key="court.id" class="sports-card" @click="goToDetails(court.id)">
                <!-- <p>{{ court }}</p> -->
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
                <h3 class="title">{{ court.namePista }}</h3>
                </div>
                <div class="details-grid">
                <div class="detail-item">
                    <i class="fas fa-ruler-combined"></i>
                    <span>Dimensiones:</span>
                    <strong> {{ court.ancho }}</strong>
                </div>
                <div class="detail-item">
                    <i class="fas fa-users"></i>
                    <span>Deporte Oficial:</span>
                    <strong> {{ court.tagCourt }}</strong>
                </div>
                <div class="detail-item">
                    <i class="fas fa-euro-sign"></i>
                    <span>Precio/Hora:</span>
                    <strong> {{ court.priceHour }}€</strong>
                </div>
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>Material:</span>
                    <strong> {{ court.material }}</strong>
                </div>
                </div>
                <div class="description">
                <i class="fas fa-info-circle"></i>
                <p> {{ court.description }}</p>
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
        import { useStore } from 'vuex';
        import { useRouter } from 'vue-router';
        import { useIntersectionObserver } from '@vueuse/core';
        
        export default {
            name: 'InfiniteScrollCourts',
            
            setup() {
                const store = useStore();
                const router = useRouter();
                const courts = ref([]);
                const currentPage = ref(1);
                const loadMoreTrigger = ref(null);
                const isLoading = ref(false);
                const isComplete = ref(false);  
                const hasError = ref(false);
                const stopObserver = ref(false);

                // const loadNextCourt = async () => {
                //     if (isComplete.value || isLoading.value || stopObserver.value) return;

                //     try {
                //         isLoading.value = true;
                //         await store.dispatch('courts/INITIALIZE_COURTS', { 
                //             page: currentPage.value,
                //             perPage: 3 // Set to load 2 courts at a time
                //         });
                //         const storeCourts = store.getters['courts/allCourts'];

                //         if (storeCourts.length > courts.value.length) {
                //             // Add the new courts
                //             const newCourts = storeCourts.filter(court => !courts.value.some(c => c.id === court.id));
                //             if (newCourts.length > 0) {
                //                 courts.value.push(...newCourts);
                //                 currentPage.value++;
                //             } else {
                //                 isComplete.value = true;
                //                 stopObserver.value = true;
                //             }
                //         } else {
                //             isComplete.value = true;
                //             stopObserver.value = true;
                //         }
                //     } catch (error) {
                //         hasError.value = true;
                //         stopObserver.value = true;
                //     } finally {
                //         isLoading.value = false;
                //     }                
                // };
    const loadNextCourt = async () => {
        if (isComplete.value || isLoading.value || stopObserver.value) return;

        try {
            isLoading.value = true;

            await store.dispatch('courts/INITIALIZE_COURTS', {
                page: currentPage.value,
                perPage: 3,
            });

            const storeCourts = store.getters['courts/allCourts'];
            const newCourts = storeCourts.slice(
                (currentPage.value - 1) * 3, 
                currentPage.value * 3
            );

            if (newCourts.length > 0) {
                courts.value.push(...newCourts); 
                currentPage.value++;
            } else {
                isComplete.value = true; 
                stopObserver.value = true;
            }
        } catch (error) {
            hasError.value = true;
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
                        threshold: 1,
                        rootMargin: '25px'
                    }
                );
            
                watch(stopObserver, (newValue) => {
                    if (newValue && observer) {
                        observer.stop();
                    }
                });
                const goToDetails = (courtId) => {
                    console.log(`Navigating to court details with ID: ${courtId}`);
                    router.push({ name: 'CourtDetails', params: { id: courtId } });
                };
            
                return {
                    courts,
                    loadMoreTrigger,
                    isLoading,
                    isComplete,
                    hasError,
                    handleReservation: (courtId) => {
                        console.log(`Reservando la pista ${courtId}`);
                    },
                    goToDetails
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
        background-clip: text;
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
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 2rem;
    max-width: 1600px;
    margin: 0 auto;
}

.sports-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    justify-self: center;
    max-width: 50%;
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
    
    .court-header .title {
        font-size: 2rem;
        color: #ff6f61;
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
    
    .loading {
        text-align: center;
        color: #e0e0e0;
        padding: 2rem;
        font-size: 1.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    
    .loading i {
        color: #ff6f61;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
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
    
