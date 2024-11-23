<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Poliesportiu Logo" class="logo-glow" />
      </div>
      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="nav" :class="{ 'nav-active': isMenuOpen }">
        <ul>
          <li><router-link to="/home" class="nav-link">Inicio</router-link></li>
          <li><router-link to="/shop" class="nav-link">Reserva</router-link></li>
          <li><router-link to="/services" class="nav-link">Servicios</router-link></li>
          <li><router-link to="/contact" class="nav-link">Contacto</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
</script>

<style scoped>
.header {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0px 20px;
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  /* padding: 0 20px; */
}

.logo img {
  height: 100px;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo-glow {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
}

.logo img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.menu-toggle span {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.nav ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 25px;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  padding: 10px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

@media (max-width: 1024px) {
  .nav ul {
    gap: 15px;
  }
  
  .nav-link {
    font-size: 15px;
    padding: 8px 16px;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 400px;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.95);
    padding: 80px 20px;
    transition: right 0.3s ease;
  }

  .nav-active {
    right: 0;
  }

  .nav ul {
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  .nav-link {
    font-size: 18px;
    width: 100%;
    text-align: center;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 10px;
  }

  .logo img {
    height: 40px;
  }

  .nav {
    width: 100%;
    max-width: none;
  }
}
</style>
