<template>
  <div class="home"> 

  <!-- Home Gifts -->
  <HomeGifts />

  <!-- Carousel Simple -->
  <!-- <CarrouselSimple /> -->

  <!-- Carousel Home -->
  <CarrouselHome />

</div>
</template>

<script>
import CarrouselHome from "@/components/Carrousel_home.vue";
// import CarrouselSimple from "@/components/Carrousel_simple.vue";
import HomeGifts from "@/components/Home_gifts.vue";

export default {
  name: "HomePage",
  components: {
    HomeGifts,
    // CarrouselSimple,
    CarrouselHome
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: rgb(26, 26, 26);
}

</style>
