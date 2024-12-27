import axios from 'axios';

const API_URL = 'http://localhost:8085/api/users';

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
        throw error;
    }
};