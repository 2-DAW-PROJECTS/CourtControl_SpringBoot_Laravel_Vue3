<!-- <template>
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
          <li><router-link to="/auth" class="nav-link">Login/Register</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template> -->
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
          <li v-if="!isLoggedIn"><router-link to="/auth" class="nav-link">Login/Register</router-link></li>
          <li v-else>
            <router-link to="/profile" class="nav-link">Perfil</router-link>
            <router-link to="/home" class="nav-link_logout" @click="logout">Logout</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'AppHeader',
  setup() {
    const store = useStore();

    // Computed property to check if the user is logged in
    const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);

    // Logout method
    const logout = () => {
      store.commit('auth/LOGOUT'); // Trigger logout mutation
      store.dispatch('auth/logout'); // If you want additional actions for logout
    };

    return {
      isMenuOpen: false,
      isLoggedIn,
      logout,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>


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

/* .nav-link {
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
} */
.nav-link {
  text-decoration: none;
  color: #f6f1de;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 16px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background: linear-gradient(to right, #92d8be, #f5ce8d);
  transition: width 0.3s ease;
}

.nav-link_logout {
  text-decoration: none;
  color: #f6f1de;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 16px;
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid #92d8be;
  border-radius: 20px;
  background-color: transparent;
}

.nav-link_logout:hover {
  background-color: #92d8be;
  color: #23232f;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(146, 216, 190, 0.3);
}

.nav-link_logout::after {
  display: none;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: #f6f1de;
  transform: translateY(-1px);
}

/* .router-link-active {
  background-color: #9bada1;
  color: #23232f;
  box-shadow: 0 0 15px rgba(155, 173, 161, 0.3);
} */
.router-link-active {
  color: #f6f1de;
}

.router-link-active::after {
  width: 100%;
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
