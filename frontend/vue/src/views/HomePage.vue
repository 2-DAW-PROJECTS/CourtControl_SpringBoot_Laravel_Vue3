<template>
  <div class="home"> 

  <!-- Home Gifts -->
  <!-- <HomeGifts /> -->
    
  <!-- Carousel Simple -->
  <!-- <CarrouselSimple /> -->

  <!-- TESTE -->.
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  <!-- Carousel Home -->
  <CarrouselHome />

  <!-- Card Description Home -->
  <CardDescription_home />

</div>
</template>

<script>
import CarrouselHome from "@/components/home/Carrousel_home.vue";
import CardDescription_home from "@/components/home/CardDescription_home.vue";
// import CarrouselSimple from "@/components/Carrousel_simple.vue";
// import HomeGifts from "@/components/Home_gifts.vue";

export default {
  name: "HomePage",
  components: {
    // HomeGifts,
    // CarrouselSimple,
    CardDescription_home,
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
