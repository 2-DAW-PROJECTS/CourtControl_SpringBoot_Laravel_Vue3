<!-- IMPLEMENTAR IMAGENES DE FONDO EN LOS ITEMS -->
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
          <div class="grid-item i1">
            <h2>Sección de Baloncesto</h2>
            <p>Descubre nuestras modernas instalaciones</p>
          </div>
          <div class="grid-item i2">
            <h3>Tecnificaciones</h3>
            <p>| Tiro | Bote | Pase | Salto |</p>
          </div>
          <div class="grid-item i3">
            <h3>Fisicos</h3>
            <p>Te vamos a preparar fisicamente</p>
          </div>
          <div class="grid-item i4">
            <h3>Reserva Pistas</h3>
            <p>| Parquet | Asfalto | Interior | Exterior |</p>
          </div>
          <div class="grid-item i5">
            <h3>Veranos Intensivos</h3>
            <p>| BENJAMÍN 6 - 8 | ALEVIN 9 - 11 | INFANTIL 12 - 14 | CADETE 15 - 17 | JUNIOR 18 - 20 | SENIOR 21 - 39 |</p>
          </div>
          <div class="grid-item i6">
            <h3>Eventos</h3>
            <p>Competiciones y torneos</p>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="grid-container">
          <div class="grid-item i7">
            <h2>Sección de Voleibol</h2>
            <p>Descubre nuestra metodología avanzada de entrenamiento.</p>
          </div>
          <div class="grid-item i8">
            <h3>Técnicas</h3>
            <p>| Saque | Bloqueo | Remate | Defensa | Colocación | Recepción |</p>
          </div>
          <div class="grid-item i9">
            <h3>Físico</h3>
            <p>Te ayudamos a alcanzar tu mejor Prime.</p>
          </div>
          <div class="grid-item i10">
            <h3>Reserva Pistas</h3>
            <p>| Arena | Tarima | Interior | Exterior |</p>
          </div>
          <div class="grid-item i11">
            <h3>Veranos Intensivos</h3>
            <p>| BENJAMÍN 6 - 8 | ALEVÍN 9 - 11 | INFANTIL 12 - 14 | CADETE 15 - 17 | JUNIOR 18 - 20 | SENIOR 21 - 50 |</p>
          </div>
          <div class="grid-item i12">
            <h3>Eventos</h3>
            <p>Participa en competiciones y torneos emocionantes.</p>
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
  border: 1px solid rgba(46, 213, 115, 0.3);
  color: white;
  text-align: center;
  background-size: cover;
  background-position: center;
  position: relative;
}

.grid-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
}

.grid-item:hover {
  transform: scale(1.02);
  border-color: rgba(46, 213, 115, 0.8);
  box-shadow: 0 4px 12px rgba(46, 213, 115, 0.2);
}

.grid-item h2, .grid-item h3, .grid-item p {
  position: relative;
  z-index: 1;
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

.i1 { grid-area: item1; background-image: url('../assets/img_sports/basket.jpg'); }
.i2 { grid-area: item2; background-image: url('../assets/img_sports/tecnification_basket.webp'); }
.i3 { grid-area: item3; background-image: url('../assets/img_sports/fisico_basket.jpg'); }
.i4 { grid-area: item4; background-image: url('../assets/img_sports/pistas_basket.webp'); }
.i5 { 
  grid-area: item5; 
  background-image: url('../assets/img_sports/vereano_basket.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.i6 { grid-area: item6; background-image: url('../assets/img_sports/competicion_basket.jpg'); }

.i7 { grid-area: item1; background-image: url('../assets/img_sports/voleibol.jpg'); }
.i8 { grid-area: item2; background-image: url('../assets/img_sports/basket.jpg'); }
.i9 { grid-area: item3; background-image: url('../assets/img_sports/basket.jpg'); }
.i10 { grid-area: item4; background-image: url('../assets/img_sports/basket.jpg'); }
.i11 { grid-area: item5; background-image: url('../assets/img_sports/basket.jpg'); }
.i12 { grid-area: item6; background-image: url('../assets/img_sports/basket.jpg'); }

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