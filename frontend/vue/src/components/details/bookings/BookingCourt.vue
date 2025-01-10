<template>
    <div class="booking-court-container">
    <br>
      <div class="calendar-section">
        <h3 class="calendar-title">Seleccione un día</h3>
        <div class="month-selector">
          <button class="month-button" @click="changeMonth(-1)">← Mes anterior</button>
          <span class="current-month">{{ currentMonthName }} {{ currentYear }}</span>
          <button class="month-button" @click="changeMonth(1)">Mes siguiente →</button>
        </div>
  
        <div class="days-grid">
          <div
            v-for="day in daysInMonth"
            :key="day.date"
            class="day"
            :class="{ 
              selected: day.date === selectedDate,
              'past-day': isPastDay(day.date)
            }"
            @click="!isPastDay(day.date) && selectDay(day.date)"
          >
            {{ day.day }}
          </div>
        </div>
      </div>
  
      <div class="hours-section" v-if="selectedDate">
        <h3 class="hours-title">Horas disponibles para {{ formattedSelectedDate }}</h3>
        <div class="hours">
          <div
            v-for="hour in hours"
            :key="hour.id"
            class="hour-slot"
            :class="{ selected: hour.id === selectedHour, reserved: hour.reserved }"
            @click="!hour.reserved && selectHour(hour.id)"
          >
            {{ hour.label }}
          </div>
        </div>
      </div>
  
      <button
        v-if="selectedDate && selectedHour"
        @click="reserveCourt"
        class="reserve-button"
      >
        Reservar
      </button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'BookingCourt',
    setup() {
      const router = useRouter();
      const currentYear = ref(new Date().getFullYear());
      const currentMonth = ref(new Date().getMonth());
      const daysInMonth = ref([]);
      const selectedDate = ref(null);
      const selectedHour = ref(null);
      const hours = ref([]);
  
      const currentMonthName = computed(() => {
        const date = new Date(currentYear.value, currentMonth.value);
        return date.toLocaleString('default', { month: 'long' });
      });
  
      const formattedSelectedDate = computed(() => {
        if (!selectedDate.value) return '';
        const date = new Date(selectedDate.value);
        return date.toLocaleDateString('es-ES', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
      });

      const isPastDay = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(date);
        return checkDate < today;
      };
  
      const generateDaysInMonth = () => {
        const days = [];
        const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  
        for (let day = 1; day <= lastDay.getDate(); day++) {
          const date = new Date(currentYear.value, currentMonth.value, day);
          days.push({
            day,
            date: date.toISOString().split('T')[0],
          });
        }
  
        daysInMonth.value = days;
      };
  
      const changeMonth = (direction) => {
        const newMonth = currentMonth.value + direction;
        const today = new Date();
        const newDate = new Date(currentYear.value, newMonth);
        
        if (newDate < new Date(today.getFullYear(), today.getMonth())) {
          return;
        }
        
        currentMonth.value = newMonth;
        if (currentMonth.value < 0) {
          currentMonth.value = 11;
          currentYear.value--;
        } else if (currentMonth.value > 11) {
          currentMonth.value = 0;
          currentYear.value++;
        }
        generateDaysInMonth();
        selectedDate.value = null;
        hours.value = [];
      };
  
      const selectDay = async (date) => {
        if (isPastDay(date)) return;
        
        selectedDate.value = date;
        selectedHour.value = null;
        try {
            const hoursResponse = await fetch('http://localhost:8085/api/hours');
            if (!hoursResponse.ok) throw new Error('Error al obtener las horas');
            const allHours = await hoursResponse.json();
            const idDay = new Date(date).getDate() + 1;
            const idMonth = currentMonth.value + 1;
            const postData = {
              idCourt: window.location.pathname.split('/').pop(),
              idDay,
              idMonth,
            };
            const bookingsResponse = await fetch('http://localhost:8085/api/bookings/court/filtered_day', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(postData),
            });
            let bookings = [];
            if (bookingsResponse.ok) {
              bookings = await bookingsResponse.json();
            }
            hours.value = allHours.map((hour) => ({
              id: hour.id,
              label: hour.hourTime.slice(0, 5),
              reserved: bookings.some((booking) => booking.idHour === hour.id),
            }));
        } catch (error) {
            console.error('Error en selectDay:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al obtener las horas disponibles o las reservas.'
            });
        }
      };
  
      const selectHour = (hourId) => {
        selectedHour.value = hourId;
      };
  
      const reserveCourt = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          Swal.fire({
            icon: 'warning',
            title: 'No autenticado',
            text: 'Por favor, inicia sesión para continuar.'
          });
          return;
        }
  
        const postData = {
          idDay: new Date(selectedDate.value).getDate() + 1,
          idHour: selectedHour.value,
          idMonth: currentMonth.value + 1,
          idCourt: window.location.pathname.split('/').pop(),
        };
  
        try {
          const response = await fetch('http://localhost:8085/api/bookings/court', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
          });
  
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: '¡Reserva completada!',
              text: 'Tu reserva se ha realizado con éxito',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              router.push('/shop');
            });
          } else {
            throw new Error('Error al crear la reserva');
          }
        } catch (error) {
          console.error('Error en reserveCourt:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al realizar la reserva.'
          });
        }
      };
  
      onMounted(() => {
        generateDaysInMonth();
      });
  
      return {
        currentYear,
        currentMonth,
        daysInMonth,
        selectedDate,
        selectedHour,
        hours,
        currentMonthName,
        formattedSelectedDate,
        changeMonth,
        selectDay,
        selectHour,
        reserveCourt,
        isPastDay,
      };
    },
  };
  </script>
  
  <style scoped>
  .booking-court-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 40px;
    font-family: 'Montserrat', sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  }

  .booking-title {
    color: #1a237e;
    text-align: center;
    font-size: 3em;
    margin-bottom: 40px;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  .calendar-section {
    flex: 1;
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    margin: 20px auto;
    max-width: 1200px;
    width: 100%;
  }

  .calendar-title, .hours-title {
    color: #1a237e;
    font-size: 2em;
    margin-bottom: 30px;
    text-align: center;
    font-weight: 600;
  }

  .month-selector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }

  .month-button {
    background: linear-gradient(145deg, #1a237e, #283593);
    border: none;
    color: white;
    padding: 15px 30px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .month-button:hover {
    background: linear-gradient(145deg, #283593, #1a237e);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(26,35,126,0.3);
  }

  .current-month {
    font-size: 1.8em;
    font-weight: 700;
    color: #1a237e;
    text-transform: capitalize;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 15px;
    margin-bottom: 40px;
  }

  .day {
    padding: 20px;
    background: #f8f9fa;
    text-align: center;
    cursor: pointer;
    border-radius: 15px;
    transition: all 0.3s ease;
    font-weight: 600;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .day:hover:not(.past-day) {
    background: #e8eaf6;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .day.selected {
    background: linear-gradient(145deg, #1a237e, #283593);
    color: white;
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(26,35,126,0.3);
  }

  .day.past-day {
    background: #e0e0e0;
    color: #9e9e9e;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .hours-section {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    margin: 20px auto;
    max-width: 1200px;
    width: 100%;
  }

  .hours {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    padding: 25px;
  }

  .hour-slot {
    padding: 20px;
    background: #f8f9fa;
    text-align: center;
    cursor: pointer;
    border-radius: 15px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    font-weight: 600;
  }

  .hour-slot:hover:not(.reserved) {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    background: #e8eaf6;
  }

  .hour-slot.selected {
    background: linear-gradient(145deg, #1a237e, #283593);
    color: white;
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(26,35,126,0.3);
  }

  .hour-slot.reserved {
    background: linear-gradient(145deg, #d32f2f, #c62828);
    color: white;
    cursor: not-allowed;
    opacity: 0.9;
  }

  .reserve-button {
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    background: linear-gradient(145deg, #1a237e, #283593);
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 1.4em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(26,35,126,0.3);
  }

  .reserve-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(26,35,126,0.4);
    background: linear-gradient(145deg, #283593, #1a237e);
  }

  @media (max-width: 768px) {
    .booking-court-container {
      padding: 20px;
    }

    .booking-title {
      font-size: 2em;
    }

    .hours {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 15px;
    }

    .month-button {
      padding: 10px 20px;
      font-size: 1em;
    }

    .current-month {
      font-size: 1.4em;
    }

    .day {
      padding: 15px;
    }
    
    .reserve-button {
      max-width: 100%;
    }
  }
  </style>