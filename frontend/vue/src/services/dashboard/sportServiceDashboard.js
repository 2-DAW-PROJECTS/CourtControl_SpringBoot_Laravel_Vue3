import axios from 'axios';

const API_URL = 'http://localhost:8085/api/dashboard/sports';

class SportServiceDashboard {
    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
                // Add any dashboard-specific headers here
                'X-Dashboard-Access': true
            }
        });
    }

    async GetSports() {
        return await this.handleRequest(
            this.axios.get('/')
        );
    }

    async GetOneSport(id) {
        return await this.handleRequest(
            this.axios.get(`/${id}`)
        );
    }

    async CreateSport(sportData) {
        return await this.handleRequest(
            this.axios.post('/', sportData)
        );
    }

    async UpdateSport(sportData) {
        return await this.handleRequest(
            this.axios.put(`/${sportData.id}`, sportData)
        );
    }

    async DeleteSport(id) {
        return await this.handleRequest(
            this.axios.delete(`/${id}`)
        );
    }

    // Advanced dashboard-specific methods
    async getSportsStats() {
        return await this.handleRequest(
            this.axios.get('/stats')
        );
    }

    async bulkUpdateSports(sportsData) {
        return await this.handleRequest(
            this.axios.patch('/bulk-update', sportsData)
        );
    }

    async handleRequest(requestPromise) {
        try {
            const response = await requestPromise;
            return response;
        } catch (error) {
            if (error.response) {
                // Handle specific HTTP error responses
                switch (error.response.status) {
                    case 400:
                        throw new Error('Invalid data provided');
                    case 401:
                        throw new Error('Unauthorized access');
                    case 403:
                        throw new Error('Forbidden access');
                    case 404:
                        throw new Error('Resource not found');
                    default:
                        throw new Error('Server error occurred');
                }
            }
            throw new Error('Network error occurred');
        }
    }
}

export default new SportServiceDashboard();
