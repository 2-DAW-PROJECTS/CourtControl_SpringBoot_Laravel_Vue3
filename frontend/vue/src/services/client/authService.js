import axios from 'axios';

const API_URL = 'http://localhost:8085/api/auth';

class AuthService {
    async login(user) {
        try {
          const response = await axios.post(`${API_URL}/login`, {
            email: user.email,
            password: user.password,
          });
          return response; // Retornar la respuesta, que contendrá ambos tokens
        } catch (error) {
          console.error("Error during login:", error.response ? error.response.data : error.message);
          throw error;
        }
      }




    async register(user) {
        // console.log("llega al register del service con ", user);
        try {
            const response = await axios.post(`${API_URL}/register`, {
                name: user.name,
                email: user.email,
                password: user.password,
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.error("Error during registration:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

}

export default new AuthService();