
<template>
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
</template>

<script>
import "@splidejs/splide/dist/css/splide.min.css";
import "vue3-carousel/dist/carousel.css";
import { Splide, SplideSlide } from "@splidejs/vue-splide";

export default {
    name: "HomePage",
    components: {
      Splide,
      SplideSlide,
    },
    data() {
      return {
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
  };
  </script>

<style>
.splide-carousel-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #4cea29;
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


.splide-carousel-section {
  padding: 2rem;
  background-color: rgb(26, 26, 26);
}
</style>