import axios from 'axios';

const API_URL = 'http://localhost:8085/api/courts/materials';
class MaterialServiceDashboard {
    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-Dashboard-Access': true
            }
        });
    }

    async GetMaterials() {
        return await this.handleRequest(
            this.axios.get('/')
        );
    }

    async GetOneMaterial(id) {
        return await this.handleRequest(
            this.axios.get(`/${id}`)
        );
    }

    async CreateMaterial(materialData) {
        return await this.handleRequest(
            this.axios.post('/', materialData)
        );
    }

    async UpdateMaterial(materialData) {
        return await this.handleRequest(
            this.axios.put(`/${materialData.id}`, materialData)
        );
    }

    async DeleteMaterial(id) {
        return await this.handleRequest(
            this.axios.delete(`/${id}`)
        );
    }

    async handleRequest(requestPromise) {
        try {
            const response = await requestPromise;
            return response.data;
        } catch (error) {
            if (error.response) {
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

export default new MaterialServiceDashboard();