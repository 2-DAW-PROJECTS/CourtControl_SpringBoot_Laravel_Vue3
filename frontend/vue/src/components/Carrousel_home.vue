<template>
  <div class="flicking-section">

    <Flicking
      :options="{
        circular: true,
        duration: 500,
        panelsPerView: 1,
        align: 'center',
        // adaptive: true,
        autoPlay: true,
        interval: 3000,
        moveType: 'snap'
      }"
      class="flicking-viewport"
    >

      <div class="panel">
        <div class="grid-container">
          <div class="grid-item item1">
            <h2>Instalaciones Deportivas</h2>
            <p>Descubre nuestras modernas instalaciones</p>
          </div>
          <div class="grid-item item2">
            <h3>Piscina</h3>
            <p>Nado libre y clases</p>
          </div>
          <div class="grid-item item3">
            <h3>Gimnasio</h3>
            <p>Equipo de última generación</p>
          </div>
          <div class="grid-item item4">
            <h3>Pistas</h3>
            <p>Tenis, Fútbol y más</p>
          </div>
          <div class="grid-item item5">
            <h3>Actividades Grupales</h3>
            <p>Yoga, Pilates, Zumba</p>
          </div>
          <div class="grid-item item6">
            <h3>Eventos</h3>
            <p>Competiciones y torneos</p>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="grid-container">
          <div class="grid-item item1">
            <h2>Servicios Premium</h2>
            <p>La mejor experiencia deportiva</p>
          </div>
          <div class="grid-item item2">
            <h3>Entrenador Personal</h3>
            <p>Planes personalizados</p>
          </div>
          <div class="grid-item item3">
            <h3>Nutrición</h3>
            <p>Asesoramiento experto</p>
          </div>
          <div class="grid-item item4">
            <h3>Spa & Wellness</h3>
            <p>Relájate después del ejercicio</p>
          </div>
          <div class="grid-item item5">
            <h3>Membresías</h3>
            <p>Planes flexibles para ti</p>
          </div>
          <div class="grid-item item6">
            <h3>App Móvil</h3>
            <p>Reserva y seguimiento</p>
          </div>
        </div>
      </div>
    </Flicking>
  </div>
</template>

<script>
import "@egjs/flicking/dist/flicking.css";
import Flicking from "@egjs/vue3-flicking";

export default {
  name: "DoubleFlicking",
  components: {
    Flicking,
  },
};
</script>

<style scoped>

.flicking-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: #f8f9fa;
}


.flicking-viewport {
  width: 100%;
  height: 80vh;
  overflow: hidden;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
}

.panel {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 20px
}

.grid-container {
  display: grid;
  grid-template-areas:
    "item1 item2 item3"
    "item1 item4 item4"
    "item5 item5 item6";
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 15px;
  width: 95%;
  height: 95%;
}

.grid-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px;
  border-radius: 15px;
  transition: transform 0.3s ease;
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  text-align: center;
}

.grid-item:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.grid-item h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.grid-item h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.grid-item p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.item1 { grid-area: item1; background: rgba(41, 128, 185, 0.3); }
.item2 { grid-area: item2; background: rgba(46, 204, 113, 0.3); }
.item3 { grid-area: item3; background: rgba(230, 126, 34, 0.3); }
.item4 { grid-area: item4; background: rgba(155, 89, 182, 0.3); }
.item5 { grid-area: item5; background: rgba(231, 76, 60, 0.3); }
.item6 { grid-area: item6; background: rgba(52, 152, 219, 0.3); }

@media (max-width: 768px) {
  .grid-item h2 {
    font-size: 1.8rem;
  }
  .grid-item h3 {
    font-size: 1.4rem;
  }
  .grid-item p {
    font-size: 1rem;
  }
}
</style>