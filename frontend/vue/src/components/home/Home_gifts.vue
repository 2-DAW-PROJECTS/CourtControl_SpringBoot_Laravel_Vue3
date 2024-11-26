<template>
  <div class="custom-hero-section">
    <div class="custom-parallax-wrapper">
      <video
        autoplay
        muted
        class="background-video"
        @ended="showImage"
        ref="backgroundVideo"
      >
        <source src="@/assets/banners_home/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img
        v-if="showFixedImage"
        src="@/assets/banners_home/banner_2.jpg"
        alt="Fixed Background"
        class="fixed-background-image"
      />
      <div class="custom-overlay"></div>
      <div class="dynamic-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <div class="custom-hero-content">
        <img src="@/assets/logo.png" alt="App Logo" class="custom-logo" />
        <h1 class="hero-title">CourtControl</h1>
        <p class="hero-subtitle">Precisión en cada jugada, control en cada espacio.</p>
        <div class="search-container">
          <div class="input-wrapper">
            <input type="text" id="search" class="custom-search-input" placeholder="Busca tu equipamiento deportivo..." />
            <button class="search-button">Explorar</button>
          </div>
        </div>
      </div>
      <div class="floating-images-container">
        <img src="@/assets/banners_home/shak4.png" alt="Athlete Right" class="custom-floating-image custom-right"/>
        <img src="@/assets/banners_home/WL_jmp.png" alt="Athlete Left" class="custom-floating-image custom-left" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFixedImage: false,
    };
  },
  methods: {
    showImage() {
      this.showFixedImage = true;
      this.$refs.backgroundVideo.style.display = 'none';
      document.querySelector('.custom-overlay').style.backdropFilter = 'blur(0px)';
    },
  },
};
</script>

<style>
.custom-hero-section {
  min-height: 90vh;
  position: relative;
  overflow: hidden;
}

.background-video,
.fixed-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.custom-parallax-wrapper {
  height: 90vh;
  perspective: 2000px;
}


.custom-overlay {
  position: absolute;
  inset: 0;
  background: rgba(35, 35, 47, 0.7);
  backdrop-filter: blur(4px);
}

.custom-hero-content {
  position: relative;
  text-align: center;
  padding-top: 10vh;
  z-index: 2;
}

.custom-logo {
  width: 180px;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 30px rgba(252, 155, 112, 0.6));
  animation: pulseLogo 3s infinite;
}

.hero-title {
  font-size: 5rem;
  font-weight: 900;
  color: #f6f1de;
  margin-bottom: 1rem;
  letter-spacing: -2px;
  text-shadow: 0 0 40px rgba(146, 216, 190, 0.6);
  opacity: 0;
  animation: slideUp 1s forwards 0.5s;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #92d8be;
  margin-bottom: 3rem;
  opacity: 0;
  animation: slideUp 1s forwards 0.7s;
}

.input-wrapper {
  position: relative;
  display: inline-flex;
  width: 90%;
  max-width: 700px;
  gap: 1rem;
  opacity: 0;
  animation: slideUp 1s forwards 0.9s;
}

.custom-search-input {
  flex: 1;
  padding: 1.5rem 2rem;
  font-size: 1.1rem;
  border: 1px solid rgba(146, 216, 190, 0.3);
  border-radius: 16px;
  background: rgba(35, 35, 47, 0.9);
  color: #f6f1de;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
}

.search-button {
  padding: 0 2.5rem;
  border: none;
  border-radius: 16px;
  background: #92d8be;
  color: #23232f;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: #f5ce8d;
  transform: translateY(-2px);
}

.custom-floating-image {
  position: absolute;
  width: 600px;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  animation: fadeScale 1s forwards 1.5s;
}

.custom-floating-image.custom-right {
  right: -2%;
  top: 50%;
  transform: translateY(-50%);
  animation: floatRight 8s ease-in-out infinite, fadeScale 1s forwards 1.5s;
}

.custom-floating-image.custom-left {
  left: -2%;
  top: 50%;
  transform: translateY(-50%);
  animation: floatLeft 8s ease-in-out infinite, fadeScale 1s forwards 1.5s;
}

@keyframes morphShape {
  0%, 100% { border-radius: 50%; }
  50% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
}

@keyframes pulseLogo {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 30px rgba(252, 155, 112, 0.6)); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 50px rgba(252, 155, 112, 0.8)); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeScale {
  from { opacity: 0; transform: translateY(-50%) scale(0.9); }
  to { opacity: 1; transform: translateY(-50%) scale(1); }
}

@keyframes floatRight {
  0%, 100% { transform: translateY(-50%) translateX(0) scale(1); }
  50% { transform: translateY(-55%) translateX(30px) scale(1.02); }
}

@keyframes floatLeft {
  0%, 100% { transform: translateY(-50%) translateX(0) scale(1); }
  50% { transform: translateY(-55%) translateX(-30px) scale(1.02); }
}

@media (max-width: 1440px) {
  .custom-hero-section,
  .custom-parallax-wrapper { min-height: 68vh; }
  .custom-hero-content { 
    padding-top: 4vh;
    transform: translateY(10vh); 
  }
  .hero-title { font-size: 3.2rem; }
  .hero-subtitle { font-size: 1.12rem; margin-bottom: 1.6rem; }
  .custom-floating-image { width: 360px; }
  .custom-logo { width: 120px; margin-bottom: 1.2rem; }
}

@media (max-width: 1200px) {
  .custom-hero-section,
  .custom-parallax-wrapper { min-height: 80vh; }
  .custom-hero-content { 
    padding-top: 3vh;
    transform: translateY(10vh); 
  }
  .hero-title { font-size: 3.5rem; }
  .hero-subtitle { font-size: 1.3rem; }
  .custom-floating-image { width: 400px; }
  .custom-logo { width: 140px; }
  .input-wrapper { width: 80%; }
}

@media (max-width: 1024px) {
  .custom-hero-section,
  .custom-parallax-wrapper { min-height: 75vh; }
  .custom-hero-content { 
    padding-top: 2vh;
    transform: translateY(10vh); 
  }
  .hero-title { font-size: 3rem; }
  .hero-subtitle { font-size: 1.2rem; }
  .custom-floating-image { width: 350px; opacity: 0.8; }
  .custom-logo { width: 130px; }
  .input-wrapper { width: 75%; }
}

@media (min-width: 1280px) and (max-width: 1399px) {
  .custom-hero-section,
  .custom-parallax-wrapper { min-height: 64vh; }
  .custom-hero-content { 
    padding-top: 2.4vh;
    transform: translateY(10vh); 
  }
  .hero-title { font-size: 2.56rem; margin-bottom: 0.4rem; }
  .hero-subtitle { font-size: 0.96rem; margin-bottom: 1.2rem; }
  .custom-floating-image { width: 280px; top: 33.6%; }
  .custom-logo { width: 96px; margin-bottom: 0.8rem; }
  .input-wrapper { width: 56%; max-width: 480px; }
}

@media (max-width: 768px) {
  .input-wrapper {
    flex-direction: column;
    gap: 1rem;
  }
  .search-button {
    width: 100%;
    padding: 1rem;
  }
  .custom-search-input {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .custom-hero-section,
  .custom-parallax-wrapper { min-height: 65vh; }
  .custom-hero-content { 
    padding-top: 2vh;
    transform: translateY(10vh); 
  }
  .hero-title { font-size: 2rem; }
  .hero-subtitle { font-size: 1rem; }
  .custom-floating-image { width: 250px; opacity: 0.4; }
  .custom-logo { width: 110px; }
  .input-wrapper { width: 85%; }
}
</style>


<!-- <template>
  <div class="custom-hero-section">
    <div class="custom-parallax-wrapper">
      <video autoplay muted loop class="background-video">
        <source src="@/assets/banners_home/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="custom-overlay"></div>
      <div class="custom-hero-content">
        <img src="@/assets/logo.png" alt="App Logo" class="custom-logo" />
        <h1 class="hero-title">CourtControl</h1>
        <p class="hero-subtitle">Precisión en cada jugada, control en cada espacio.</p>
        <div class="search-container">
          <div class="input-wrapper">
            <input type="text" id="search" class="custom-search-input" placeholder="Busca tu equipamiento deportivo..." />
            <button class="search-button">Explorar</button>
          </div>
        </div>
      </div>
      <div class="floating-images-container">
        <img src="@/assets/banners_home/shak2.png" alt="Athlete Right" class="custom-floating-image custom-right" />
        <img src="@/assets/banners_home/WL_jmp.png" alt="Athlete Left" class="custom-floating-image custom-left" />
      </div>
    </div>
  </div>
</template>

<style>
.custom-hero-section {
  min-height: 90vh;
  position: relative;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.custom-parallax-wrapper {
  height: 90vh;
  perspective: 2000px;
}

.dynamic-shapes .shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: morphShape 20s infinite;
}

.shape-1 {
  background: #92d8be;
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
}

.shape-2 {
  background: #fc9b70;
  width: 400px;
  height: 400px;
  bottom: -200px;
  right: -200px;
}

.shape-3 {
  background: #f5ce8d;
  width: 250px;
  height: 250px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.custom-overlay {
  position: absolute;
  inset: 0;
  background: rgba(35, 35, 47, 0.7);
  backdrop-filter: blur(4px);
}

.custom-hero-content {
  position: relative;
  text-align: center;
  padding-top: 10vh;
  z-index: 2;
}

.custom-logo {
  width: 180px;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 30px rgba(252, 155, 112, 0.6));
  animation: pulseLogo 3s infinite;
}

.hero-title {
  font-size: 5rem;
  font-weight: 900;
  color: #f6f1de;
  margin-bottom: 1rem;
  letter-spacing: -2px;
  text-shadow: 0 0 40px rgba(146, 216, 190, 0.6);
  opacity: 0;
  animation: slideUp 1s forwards 0.5s;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #92d8be;
  margin-bottom: 3rem;
  opacity: 0;
  animation: slideUp 1s forwards 0.7s;
}

.input-wrapper {
  position: relative;
  display: inline-flex;
  width: 90%;
  max-width: 700px;
  gap: 1rem;
  opacity: 0;
  animation: slideUp 1s forwards 0.9s;
}

.custom-search-input {
  flex: 1;
  padding: 1.5rem 2rem;
  font-size: 1.1rem;
  border: 1px solid rgba(146, 216, 190, 0.3);
  border-radius: 16px;
  background: rgba(35, 35, 47, 0.9);
  color: #f6f1de;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
}

.search-button {
  padding: 0 2.5rem;
  border: none;
  border-radius: 16px;
  background: #92d8be;
  color: #23232f;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: #f5ce8d;
  transform: translateY(-2px);
}

.custom-floating-image {
  position: absolute;
  width: 600px;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  animation: fadeScale 1s forwards 1.5s;
}

.custom-floating-image.custom-right {
  right: -2%;
  top: 50%;
  transform: translateY(-50%);
  animation: floatRight 8s ease-in-out infinite, fadeScale 1s forwards 1.5s;
}

.custom-floating-image.custom-left {
  left: -2%;
  top: 50%;
  transform: translateY(-50%);
  animation: floatLeft 8s ease-in-out infinite, fadeScale 1s forwards 1.5s;
}

@keyframes morphShape {
  0%, 100% { border-radius: 50%; }
  50% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
}

@keyframes pulseLogo {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 30px rgba(252, 155, 112, 0.6)); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 50px rgba(252, 155, 112, 0.8)); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeScale {
  from { opacity: 0; transform: translateY(-50%) scale(0.9); }
  to { opacity: 1; transform: translateY(-50%) scale(1); }
}

@keyframes floatRight {
  0%, 100% { transform: translateY(-50%) translateX(0) scale(1); }
  50% { transform: translateY(-55%) translateX(30px) scale(1.02); }
}

@keyframes floatLeft {
  0%, 100% { transform: translateY(-50%) translateX(0) scale(1); }
  50% { transform: translateY(-55%) translateX(-30px) scale(1.02); }
}

@media (max-width: 1440px) {
  .custom-hero-section,
  .custom-parallax-wrapper { min-height: 68vh; }
  .custom-hero-content { 
    padding-top: 4vh;
    transform: translateY(10vh); 
  }
  .hero-title { font-size: 3.2rem; }
  .hero-subtitle { font-size: 1.12rem; margin-bottom: 1.6rem; }
  .custom-floating-image { width: 360px; }
  .custom-logo { width: 120px; margin-bottom: 1.2rem; }
}

@media (max-width: 1200px) {
  .custom-hero-section,
  .custom-parallax-wrapper { min-height: 80vh; }
  .custom-hero-content { 
    padding-top: 3vh;
    transform: translateY(10vh); 
  }
  .hero-title { font-size: 3.5rem; }
  .hero-subtitle { font-size: 1.3rem; }
  .custom-floating-image { width: 400px; }
  .custom-logo { width: 140px; }
  .input-wrapper { width: 80%; }
}

@media (max-width: 1024px) {
  .custom-hero-section,
  .custom-parallax-wrapper { min-height: 75vh; }
  .custom-hero-content { 
    padding-top: 2vh;
    transform: translateY(10vh); 
  }
  .hero-title { font-size: 3rem; }
  .hero-subtitle { font-size: 1.2rem; }
  .custom-floating-image { width: 350px; opacity: 0.8; }
  .custom-logo { width: 130px; }
  .input-wrapper { width: 75%; }
}

@media (min-width: 1280px) and (max-width: 1399px) {
  .custom-hero-section,
  .custom-parallax-wrapper { min-height: 64vh; }
  .custom-hero-content { 
    padding-top: 2.4vh;
    transform: translateY(10vh); 
  }
  .hero-title { font-size: 2.56rem; margin-bottom: 0.4rem; }
  .hero-subtitle { font-size: 0.96rem; margin-bottom: 1.2rem; }
  .custom-floating-image { width: 280px; top: 33.6%; }
  .custom-logo { width: 96px; margin-bottom: 0.8rem; }
  .input-wrapper { width: 56%; max-width: 480px; }
}

@media (max-width: 768px) {
  .input-wrapper {
    flex-direction: column;
    gap: 1rem;
  }
  .search-button {
    width: 100%;
    padding: 1rem;
  }
  .custom-search-input {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .custom-hero-section,
  .custom-parallax-wrapper { min-height: 65vh; }
  .custom-hero-content { 
    padding-top: 2vh;
    transform: translateY(10vh); 
  }
  .hero-title { font-size: 2rem; }
  .hero-subtitle { font-size: 1rem; }
  .custom-floating-image { width: 250px; opacity: 0.4; }
  .custom-logo { width: 110px; }
  .input-wrapper { width: 85%; }
}
</style>
 -->
