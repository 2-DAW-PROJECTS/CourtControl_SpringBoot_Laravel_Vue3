import axios from 'axios';

const API_URL = 'http://localhost:8085/api/users';

export const updateUserProfile = async (user) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.put(`${API_URL}/profile`, user, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};