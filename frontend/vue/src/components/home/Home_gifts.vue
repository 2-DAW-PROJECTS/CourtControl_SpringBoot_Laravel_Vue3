<template>
  <section class="hero-section">
      <!-- Background Video -->
      <video autoplay muted class="hero-video" ref="backgroundVideo">
        <source src="@/assets/banners_home/background-video.mp4" type="video/mp4" />
        <img src="@/assets/banners_home/banner_4.jpg" alt="Banner de Emergencia">
      </video>
      <!-- Fallback Image -->
      <img v-if="showFallbackImage" src="@/assets/banners_home/banner_4.jpg" 
        alt="Hero Fallback Background" class="hero-fallback-image"/>

    <div class="hero-overlay"></div>
    <div class="hero-content">
      <img src="@/assets/logo.png" alt="App Logo" class="hero-logo" />
      <h1 class="hero-title">
        <span class="gradient-text">CourtControl</span>
      </h1>
      <p class="hero-subtitle">
        Precisión en cada jugada, control en cada espacio.
      </p>
      <SearchBar @search="handleSearch" />
    </div>
  </section>
</template>


<script>
import SearchBar from '@/components/search/SearchBar.vue';
export default {
  components: {
    SearchBar
  },
  data() {
    return {
      showFallbackImage: false,
    };
  },
  methods: {
    handleSearch(searchQuery) {
      // console.log('Search query:', searchQuery);
      // Redirigir a la página de Shop con el término de búsqueda en la URL
      this.$router.push({ name: 'shop', query: { search: searchQuery } });
    }
  },
  mounted() {
    const video = this.$refs.backgroundVideo;
    
    // Set a timeout to show fallback image if video takes too long
    const timeoutId = setTimeout(() => {
      this.showFallbackImage = true;
      video.style.display = 'none';
    }, 1000); // 1 seconds timeout

    // If video loads successfully before timeout, clear the timeout
    video.addEventListener('canplay', () => {
      clearTimeout(timeoutId);
    });

    video.addEventListener('ended', () => {
      this.showFallbackImage = true;
      video.style.display = 'none';
    });
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Poppins:wght@300;400;600&display=swap');


.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

.hero-video {
  filter: brightness(0.4);
}

.hero-video,
.hero-fallback-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}


.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.292), 
    rgba(0, 0, 0, 0.148)
  );
  z-index: 1;
}


.hero-content {
  position: relative;
  text-align: center;
  color: #f6f1de;
  z-index: 2;
  padding: 2rem;
  animation: fadeIn 1.5s ease-in-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-logo {
  max-width: 250px;
  /* margin-bottom: 1rem; */
  animation: pulse 3s infinite;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  letter-spacing: -0.05em;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d;
  animation: titleEntrance 1.5s ease-out;
}

.gradient-text {
  background: linear-gradient(
    90deg, 
    #f6f1de, 
    #92d8be, 
    #9bada1, 
    #f5ce8d, 
    #fc9b70, 
    #eb6a65,
    #f6f1de
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 300% 100%;
  animation: gradient 8s linear infinite;
}

@keyframes titleEntrance {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-50px);
  }
  50% {
    transform: scale(1.1) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #dcdcdc;
  /* font-weight: 900; */
  font-family: 'Montserrat', sans-serif;
  animation: slideIn 1s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-search {
    display: flex;
    gap: 1rem;
    justify-content: center;
    animation: searchBounce 1s ease-in-out;
    position: relative;
    max-width: 800px;
    margin: 0 auto;
  }

  .search-input {
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    border: 2px solid transparent;
    border-radius: 25px;
    outline: none;
    width: 400px;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    backdrop-filter: blur(10px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: inputPulse 2s infinite, glow 3s infinite;
    box-shadow: 0 0 15px rgba(241, 96, 0, 0.3);
    letter-spacing: 0.5px;
  }

  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  .search-input:focus {
    background: rgba(255, 255, 255, 0.25);
    width: 450px;
    box-shadow: 0 0 25px rgba(216, 146, 146, 0.5);
    border: 2px solid rgba(214, 216, 146, 0.5);
    transform: translateY(-2px);
  }

  .search-input:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .search-button {
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 25px;
    background: linear-gradient(135deg, #92d8be, #7ac5a8);
    color: #23232f;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(146, 216, 190, 0.4);
    position: relative;
    overflow: hidden;
  }

  .search-button:hover {
    background: linear-gradient(135deg, #f5ce8d, #f3b55e);
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 6px 20px rgba(245, 206, 141, 0.5);
  }

  .search-button:active {
    transform: scale(0.98);
  }

  @keyframes glow {
    0% { box-shadow: 0 0 15px rgba(215, 117, 81, 0.3); }
    50% { box-shadow: 0 0 25px rgba(190, 113, 68, 0.5); }
    100% { box-shadow: 0 0 15px rgba(200, 96, 22, 0.3); }
  }
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .search-input {
    width: 80%;
  }
}
</style>
