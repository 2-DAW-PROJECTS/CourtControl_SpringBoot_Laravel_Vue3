// src/services/client/GetBookingsProfileService.js
import axios from 'axios';

const API_URL = 'http://localhost:8085/api/bookings/court/byuser';

export default {
  async getUserBookings(token) {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener las reservas del usuario: ' + error.message);
    }
  },

  async deleteBooking(bookingId, token) {
    try {
      const response = await axios.delete(`${API_URL}/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al eliminar la reserva: ' + error.message);
    }
  }
  ,
};
