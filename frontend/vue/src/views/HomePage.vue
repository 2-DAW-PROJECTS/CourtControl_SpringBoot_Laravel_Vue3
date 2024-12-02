<template>
  <div class="home"> 

  <!-- Home Gifts -->
  <HomeGifts />
    
  <!-- Carousel Simple -->
  <!-- <CarrouselSimple /> -->

  <!-- Carousel Home -->
  <CarrouselHome /> 

  <!-- Card Description Home -->
  <CardDescription_home />

  <!-- Infinity Scroll Summer -->
  <InfinityScrollCourts />
</div>
</template>

<script>
import CarrouselHome from "@/components/home/Carrousel_home.vue";
import CardDescription_home from "@/components/home/CardDescription_home.vue";
// import CarrouselSimple from "@/components/Carrousel_simple.vue";
import HomeGifts from "@/components/home/Home_gifts.vue";
import InfinityScrollCourts from "@/components/home/InfinityScrollCourts.vue";

export default {
  name: "HomePage",
  components: {
    HomeGifts,
    // CarrouselSimple,
    CardDescription_home,
    CarrouselHome,
    InfinityScrollCourts
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: rgb(26, 26, 26);
}

</style>
