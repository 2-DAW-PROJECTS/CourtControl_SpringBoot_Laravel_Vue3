import axios from 'axios';

const API_URL = 'http://localhost:8085/api/bookings/court';

class ReservationService {
    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        // Add request interceptor to update token
        this.axios.interceptors.request.use(config => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Add response interceptor for error handling
        this.axios.interceptors.response.use(
            response => response,
            async error => {
                if (error.response && error.response.status === 403) {
                    console.error('Forbidden - You do not have permission to access this resource');
                } else if (error.code === 'ERR_NETWORK') {
                    console.error('Network Error - Please check if the backend server is running');
                }
                return Promise.reject(error);
            }
        );
    }

    async getAllReservations() {
        return await this.handleRequest(this.axios.get());
    }

    async handleRequest(request) {
        try {
            const response = await request;
            return response.data;
        } catch (error) {
            console.error('ReservationService Error:', error);
            throw error;
        }
    }
}

export default new ReservationService();