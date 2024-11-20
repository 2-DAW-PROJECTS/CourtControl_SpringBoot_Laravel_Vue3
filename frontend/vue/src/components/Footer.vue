<template>
  <footer class="footer">
    <div class="footer-container">
      <p>&copy; 2024 Poliesportiu - Todos los derechos reservados.</p>
      <div class="footer-links">
        <a href="/privacy-policy">Política de privacidad</a>
        <a href="/terms">Términos y condiciones</a>
        <a href="mailto:contact@poliesportiu.com">Contacto</a>
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
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-links a {
  margin: 0 15px;
  text-decoration: none;
  color: #fff;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
