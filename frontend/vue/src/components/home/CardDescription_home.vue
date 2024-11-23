<template>
    <div class="sports-container">
        <!-- Primera tarjeta - Historia del voleibol -->
        <div class="sports-card">
            <div class="image-section">
                <img src="@/assets/img_sports/hist_voley.jpg" class="img-responsive img-volley" alt="Historia del voleibol" />
            </div>
            <div class="content-section">
                <h3 class="title">Historia del Voleibol</h3>
                <p class="description">
                    Creado en 1895 por William G. Morgan en Massachusetts, el voleibol nació como un juego menos intenso que el baloncesto. 
                    Su evolución lo convirtió en un deporte dinámico con estrategias únicas y movimientos rápidos.
                </p>
                <div class="timeline">
                    <div class="timeline-item">
                        <img src="@/assets/img_sports/voley_1900.jpg" alt="Balón 1900" />
                        <!-- <img src="@/assets/img_sports/hist_voley.jpg" alt="Balón 1900" /> -->
                        <span>1900</span>
                    </div>
                    <div class="timeline-item">
                        <img src="@/assets/img_sports/voley_1950.jpg" alt="Balón 1950" />
                        <span>1950</span>
                    </div>
                    <div class="timeline-item">
                        <img src="@/assets/img_sports/voley_1980.jpg" alt="Balón 1980" />
                        <span>1980</span>
                    </div>
                    <div class="timeline-item">
                        <img src="@/assets/img_sports/voley_actual.jpg" alt="Balón actual" />
                        <span>Actual</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Segunda tarjeta - Historia del Basketball -->
        <div class="sports-card">
            <div class="content-section">
                <h3 class="title">Historia del Basketball</h3>
                <p class="description">
                    James Naismith inventó el basketball en 1891 como una actividad para el invierno. Rápidamente ganó popularidad por su 
                    dinamismo, estrategia y espectacularidad, convirtiéndose en uno de los deportes más seguidos en el mundo.
                </p>
                <div class="timeline">
                    <div class="timeline-item">
                        <img src="@/assets/img_sports/basket_1900.jpg" alt="Balón 1900" />
                        <span>1900</span>
                    </div>
                    <div class="timeline-item">
                        <img src="@/assets/img_sports/basket_1950.png" alt="Balón 1950" />
                        <span>1950</span>
                    </div>
                    <div class="timeline-item">
                        <img src="@/assets/img_sports/basket_1980.jpg" alt="Balón 1980" />
                        <span>1980</span>
                    </div>
                    <div class="timeline-item">
                        <img src="@/assets/img_sports/basket_actual.jpg" alt="Balón actual" />
                        <span>Actual</span>
                    </div>
                </div>
            </div>
            <div class="image-section">
                <img src="@/assets/img_sports/hist_basket.jpg" class="img-responsive img-basket" alt="Historia del basketball" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Contenedor Principal */
.sports-container {
    display: flex;
    flex-direction: column;
    gap: 2.55rem;
    padding: 1.7rem;
    background-color: #1a1a1a;
    border-radius: 0.85rem;
}

/* Tarjetas de deporte */
.sports-card {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1.7rem;
    background-color: #2d2d2d;
    border-radius: 0.85rem;
    padding: 1.7rem;
    box-shadow: 0 6.8px 17px rgba(0, 0, 0, 0.6);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
}

.sports-card:hover {
    box-shadow: 0 10.2px 23.8px rgba(0, 0, 0, 0.8);
}

/* Sección de imagen */
.image-section {
    flex: 1;
    position: relative;
}

.img-responsive {
    max-width: 100%;
    max-height: 80%;
    border-radius: 0.85rem;
    box-shadow: 0 5.1px 12.75px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin: 0;
}

.img-volley {
    margin-left: 0;
    margin-right: auto;
}

.img-basket {
    margin-left: auto;
    margin-right: 0;
}

.img-responsive:hover {
    box-shadow: 0 6.8px 30px rgb(0, 0, 0);
}

/* Sección de contenido */
.content-section {
    margin-left: 40px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    color: #e0e0e0;
}

.title {
    font-size: 2rem;
    font-weight: 700;
    color: #ff4d4d;
    margin-bottom: 0.425rem;
}

.description {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #e0e0e0;
    max-width: 500px;
    text-align: justify;
}

/* Timeline */
.timeline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    position: relative;
    margin-top: 1rem;
}

.timeline::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(45deg, #ff4d4d, #ff1a1a);
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}

.timeline-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
}

.timeline-item img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #ff4d4d;
    background-color: #2d2d2d;
    padding: 0.2rem;
    transition: transform 0.3s ease;
}

.timeline-item img:hover {
    transform: scale(1.2);
}

.timeline-item span {
    font-size: 0.8rem;
    color: #e0e0e0;
    font-weight: 600;
}

@media (max-width: 576px) {
    .sports-card {
        flex-direction: column;
        padding: 1rem;
    }

    .img-responsive {
        max-height: 200px;
    }

    .content-section {
        gap: 0.5rem;
    }

    .title {
        font-size: 1.5rem;
    }

    .description {
        font-size: 0.9rem;
        line-height: 1.4;
    }

    .timeline {
        flex-wrap: wrap;
        gap: 1rem;
    }

    .timeline-item img {
        width: 40px;
        height: 40px;
    }

    .content-section {
        margin-left: 0;
    }
}

/* Tablets */
@media (min-width: 577px) and (max-width: 768px) {
    .sports-card {
        flex-direction: column;
    }

    .title {
        font-size: 1.6rem;
    }

    .description {
        font-size: 0.95rem;
    }
    .content-section {
        margin-left: 0;
    }
}

/* Pantallas grandes */
@media (min-width: 1024px) {
    .sports-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .sports-card {
        flex-direction: row;
        padding: 2rem;
        gap: 2rem;
    }

    .img-responsive {
        max-height: 400px;
    }

    .title {
        font-size: 2rem;
    }

    .description {
        font-size: 1.1rem;
        line-height: 1.8;
    }

    .content-section {
        margin-left: 0;
    }
}
</style>
