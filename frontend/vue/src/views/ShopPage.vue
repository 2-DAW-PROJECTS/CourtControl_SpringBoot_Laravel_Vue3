<template>
    <div class="shop">
        
      <!-- Lista de pistas -->
      <ListContent />
      <ListLessons />
      <ListSummers />


    </div>
  </template>
  
  <script>
    import ListContent from "@/components/shop/ListContent.vue";
    import ListLessons from "@/components/shop/ListLessons.vue";
    import ListSummers from "@/components/shop/ListSummers.vue";

    export default {
    name: "ShopPage",
    components: {
        ListContent,
        ListLessons,
        ListSummers,
    },
    };

  </script>
  
  <style scoped>
  .shop {
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
  }
  
  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  p {
    text-align: center;
    margin-bottom: 40px;
    color: #555;
  }
  </style>
  