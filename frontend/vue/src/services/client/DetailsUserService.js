import axios from 'axios';

const API_URL = 'http://localhost:8085/api/users/profile';

export const DetailsUserService = {
  async getUserProfile(token) {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;  // Retorna los datos del perfil
    } catch (error) {
      console.error('Error fetching profile data:', error);  // Log de error
      throw error;  // Propaga el error para que se maneje más arriba
    }
  },
};
