    <template>
        <div class="list-content">
            <div class="header-section">
                <br><br><br>
                <h2 class="title">Nuestras Instalaciones Deportivas</h2>
                <p class="subtitle">Espacios de alto rendimiento para tu desarrollo deportivo</p>
            </div>
    
            <!-- Loading state -->
            <div v-if="loading" class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Cargando instalaciones...</p>
            </div>
    
            <!-- No courts available -->
            <div v-if="!loading && courts.length === 0" class="no-lessons">
                <i class="fas fa-exclamation-circle"></i>
                <p>No hay instalaciones disponibles en este momento.</p>
            </div>
    
            <!-- Display available courts -->
            <!-- <div class="courts-grid" v-if="!loading && courts.length > 0">
                <div v-for="court in courts" :key="court.id" class="sports-card"> -->
            <div class="courts-grid" v-if="!loading && courts.length > 0">
                <div v-for="court in courts" :key="court.id" class="court-card">
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
            </div>
    
            <div ref="loadMore" class="load-more-trigger" v-if="!loading && hasMorePages">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Cargando más instalaciones...</p>
                </div>
            </div>
        </div>
    </template>

    <script>
    import axios from 'axios';

    export default {
        name: 'InfiniteScrollCourts',
        data() {
            return {
                courts: [],
                currentPage: 1,
                loading: false,
                totalPages: 1,
                pageSize: 3
            };
        },
        computed: {
            hasMorePages() {
            return this.currentPage <= this.totalPages;
            }
        },
        mounted() {
            this.fetchCourts();
            this.createObserver();
        },
        methods: {
            async fetchCourts() {
                if (this.loading || !this.hasMorePages) return;
                
                this.loading = true;
                try {
                    const response = await axios.get(`http://localhost:8085/api/courts`, {
                    params: {
                        page: this.currentPage,
                        size: this.pageSize
                    }
                    });
                    
                    this.courts = [...this.courts, ...response.data];
                    this.totalPages = Math.ceil(response.data.length / this.pageSize);
                    this.currentPage++;
                } catch (error) {
                    console.error('Error fetching courts:', error);
                } finally {
                    this.loading = false;
                }
            },
            createObserver() {
                const options = {
                    root: null,
                    rootMargin: '100px',
                    threshold: 0.1
                };
                
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting && !this.loading) {
                    this.fetchCourts();
                    }
                }, options);
                
                this.$nextTick(() => {
                    if (this.$refs.loadMore) {
                    observer.observe(this.$refs.loadMore);
                    }
                });
            
            }
        }
    };
    </script>

    <style scoped>
    .list-content {
        padding: 1.7rem;
        background-color: #1a1a1a;
    }

    .header-section {
        text-align: center;
        margin-bottom: 2rem;
    }

    .header-section .title {
        font-size: 2.5rem;
        color: #ff4d4d;
        margin-bottom: 1rem;
    }

    .subtitle {
        font-size: 1.2rem;
        color: #e0e0e0;
    }

    .courts-grid {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 1rem;
    }

    .sports-card {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1.7rem;
        background-color: #2d2d2d;
        border-radius: 0.85rem;
        padding: 1.7rem;
        box-shadow: 0 6.8px 17px rgba(0, 0, 0, 0.6);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .image-section {
        flex: 1;
        position: relative;
    }

    .img-responsive {
        max-width: 100%;
        height: auto;
        border-radius: 0.85rem;
        box-shadow: 0 5.1px 12.75px rgba(0, 0, 0, 0.5);
    }

    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 0.85rem;
    }

    .image-section:hover .image-overlay {
        opacity: 1;
    }

    .reserve-btn-overlay {
        padding: 1rem 2rem;
        background-color: #ff4d4d;
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: bold;
        transition: transform 0.3s ease;
    }

    .reserve-btn-overlay:hover {
        transform: scale(1.1);
    }

    .content-section {
        flex: 1;
        color: #e0e0e0;
    }

    .details-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin: 1rem 0;
    }

    .detail-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background-color: #3d3d3d;
        border-radius: 0.5rem;
        transition: transform 0.3s ease;
    }

    .detail-item:hover {
        transform: translateY(-5px);
    }

    .description {
        margin-top: 1rem;
        line-height: 1.6;
    }

    .loading {
        text-align: center;
        padding: 2rem;
        color: #e0e0e0;
    }

    .load-more-trigger {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2rem 0;
    }

    .loading-spinner {
        text-align: center;
        color: #92d8be;
    }

    .no-lessons {
        text-align: center;
        padding: 2rem;
        color: #e0e0e0;
    }

    @media (max-width: 768px) {
        .sports-card {
            flex-direction: column;
        }

        .details-grid {
            grid-template-columns: 1fr;
        }
    }
    </style>
