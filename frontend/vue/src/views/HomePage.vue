<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1>Bienvenido al Mundo del Deporte</h1>
        <p>Descubre todas nuestras actividades deportivas</p>
      </div>
    </div>

    <!-- First Carousel Section -->
    <div class="carousel-section">
      <h2>Deportes Disponibles</h2>
      <carousel :items-to-show="3" :wrap-around="true" :autoplay="3000">
        <slide v-for="(sport, index) in sports" :key="sport.id">
          <div class="sport-card">
            <div
              class="sport-icon"
              :style="{ backgroundImage: `url(${backgroundImages[index % backgroundImages.length]})` }"
            ></div>
            <h3>{{ sport.nameSport }}</h3>
          </div>
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>

    <!-- Cloud Mask Carousel -->
    <div class="splide-carousel-section">
      <h2>Destacados</h2>
      <Splide :options="splideOptions" class="splide-cloud-mask">
        <SplideSlide v-for="(image, index) in carouselImages" :key="index">
          <div class="splide-slide-content">
            <img :src="image.src" :alt="image.alt" />
          </div>
        </SplideSlide>
      </Splide>
    </div>

<!-- Flicking Section -->
<div class="flicking-section">
  <Flicking 
    :options="{ 
      circular: true,
      duration: 500,
      panelsPerView: 2,
      align: 'center',
      autoPlay: true,
      interval: 3000,
      adaptive: false
    }"
    class="flicking-viewport"
  >
    <div class="panel" style="width: 30%; height: 60%;"><img src="../assets/img_sports/atletismo.jpg" alt="Volei" style="width: 100%; height: 100%; object-fit: cover;">1</div>
    <div class="panel" style="width: 90%; height: 100%;">
      <div class="grid-container">
        <div class="grid-item has-background-warning has-text-dark" style="transform: scale(1.1);"><img src="../assets/img_sports/atletismo.jpg" alt="Volei" style="width: 100%; height: 100%; object-fit: cover;">2</div>
        <div class="grid-item has-background-danger has-text-white" style="transform: scale(0.9);"><img src="../assets/img_sports/atletismo.jpg" alt="Tenis" style="width: 100%; height: 100%; object-fit: cover;">3</div>
        <div class="grid-item has-background-info has-text-white" style="transform: scale(1.2);"><img src="../assets/img_sports/atletismo.jpg" alt="Futbol" style="width: 100%; height: 100%; object-fit: cover;">4</div>
        <div class="grid-item has-background-success has-text-white" style="transform: scale(0.8);"><img src="../assets/img_sports/atletismo.jpg" alt="Boxeo" style="width: 100%; height: 100%; object-fit: cover;">5</div>
        <div class="grid-item has-background-grey has-text-white" style="transform: scale(1.15);"><img src="../assets/img_sports/atletismo.jpg" alt="Basket" style="width: 100%; height: 100%; object-fit: cover;">6</div>
        <div class="grid-item has-background-grey has-text-white" style="transform: scale(0.9);"><img src="../assets/img_sports/atletismo.jpg" alt="Atletismo" style="width: 100%; height: 100%; object-fit: cover;">7</div>
      </div>
    </div>
    <div class="panel" style="width: 70%; height: 80%;"><img src="../assets/img_sports/atletismo.jpg" alt="Volei" style="width: 100%; height: 100%; object-fit: cover;">7</div>
    <div class="panel" style="width: 85%; height: 90%;">
      <div class="grid-container">
        <div class="grid-item has-background-light has-text-dark" style="transform: scale(1.15);"><img src="../assets/img_sports/atletismo.jpg" alt="Surf" style="width: 100%; height: 100%; object-fit: cover;">8</div>
        <div class="grid-item has-background-grey has-text-white" style="transform: scale(0.9);"><img src="../assets/img_sports/atletismo.jpg" alt="Curry" style="width: 100%; height: 100%; object-fit: cover;">9</div>
        <div class="grid-item has-background-info has-text-white" style="transform: scale(1.1);"><img src="../assets/img_sports/atletismo.jpg" alt="Rugby" style="width: 100%; height: 100%; object-fit: cover;">10</div>
        <div class="grid-item has-background-success has-text-white" style="transform: scale(0.8);"><img src="../assets/img_sports/atletismo.jpg" alt="Beisbol" style="width: 100%; height: 100%; object-fit: cover;">11</div>
        <div class="grid-item has-background-warning has-text-dark" style="transform: scale(1);"><img src="../assets/img_sports/atletismo.jpg" alt="Volei" style="width: 100%; height: 100%; object-fit: cover;">12</div>
        <div class="grid-item has-background-danger has-text-white" style="transform: scale(0.9);"><img src="../assets/img_sports/atletismo.jpg" alt="Tenis" style="width: 100%; height: 100%; object-fit: cover;">13</div>
      </div>    </div>
  </Flicking>
</div>
  </div>
</template>

<script>
import { getSports } from "../services/client/sportService";
import "@splidejs/splide/dist/css/splide.min.css";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@egjs/flicking/dist/flicking.css";
import Flicking from '@egjs/vue3-flicking';

export default {
  name: "HomePage",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    Splide,
    SplideSlide,
    Flicking,
  },
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
      ],
      splideOptions: {
        type: "loop",
        perPage: 1,
        gap: "1rem",
        autoplay: true,
        pauseOnHover: false,
        cover: true,
        height: "400px",
      },
      carouselImages: [
        {
          src: require("@/assets/img_sports/atletismo.jpg"),
          alt: "Atletismo",
        },
        {
          src: require("@/assets/img_sports/basket.jpg"),
          alt: "Basket",
        },
        {
          src: require("@/assets/img_sports/futbol.jpg"),
          alt: "Fútbol",
        },
        {
          src: require("@/assets/img_sports/padel.jpg"),
          alt: "Pádel",
        },
        {
          src: require("@/assets/img_sports/tenis.jpg"),
          alt: "Tenis",
        },
        {
          src: require("@/assets/img_sports/volei.jpg"),
          alt: "Volei",
        },
      ],
    };
  },
  async created() {
    try {
      const data = await getSports();
      this.sports = data;
      this.startBackgroundSlideshow();
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  },
  methods: {
    startBackgroundSlideshow() {
      setInterval(() => {
        this.currentImageIndex =
          (this.currentImageIndex + 1) % this.backgroundImages.length;
        const heroSection = document.querySelector(".hero-section");
        heroSection.style.backgroundImage = `url(${this.backgroundImages[this.currentImageIndex]})`;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* Flicking styles */
.flicking-section {
  padding: 2rem;
  background: #f5f5f5;
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
  /* background-color: gray; */
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
  /* background-color: aqua; */
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.5rem;
}

/* Keep all previous styles and add these new ones */
.hero-section {
  height: 80vh;
  position: relative;
  background: url('./gifts/volei.webp') center center;
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
  0% { background-image: url('./gifts/volei.webp'); }
  10% { background-image: url('./gifts/tenis.webp'); }
  20% { background-image: url('./gifts/footbol.webp'); }
  30% { background-image: url('./gifts/boxeo.gif'); }
  40% { background-image: url('./gifts/basket.webp'); }
  50% { background-image: url('./gifts/atletismo.webp'); }
  60% { background-image: url('./gifts/surf.gif'); }
  70% { background-image: url('./gifts/curry.webp'); }
  80% { background-image: url('./gifts/rugby.webp'); }
  90% { background-image: url('./gifts/beisbol.webp'); }
  100% { background-image: url('./gifts/volei.webp'); }
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
}

.hero-content p {
  font-size: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.carousel-section {
  padding: 2rem;
  background: #f5f5f5;
}

.carousel-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.sport-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 0 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.sport-card:hover {
  transform: translateY(-5px);
}

.sport-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
  filter: grayscale(100%);
  transition: background-image 0.3s ease;
}

.sport-card h3 {
  color: #333;
  font-size: 1.2rem;
}

:deep(.carousel__slide) {
  padding: 1rem;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

:deep(.carousel__pagination) {
  padding: 1rem 0;
}

.splide-carousel-section {
  padding: 2rem;
  background: #fff;
}

.splide-carousel-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.splide-cloud-mask .splide__mask {
  mask-image: url("https://raw.githubusercontent.com/Splidejs/assets/main/mask-cloud.svg");
  -webkit-mask-image: url("https://raw.githubusercontent.com/Splidejs/assets/main/mask-cloud.svg");
  mask-size: cover;
  -webkit-mask-size: cover;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
}

.splide-cloud-mask .splide__slide img {
  width: 100%;
  border-radius: 10px;
}

</style>


<!-- Flicking Section -->
<!-- <div class="flicking-section">
  <Flicking 
    :options="{ 
      circular: true,
      duration: 500,
      panelsPerView: 1,
      align: 'center',
      autoPlay: true,
      interval: 3000,
      adaptive: false
    }"
    class="flicking-viewport"
  >
    <div class="panel" style="width: 30%; height: 60%;">1</div>
    <div class="panel" style="width: 90%; height: 100%;">
      <div class="grid-container">
        <div class="grid-item has-background-warning has-text-dark" style="transform: scale(1.2);">2</div>
        <div class="grid-item has-background-danger has-text-white" style="transform: scale(0.8);">3</div>
        <div class="grid-item has-background-info has-text-white" style="transform: scale(1.1);">4</div>
        <div class="grid-item has-background-success has-text-white" style="transform: scale(0.9);">5</div>
        <div class="grid-item has-background-grey has-text-white" style="transform: scale(1.3);">6</div>
        <div class="grid-item has-background-grey has-text-white" style="transform: scale(0.7);">7</div>
      </div>
    </div>
    <div class="panel" style="width: 70%; height: 80%;">7</div>
    <div class="panel" style="width: 85%; height: 90%;">
      <div class="grid-container">
        <div class="grid-item has-background-light has-text-dark" style="transform: scale(1.4);">8</div>
        <div class="grid-item has-background-grey has-text-white" style="transform: scale(0.6);">9</div>
        <div class="grid-item has-background-info has-text-white" style="transform: scale(1.2);">10</div>
        <div class="grid-item has-background-success has-text-white" style="transform: scale(0.8);">11</div>
        <div class="grid-item has-background-warning has-text-dark" style="transform: scale(1.1);">12</div>
        <div class="grid-item has-background-danger has-text-white" style="transform: scale(0.9);">13</div>
      </div>
    </div>
  </Flicking>
</div> -->