<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="@/assets/logo.png" alt="Poliesportiu Logo" class="logo-glow bounce" />
          <div class="brand-text">
            <p class="copyright">&copy; 2024 CourtControl</p>
            <p class="slogan">Precisión en cada jugada, control en cada espacio.</p>
          </div>
        </div>
        
        <div class="footer-links">
          <router-link to="/privacy-policy" class="link-hover">Privacidad</router-link>
          <router-link to="/terms" class="link-hover">Términos</router-link>
          <router-link to="/contact" class="link-hover">Contacto</router-link>
          <router-link to="/about" class="link-hover">Sobre Nosotros</router-link>
        </div>

        <div class="footer-social">
          <p class="social-title">Síguenos en:</p>
          <div class="social-links">
            <a href="#" class="social-link"><span class="social-text">Instagram</span></a>
            <a href="#" class="social-link"><span class="social-text">Twitter</span></a>
            <a href="#" class="social-link"><span class="social-text">Facebook</span></a>
          </div>
          <p class="address">Valencia, España</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background-color: #23232f;
  padding: 20px 0;
  border-top: 1px solid #92d8be;
  box-shadow: 0 -4px 20px rgba(146, 216, 190, 0.15);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 15px;
}

.footer-brand img {
  height: 60px;
  filter: drop-shadow(0 0 8px rgba(146, 216, 190, 0.4));
}

.bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.copyright {
  color: #f6f1de;
  font-size: 14px;
  text-shadow: 0 0 10px rgba(146, 216, 190, 0.2);
}

.slogan {
  color: #f5ce8d;
  font-size: 12px;
  font-style: italic;
}

.footer-social {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links{
  display: flex;
  gap: 20px;
}

.social-title {
  color: #fc9b70;
  font-size: 14px;
  margin-bottom: 8px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.link-hover {
  color: #f6f1de;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  padding: 5px 0;
}

.link-hover::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background: linear-gradient(to right, #92d8be, #f5ce8d);
  transition: width 0.3s ease;
}

.link-hover:hover::after {
  width: 100%;
}

.social-link {
  color: #fc9b70;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-text {
  display: inline-block;
  transition: transform 0.3s ease;
}

.social-link:hover .social-text {
  transform: translateY(-2px);
  color: #eb6a65;
  text-shadow: 0 2px 10px rgba(235, 106, 101, 0.4);
}

.address {
  color: #9bada1;
  font-size: 12px;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .footer-brand {
    flex-direction: column;
  }

  .footer-links {
    align-items: center;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-brand img {
    height: 50px;
  }

  .footer-links, .social-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
