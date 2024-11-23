<template>
    <div class="shop">
        
      <!-- Lista de pistas -->
      <ListContent />
  

    </div>
  </template>
  
  <script>
    import ListContent from "@/components/shop/ListContent.vue";

    export default {
    name: "ShopPage",
    components: {
        ListContent,
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
  