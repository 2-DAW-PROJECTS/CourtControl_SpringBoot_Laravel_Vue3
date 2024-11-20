import axios from 'axios';

// URL de tu backend (asegúrate de que sea la URL correcta del servidor de Spring Boot)
const API_URL = 'http://localhost:8085/api/sports'; // Ajusta esta URL si es diferente

// Función para obtener los deportes desde el backend
export const getSports = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Retorna la lista de deportes
  } catch (error) {
    console.error('Error fetching sports:', error);
    throw error;  // Lanza el error para manejarlo en el componente
  }
};
