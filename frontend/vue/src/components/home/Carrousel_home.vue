<template>
  <div class="flicking-section">
  <Flicking
      :options="{
        circular: true,
        duration: 1200,
        panelsPerView: 1,
        align: 'center',
        moveType: 'snap',
        deceleration: 0.02
      }"
      :plugins="plugins"
      class="flicking-viewport"
    >
    <div class="panel" key="panel-1">
      <div class="grid-container">
        <div class="grid-item i1" @click.prevent="navigateToShop(2)">
          <div class="content-overlay"></div>
          <h2>Basket Mania </h2>
          <p>¡Ven a botar con nosotros en nuestras increíbles instalaciones! </p>
        </div>
        <div class="grid-item i2" @click.prevent="navigateToShop(2, 'tecnificaciones')">
          <div class="content-overlay"></div>
          <h3>¡Tecnificaciones!</h3>
          <p align="center"> Tiro | Bote | Pase  <br> Salto </p>
        </div>
        <div class="grid-item i3" @click.prevent="navigateToShop(2, 'tecnificaciones')">
          <div class="content-overlay"></div>
          <h3>¡Ponte en Forma!</h3>
          <p>¡Prepárate para ser imparable!</p>
        </div>
        <div class="grid-item i4" @click.prevent="navigateToShop(2, 'pistas')">
          <div class="content-overlay"></div>
          <h3>¡Tu Cancha te Espera!</h3>
          <p>¡Elige tu terreno de juego favorito y a divertirse!</p>
        </div>
        <div class="grid-item i5" @click.prevent="navigateToShop(2, 'academias')">
          <div class="content-overlay"></div>
          <h3>¡Veranos Inolvidables!</h3>
          <p>¡Diversión sin límites para todas las edades! ¡Únete a la aventura! 🌞</p>
        </div>
        <div class="grid-item i6" @click.prevent="navigateToShop(2)">
          <div class="content-overlay"></div>
          <h3>Eventos</h3>
          <p>Competiciones y Torneos 🏆</p>
        </div>
      </div>
    </div>
    
    <div class="panel" key="panel-2">
      <div class="grid-container">
        <div class="grid-item i7" @click.prevent="navigateToShop(1)">
          <div class="content-overlay"></div>
          <h2>Volley Mania</h2>
          <p>¡Aprende, salta y diviértete con nuestro método único!</p>
        </div>
        <div class="grid-item i8" @click.prevent="navigateToShop(1, 'tecnificaciones')">
          <div class="content-overlay"></div>
          <h3>¡Tecnificaciones!</h3>
          <p align="center"> Saque | Bloqueo | Remate  <br> Colocación | Defensa </p>
        </div>
        <div class="grid-item i9" @click.prevent="navigateToShop(1, 'tecnificaciones')">
          <div class="content-overlay"></div>
          <h3>¡Ponte en Forma!</h3>
          <p>¡Prepárate para volar! </p>
        </div>
        <div class="grid-item i10" @click.prevent="navigateToShop(1, 'pistas')">
          <div class="content-overlay"></div>
          <h3>¡Tu Espacio de Juego!</h3>
          <p>¡De la arena a la pista, la diversión no para! </p>
        </div>
        <div class="grid-item i11" @click.prevent="navigateToShop(1, 'academias')">
          <div class="content-overlay"></div>
          <h3>¡Verano de Campeones!</h3>
          <p>¡Diversión asegurada para todos! ¡Ven a vivir la experiencia! 🌞</p>
        </div>
        <div class="grid-item i12" @click.prevent="navigateToShop(1)">
          <div class="content-overlay"></div>
          <h3>Eventos</h3>
          <p>Competiciones y Torneos 🏆</p>
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
      plugins: [new AutoPlay({ duration: 3000, direction: "NEXT", stopOnHover: true })],
    };
  },
  methods: {
    navigateToShop(sportId, category) {
      const query = {
        sport: [sportId]
      }
      if (category) {
        query.category = category
      }
      this.$router.push({
        path: '/shop',
        query: query
      }).catch(() => {})
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

.flicking-section {
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
}

.flicking-viewport {
  height: 100%;
  position: relative;
}

.panel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.grid-container {
  display: grid;
  grid-template-areas:
    "item1 item2 item3"
    "item1 item4 item4"
    "item5 item5 item6";
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 2fr 1fr 1fr;
  gap: 15px;
  width: 85%;
  height: 90%;
  padding: 20px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  padding: 20px;
  transition: all 0.4s ease;
  position: relative;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0,0,0,0.3);
  cursor: pointer;
}

.content-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.4s ease;
}

.grid-item:hover .content-overlay {
  background: rgba(0, 0, 0, 0.3);
}

.grid-item:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 8px 25px rgba(46, 213, 116, 0.25);
  border: 2px solid rgba(92, 225, 71, 0.3);
}

.grid-item:hover h2,
.grid-item:hover h3 {
  text-shadow: 2px 2px 6px rgba(238, 203, 114, 0.8);
  letter-spacing: 2px;
}

.grid-item:hover p {
  transform: translateY(5px);
  letter-spacing: 0.5px;
}

.grid-item h2,
.grid-item h3,
.grid-item p {
  z-index: 2;
  transition: all 0.4s ease;
  font-family: 'Russo One', sans-serif;
}

.grid-item h2 {
  font-size: 2.2rem;
  color: #2ed573;
  font-weight: 700;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
  margin-bottom: 15px;
  text-transform: uppercase;
}

.grid-item h3 {
  text-transform: uppercase;
  font-size: 1.4rem;
  color: #eecb72;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 12px;
}

.grid-item p {
  font-size: 1.1rem;
  color: #ffffff;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
  line-height: 1.5;
}

.i1 { grid-area: item1; background-image: url('../../assets/img_sports/basket.jpg'); }
.i2 { grid-area: item2; background-image: url('../../assets/img_sports/tecnification_basket.webp'); }
.i3 { grid-area: item3; background-image: url('../../assets/img_sports/fisico_basket.jpg'); }
.i4 { grid-area: item4; background-image: url('../../assets/img_sports/pistas_basket.webp'); }
.i5 { 
  grid-area: item5; 
  background-image: url('../../assets/img_sports/vereano_basket.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.i6 { grid-area: item6; background-image: url('../../assets/img_sports/competicion_basket.jpg'); }

.i7 { grid-area: item1; background-image: url('../../assets/img_sports/voley_5.jpg'); }
.i8 { grid-area: item2; background-image: url('../../assets/img_sports/voley_4.jpg'); }
.i9 { grid-area: item3; background-image: url('../../assets/img_sports/fisico_basket.jpg'); }
.i10 { grid-area: item4; background-image: url('../../assets/img_sports/voley_2.avif'); }
.i11 {
  grid-area: item5; 
  background-image: url('../../assets/img_sports/volley_7.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.i12 { grid-area: item6; background-image: url('../../assets/img_sports/voley_1.jpg'); }

@media (max-width: 768px) {
  .grid-container {
    gap: 10px;
    padding: 10px;
    width: 90%;
  }
  
  .grid-item {
    padding: 15px;
  }
  
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

@media (max-width: 480px) {
  .grid-container {
    grid-template-areas:
      "item1"
      "item2"
      "item3"
      "item4"
      "item5"
      "item6";
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
  }
}
</style>