// src/services/client/bookingLessonService.js

import axios from 'axios';

// Función para realizar la reserva de una lección
export const bookingLessonService = {
  async bookLesson(bookingData) {
    try {
      // Realizamos la solicitud POST a la API para crear la reserva
      const response = await axios.post('http://localhost:8085/api/bookings/lessons', bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Usamos el token guardado en el localStorage
        },
      });

      return response.data; // Si la respuesta es exitosa, devolvemos los datos
    } catch (error) {
      // Mejora la captura del error para obtener más detalles
      if (error.response) {
        // Si la respuesta tiene detalles, los mostramos
        throw new Error(`Error ${error.response.status}: ${error.response.data.message || error.message}`);
      } else {
        // Si no hay respuesta (por ejemplo, el servidor no responde)
        throw new Error('Error al conectar con el servidor: ' + error.message);
      }
    }
  },
};
