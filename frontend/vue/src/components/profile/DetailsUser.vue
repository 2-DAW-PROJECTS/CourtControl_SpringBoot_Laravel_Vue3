<template>
  <div class="details-user">
    <!-- Validamos si el objeto 'user' está disponible -->
    <div v-if="user">
      <div class="user-info">
        <p><strong>Nombre:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Fecha de creación:</strong> {{ formattedCreatedAt }}</p>
        <p><strong>Roles:</strong> {{ user.roles.join(', ') }}</p>
      </div>
    </div>
    <div v-else>
      <p>Cargando detalles del perfil...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsUser",
  props: {
    user: {
      type: Object,
      default: null,  // El valor por defecto es 'null', en caso de que no se pase un usuario
    },
  },
  computed: {
    formattedCreatedAt() {
      // Aseguramos que 'user.createdAt' exista antes de formatearlo
      return this.user && this.user.createdAt
        ? new Date(this.user.createdAt).toLocaleDateString()
        : 'Fecha no disponible';  // Si no hay fecha, mostramos un mensaje adecuado
    },
  },
};
</script>

<style scoped>
.details-user {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-info p {
  font-size: 16px;
  margin: 10px 0;
}

strong {
  font-weight: bold;
}
</style>
