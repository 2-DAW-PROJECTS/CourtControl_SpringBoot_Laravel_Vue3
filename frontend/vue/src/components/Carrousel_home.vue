<template>
    <div>
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
    </div>
  </template>
  
  <script>
  import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
  import { Splide, SplideSlide } from "@splidejs/vue-splide";
  
  export default {
    name: "CarrouselHome",
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
      Splide,
      SplideSlide,
    },
    props: {
      sports: {
        type: Array,
        required: true,
      },
      backgroundImages: {
        type: Array,
        required: true,
      },
      splideOptions: {
        type: Object,
        required: true,
      },
      carouselImages: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Aquí puedes copiar los estilos relacionados con los carruseles */
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
  }
  
  .splide-carousel-section {
    padding: 2rem;
    background: #fff;
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
  