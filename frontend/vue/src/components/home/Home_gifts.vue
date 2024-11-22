<template>
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="overlay"></div>
        <div class="hero-content">
          <h1>Bienvenido al Mundo del Deporte</h1>
          <p>Descubre todas nuestras actividades deportivas</p>
        </div>
      </div>
</template>


<script>

export default {
  name: "HomePage",
  data() {
    return {
      sports: [],
      currentImageIndex: 0,
      backgroundImages: [
        "./gifts/volei.webp",
        "./gifts/tenis.webp",
        "./gifts/footbol.webp",
        "./gifts/boxeo.webp",
        "./gifts/basket.webp",
        "./gifts/atletismo.webp",
        "./gifts/surf.gif",
        "./gifts/curry.webp",
        "./gifts/rugby.webp",
        "./gifts/beisbol.webp",
      ]
    };
  },
};
</script>


<style>

/* Keep all previous styles and add these new ones */
.hero-section {
  height: 80vh;
  position: relative;
  background: url('../../assets/gifts/volei.webp') center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  transition: background-image 0.5s ease-in-out;
  filter: contrast(110%) brightness(105%) saturate(120%);
  animation: backgroundSlide 60s infinite;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

@keyframes backgroundSlide {
  0% { background-image: url('../../assets/gifts/volei.webp'); }
  10% { background-image: url('../../assets/gifts/tenis.webp'); }
  20% { background-image: url('../../assets/gifts/footbol.webp'); }
  30% { background-image: url('../../assets/gifts/boxeo.gif'); }
  40% { background-image: url('../../assets/gifts/basket.webp'); }
  50% { background-image: url('../../assets/gifts/atletismo.webp'); }
  60% { background-image: url('../../assets/gifts/surf.gif'); }
  70% { background-image: url('../../assets/gifts/curry.webp'); }
  80% { background-image: url('../../assets/gifts/rugby.webp'); }
  90% { background-image: url('../../assets/gifts/beisbol.webp'); }
  100% { background-image: url('../../assets/gifts/volei.webp'); }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  text-align: center;
  color: white;
  z-index: 1;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: #4cea29;
}

.hero-content p {
  font-size: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  color: #8eed79;
}
</style>