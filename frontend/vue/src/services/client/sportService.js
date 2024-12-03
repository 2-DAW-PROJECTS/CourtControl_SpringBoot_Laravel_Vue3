import axios from 'axios';

const API_URL = 'http://localhost:8085/api/sports';

class SportService {
    // General API configuration
    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Client-side methods
    async getSports() {
        return await this.axios.get('/');
    }

    async getSportById(id) {
        return await this.axios.get(`/${id}`);
    }

    // Dashboard methods
    async GetSports() {
        return await this.axios.get('/dashboard');
    }

    async GetOneSport(id) {
        return await this.axios.get(`/dashboard/${id}`);
    }

    async CreateSport(sportData) {
        return await this.axios.post('/dashboard', sportData);
    }

    async UpdateSport(sportData) {
        return await this.axios.put(`/dashboard/${sportData.id}`, sportData);
    }

    async DeleteSport(id) {
        return await this.axios.delete(`/dashboard/${id}`);
    }

    // Additional utility methods
    async searchSports(query) {
        return await this.axios.get(`/search?q=${query}`);
    }

    async getSportsByCategory(category) {
        return await this.axios.get(`/category/${category}`);
    }

    // Error handling wrapper
    async handleRequest(requestPromise) {
        try {
            return await requestPromise;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Server error occurred');
            }
            throw new Error('Network error occurred');
        }
    }
}

export default new SportService();
