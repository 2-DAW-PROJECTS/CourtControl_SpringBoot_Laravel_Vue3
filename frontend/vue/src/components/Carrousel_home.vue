<template>
  <!-- Flicking Section -->
<div class="flicking-section">
  <Flicking
    :options="{ 
      circular: true,
      duration: 500,
      panelsPerView: 2,
      align: 'center',
      adaptive: false
    }"
    :plugins="[autoPlayPlugin]"
    class="flicking-viewport"
  >
    <div class="panel" style="width: 80%; height: 90%;"><img src="../assets/img_sports/atletismo.jpg" alt="Volei" style="width: 100%; height: 100%; object-fit: cover;"></div>
    <div class="panel" style="width: 90%; height: 100%;">
      <div class="grid-container">
        <div class="grid-item has-background-warning has-text-dark" style="transform: scale(1);"><img src="../assets/img_sports/atletismo.jpg" alt="Volei" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div class="grid-item has-background-danger has-text-white" style="transform: scale(0.9);"><img src="../assets/img_sports/atletismo.jpg" alt="Tenis" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div class="grid-item has-background-info has-text-white" style="transform: scale(1);"><img src="../assets/img_sports/atletismo.jpg" alt="Futbol" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div class="grid-item has-background-success has-text-white" style="transform: scale(0.8);"><img src="../assets/img_sports/atletismo.jpg" alt="Boxeo" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div class="grid-item has-background-grey has-text-white" style="transform: scale(1.1);"><img src="../assets/img_sports/atletismo.jpg" alt="Basket" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div class="grid-item has-background-grey has-text-white" style="transform: scale(0.9);"><img src="../assets/img_sports/atletismo.jpg" alt="Atletismo" style="width: 100%; height: 100%; object-fit: cover;"></div>
      </div>
    </div>
    <div class="panel" style="width: 80%; height: 90%;"><img src="../assets/img_sports/atletismo.jpg" alt="Volei" style="width: 100%; height: 100%; object-fit: cover;"></div>
    <div class="panel" style="width: 85%; height: 90%;">
      <div class="grid-container">
        <div class="grid-item has-background-light has-text-dark" style="transform: scale(1.15);"><img src="../assets/img_sports/atletismo.jpg" alt="Surf" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div class="grid-item has-background-grey has-text-white" style="transform: scale(0.9);"><img src="../assets/img_sports/atletismo.jpg" alt="Curry" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div class="grid-item has-background-info has-text-white" style="transform: scale(1.1);"><img src="../assets/img_sports/atletismo.jpg" alt="Rugby" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div class="grid-item has-background-success has-text-white" style="transform: scale(0.9);"><img src="../assets/img_sports/atletismo.jpg" alt="Beisbol" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div class="grid-item has-background-warning has-text-dark" style="transform: scale(1);"><img src="../assets/img_sports/atletismo.jpg" alt="Volei" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div class="grid-item has-background-danger has-text-white" style="transform: scale(0.9);"><img src="../assets/img_sports/atletismo.jpg" alt="Tenis" style="width: 100%; height: 100%; object-fit: cover;"></div>
      </div>    
    </div>
  </Flicking>
</div>

</template>

<script>
import "@egjs/flicking/dist/flicking.css";
import Flicking from '@egjs/vue3-flicking';
import { AutoPlay } from "@egjs/flicking-plugins";

export default {
  name: "HomePage",
  components: {
    Flicking,
  },
  setup() {
    const autoPlayPlugin = new AutoPlay({
      duration: 3000,
      direction: "NEXT",
      stopOnHover: false,
    });

    return {
      autoPlayPlugin,
    };
  },
};
</script>

<style scoped>
/* Flicking styles */
.flicking-section {
  padding: 2rem;
  background-color: rgb(26, 26, 26);
}

.flicking-viewport {
  width: 100%;
  height: 400px;
}

.panel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  padding: 1rem;
  overflow: hidden; /* Evita que la imagen ampliada se salga */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Asegura que las imágenes se mantengan dentro */
  border-radius: 8px;
  font-size: 1.5rem;
  position: relative; /* Posiciona el hijo (imagen) correctamente */
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out; /* Suaviza el zoom */
}

.grid-item:hover img {
  transform: scale(1.1); /* Amplía la imagen ligeramente */
}

</style>
