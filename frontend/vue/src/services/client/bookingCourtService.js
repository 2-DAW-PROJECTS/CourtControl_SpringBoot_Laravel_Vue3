import axios from 'axios';

const API_URL = 'http://localhost:8085/api/bookings/court';

export default {
  fetchDays() {
    return axios.get(`${API_URL}/days`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,  // Asegúrate de que el token se pase correctamente
      }
    }).catch(error => {
      console.error('Error al obtener los días:', error);
      throw error; // Lanza el error para manejarlo en la parte que llama a esta función
    });
  },

  fetchHoursByDay(dayId) {
    return axios.get(`${API_URL}/hours/${dayId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,  // Asegúrate de que el token se pase correctamente
      }
    }).catch(error => {
      console.error('Error al obtener las horas:', error);
      throw error; // Lanza el error para manejarlo en la parte que llama a esta función
    });
  },

  createBooking(bookingData) {
    return axios.post(API_URL, bookingData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,  // Asegúrate de que el token se pase correctamente
      }
    }).catch(error => {
      console.error('Error al realizar la reserva:', error);
      throw error; // Lanza el error para manejarlo en la parte que llama a esta función
    });
  },
};
