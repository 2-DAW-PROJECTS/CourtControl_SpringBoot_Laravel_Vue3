import axios from 'axios';
import store from '@/store/modules/client/auth'; 

const API_URL = 'http://localhost:8085/api/users';

class UserService {
  async updateUserProfile(user) {
    const token = store.state.accessToken; 
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.put(`${API_URL}/profile`, user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  }
}

export default new UserService();