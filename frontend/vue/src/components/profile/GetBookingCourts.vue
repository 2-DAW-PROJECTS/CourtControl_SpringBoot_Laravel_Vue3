<template>
    <div class="bookings-container">
      <div class="bookings-content">
        <h2>Mis Reservas</h2>
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Cargando reservas...</p>
        </div>
        <div v-else-if="error" class="error-state">
          <i class="fas fa-exclamation-circle"></i>
          <p>{{ error }}</p>
        </div>
        <div v-else class="bookings-wrapper">
          <div v-if="formattedBookings && formattedBookings.length > 0" class="bookings-list">
            <div v-for="booking in paginatedBookings" :key="booking.id" class="booking-row">
              <div class="booking-info">
                <div class="booking-header">
                  <i class="fas fa-volleyball-ball"></i>
                  <h3>Cancha {{ booking.idCourt }}</h3>
                </div>
                <div class="booking-details">
                  <div class="detail-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>{{ booking.date }}</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ booking.hour }}</span>
                  </div>
                </div>
              </div>
              <button class="delete-button" @click="deleteBooking(booking.id)">
                <i class="fas fa-trash-alt"></i>
                Eliminar
              </button>
            </div>
            <div class="pagination">
              <button 
                :disabled="currentPage === 1" 
                @click="currentPage--" 
                class="pagination-button"
              >
                <i class="fas fa-chevron-left"></i>
              </button>
              <span>{{ currentPage }} / {{ totalPages }}</span>
              <button 
                :disabled="currentPage === totalPages" 
                @click="currentPage++" 
                class="pagination-button"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div v-else class="no-bookings">
            <i class="fas fa-calendar-times"></i>
            <p>No tienes reservas realizadas.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: "GetBookingCourts",
    setup() {
      const store = useStore();
      const currentPage = ref(1);
      const itemsPerPage = 4;
  
      const isLoading = computed(() => store.state.bookingCourtsUserProfile.loading);
      const error = computed(() => store.state.bookingCourtsUserProfile.error);
      const bookings = computed(() => store.state.bookingCourtsUserProfile.userBookings || []);
  
      const formattedBookings = computed(() => {
        return bookings.value.map(booking => {
          // Convertir idMonth, idDay, idHour a una fecha más comprensible
          const date = new Date(2025, booking.idMonth - 1, booking.idDay); // Año 2025, mes ajustado por 1 (0 es enero, 1 es febrero, etc.)
          const hour = getFormattedHour(booking.idHour);
          return {
            ...booking,
            date: date.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            hour: hour,
          };
        });
      });
  
      const getFormattedHour = (hourId) => {
        const hoursList = [
          "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
          "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "16:30", "17:00", 
          "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
        ];
        return hoursList[hourId - 1] || 'Hora no disponible';
      };
  
      const totalPages = computed(() => 
        Math.ceil(formattedBookings.value.length / itemsPerPage)
      );
  
      const paginatedBookings = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return formattedBookings.value.slice(start, end);
      });
  
      const deleteBooking = (bookingId) => {
        store.dispatch('bookingCourtsUserProfile/DELETE_BOOKING', bookingId)
          .then(() => {
            alert('Reserva eliminada correctamente');
          })
          .catch((error) => {
            alert('Error al eliminar la reserva: ' + error.message);
          });
      };
  
      return {
        formattedBookings,
        paginatedBookings,
        currentPage,
        totalPages,
        isLoading,
        error,
        deleteBooking,
      };
    },
  };
  </script>
<style scoped>
.bookings-container {
  min-height: 90vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px 40px 40px;
}

.bookings-content {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px 40px 40px;
}

.bookings-content h2 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination-button:hover:not(:disabled) {
  background: #5a6fd6;
}

.pagination span {
  font-size: 1.1rem;
  color: #2c3e50;
}

.loading-state, .error-state {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.booking-row {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;
}

.booking-row:hover {
  transform: translateX(5px);
}

.booking-info {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
}

.booking-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 150px;
}

.booking-header i {
  font-size: 1.5rem;
  color: #667eea;
}

.booking-header h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0;
}

.booking-details {
  display: flex;
  gap: 2rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-item i {
  color: #667eea;
  width: 20px;
}

.detail-item span {
  color: #2c3e50;
  font-size: 1rem;
}

.delete-button {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;
}

.delete-button:hover {
  transform: scale(1.05);
}

.no-bookings {
  text-align: center;
  padding: 3rem;
}

.no-bookings i {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.no-bookings p {
  color: #666;
  font-size: 1.1rem;
}

.error-state {
  color: #e74c3c;
}

.error-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .bookings-container {
    padding: 10px 20px 20px;
  }

  .bookings-content {
    padding: 15px 20px 20px;
  }

  .bookings-content h2 {
    font-size: 2rem;
  }

  .booking-row {
    flex-direction: column;
    gap: 1rem;
  }

  .booking-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .booking-details {
    flex-direction: column;
    gap: 0.5rem;
  }

  .delete-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
