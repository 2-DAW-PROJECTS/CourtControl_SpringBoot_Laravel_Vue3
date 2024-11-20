<template>
  <div class="flicking-section">
    <Flicking
      :options="{
        circular: true,
        duration: 3000,
        panelsPerView: 1,
        align: 'center',
        moveType: 'snap'
      }"
      :plugins="plugins"
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
            <h3>Actividades</h3>
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
import { AutoPlay } from "@egjs/flicking-plugins";

export default {
  name: "DoubleFlicking",
  components: {
    Flicking,
  },
  data() {
    return {
      plugins: [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: true })],
    };
  },
};
</script>

<style scoped>
.flicking-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  background: #1a1a1a;
}

.flicking-viewport {
  width: 100%;
  height: 70vh;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
}

.panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 15px;
}

.grid-container {
  display: grid;
  grid-template-areas:
    "item1 item2 item3"
    "item1 item4 item4"
    "item5 item5 item6";
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  width: 90%;
  height: 90%;
}

.grid-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(46, 213, 115, 0.3);
  color: white;
  text-align: center;
}

.grid-item:hover {
  transform: scale(1.02);
  border-color: rgba(46, 213, 115, 0.8);
  box-shadow: 0 4px 12px rgba(46, 213, 115, 0.2);
}

.grid-item h2 {
  font-size: 2.2rem;
  margin-bottom: 12px;
  font-weight: 700;
  color: #2ed573;
}

.grid-item h3 {
  font-size: 1.6rem;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2ed573;
}

.grid-item p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.item1 { grid-area: item1; background: rgba(0, 0, 0, 0.8); }
.item2 { grid-area: item2; background: rgba(46, 213, 115, 0.1); }
.item3 { grid-area: item3; background: rgba(46, 213, 115, 0.1); }
.item4 { grid-area: item4; background: rgba(46, 213, 115, 0.1); }
.item5 { grid-area: item5; background: rgba(46, 213, 115, 0.1); }
.item6 { grid-area: item6; background: rgba(46, 213, 115, 0.1); }

@media (max-width: 768px) {
  .grid-item h2 {
    font-size: 1.6rem;
  }
  .grid-item h3 {
    font-size: 1.2rem;
  }
  .grid-item p {
    font-size: 0.9rem;
  }
}
</style>