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
<!-- 
<style scoped>
.header {
  background-color: #23232f;
  padding: 0px 20px;
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 30px rgba(146, 216, 190, 0.2);
  border-bottom: 2px solid #92d8be;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo img {
  height: 100px;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo-glow {
  filter: drop-shadow(0 0 8px rgba(146, 216, 190, 0.6));
}

.logo img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 15px rgba(146, 216, 190, 0.8));
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
  background-color: #92d8be;
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
  color: #f6f1de;
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
  background-color: #92d8be;
  color: #23232f;
  box-shadow: 0 0 25px rgba(146, 216, 190, 0.3);
  transform: translateY(-2px);
}

.router-link-active {
  background-color: #9bada1;
  color: #23232f;
  box-shadow: 0 0 20px rgba(155, 173, 161, 0.4);
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
    background-color: #23232f;
    border-left: 2px solid #92d8be;
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
</style> -->

<style scoped>
.header {
  background-color: #23232f;
  padding: 0px 15px;
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(146, 216, 190, 0.15);
  border-bottom: 1px solid #92d8be;
  height: 70px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
}

.logo img {
  height: 80px;
  margin-top: 15px;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo-glow {
  filter: drop-shadow(0 0 8px rgba(146, 216, 190, 0.4));
}

.logo img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 12px rgba(146, 216, 190, 0.6));
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.menu-toggle span {
  width: 100%;
  height: 2px;
  background-color: #92d8be;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #f6f1de;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #92d8be;
  color: #23232f;
  box-shadow: 0 0 20px rgba(146, 216, 190, 0.2);
  transform: translateY(-1px);
}

.router-link-active {
  background-color: #9bada1;
  color: #23232f;
  box-shadow: 0 0 15px rgba(155, 173, 161, 0.3);
}

@media (max-width: 1024px) {
  .nav ul {
    gap: 12px;
  }
  
  .nav-link {
    font-size: 13px;
    padding: 6px 14px;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 60px;
    right: -100%;
    width: 80%;
    max-width: 400px;
    height: calc(100vh - 60px);
    background-color: #23232f;
    border-left: 1px solid #92d8be;
    padding: 20px;
    transition: right 0.3s ease;
  }

  .nav-active {
    right: 0;
  }

  .nav ul {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .nav-link {
    font-size: 16px;
    width: 100%;
    text-align: center;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0 10px;
    height: 50px;
  }

  .logo img {
    height: 35px;
  }

  .nav {
    top: 50px;
    width: 100%;
    max-width: none;
    height: calc(100vh - 50px);
  }
}
</style>
