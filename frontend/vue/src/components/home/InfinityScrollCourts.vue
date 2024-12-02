
<!-- Quiero este scroll mucho mas profesional y bonito, quiero que me cargues los datos de todas las pistas, de esta manera:
http://localhost:8085/api/courts:
donde te retornara esto:
[{"id":1,"sportId":1,"typePista":"v_playa","namePista":"Arena Premium Beach Volley","ancho":"16 x 8","material":"Playa","description":"Juega al sol con tu colega más cercano","img":"/src/assets/img_courts/v_playa.jpg","tagCourt":"Voley Playa"},{"id":2,"sportId":1,"typePista":"v_pista","namePista":"Hard Volley Supreme","ancho":"18 x 9 ","material":"Pista","description":"Pista de voleibol en pista cubierta","img":"../../assets/img_courts/v_pista.jpeg","tagCourt":"Pista Indoor"},{"id":3,"sportId":1,"typePista":"v_asfalto","namePista":"Amateur court Volley","ancho":"18 x 9 ","material":"Asfalto","description":"Pista perfecta para empezar a entrenar","img":"../../assets/img_courts/v_lija.jpg","tagCourt":"Pista Indoor"},{"id":4,"sportId":1,"typePista":"v_parquet","namePista":"Professional Volley court","ancho":"18 x 9","material":"Parquet","description":"Pista echa de parquet de roble amazonico","img":"../../assets/img_courts/v_parquet.jpg","tagCourt":"Pista Profesional Indoor"},{"id":5,"sportId":2,"typePista":"b_parquet","namePista":"Court Elite Basket","ancho":"28 x 15","material":"Parquet","description":"Pista de baloncesto en parquet.","img":"../../assets/img_courts/b_parquet.jpg","tagCourt":"Pista Premium Indoor"},{"id":6,"sportId":2,"typePista":"b_asfalto","namePista":"Basket Junior Court","ancho":"28 x 15","material":"Asfalto","description":"Pista de baloncesto en asfalto.","img":"../../assets/img_courts/b_asfalto.jpg","tagCourt":"Pista Junior Exterior"},{"id":7,"sportId":2,"typePista":"b_3x3","namePista":"3 vs 3 Basketmania","ancho":"14 x 15 ","material":"Asfalto","description":"Pista de baloncesto 3x3.","img":"../../assets/img_courts/b_3x3.jpeg","tagCourt":"Pista 3x3 Exterior"}] -->

<template>
        <div class="list-content">
        <div class="header-section">
            <br><br><br>
            <h2 class="title">Nuestras Instalaciones Deportivas</h2>
            <p class="subtitle">Espacios de alto rendimiento para tu desarrollo deportivo</p>
        </div>
    
        <div class="pin"><img src="" alt=""></div>
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
            background: rgb(26, 26, 26);
            min-height: 100vh;
        }

        .header-section {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem 0;
        }

        .header-section .title {
            font-size: 3.5rem;
            color: #ecf0f1;
            margin-bottom: 1rem;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .subtitle {
            font-size: 1.6rem;
            color: #bdc3c7;
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
            background: #fff9c4;
            border-radius: 8px;
            position: relative;
            transform: rotate(-1deg);
            transition: all 0.3s ease;
            box-shadow: 
                0 1px 1px rgba(0,0,0,0.15),
                0 10px 0 -5px #34495e,
                0 10px 1px -4px rgba(0,0,0,0.15),
                0 20px 0 -10px #34495e,
                0 20px 1px -9px rgba(0,0,0,0.15);
            padding: 1.5rem;
        }

        .sports-card:nth-child(even) {
            transform: rotate(1deg);
            background: #ffecb3;
        }

        .sports-card:hover {
            transform: scale(1.03) rotate(0);
            z-index: 1;
            box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        }



        .image-section {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            margin-top: 1.5rem;
        }

        .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .image-section:hover .image-overlay {
            opacity: 1;
        }

        .reserve-btn-overlay {
            background: #e74c3c;
            color: white;
            border: none;
            padding: 1.2rem 2.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transform: translateY(20px);
            transition: all 0.4s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .reserve-btn-overlay:hover {
            background: #c0392b;
            transform: translateY(0) scale(1.05);
        }

        .image-section:hover .reserve-btn-overlay {
            transform: translateY(0);
        }

        .img-responsive {
            width: 100%;
            height: 350px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .image-section:hover .img-responsive {
            transform: scale(1.1);
        }

        .content-section {
            padding: 2rem;
            background: rgba(255,255,255,0.9);
            border-radius: 8px;
            margin-top: 1.5rem;
            min-height: 250px;
        }

        .court-header .title {
            font-size: 2rem;
            color: #2c3e50;
            margin-bottom: 1.5rem;
            font-weight: 700;
            border-bottom: 2px solid #e74c3c;
            padding-bottom: 0.5rem;
        }

        .details-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            margin: 1.5rem 0;
        }

        .detail-item {
            display: flex;
            align-items: center;
            font-size: 1.1rem;
            color: #34495e;
            padding: 0.5rem;
            background: rgba(255,255,255,0.7);
            border-radius: 4px;
            transition: transform 0.2s ease;
        }

        .detail-item:hover {
            transform: translateX(5px);
        }

        .detail-item i {
            margin-right: 0.8rem;
            color: #e74c3c;
            font-size: 1.2rem;
        }

        .description {
            margin-top: 1.5rem;
            padding: 1.5rem;
            background: rgba(255,255,255,0.9);
            border-radius: 8px;
            font-size: 1.1rem;
            color: #34495e;
            line-height: 1.8;
            border-left: 4px solid #e74c3c;
        }

        .loading {
            text-align: center;
            color: #ecf0f1;
            padding: 4rem;
            font-size: 1.6rem;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
        }

        @keyframes pulse {
            0% { opacity: 0.5; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0.5; transform: scale(0.9); }
        }

        .loading i {
            animation: pulse 2s infinite;
            color: #92d8be;
            font-size: 2rem;
            text-shadow: 0 0 15px rgba(146, 216, 190, 0.6);
        }

        @media (max-width: 768px) {
            .courts-grid {
                grid-template-columns: 1fr;
            }
            
            .content-section {
                min-height: 200px;
            }
        }
    </style>

