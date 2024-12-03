import axios from 'axios';

const API_URL = 'http://localhost:8085/api/materials';

class MaterialService {
    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Client-side methods
    async getMaterials() {
        return await this.handleRequest(this.axios.get('/'));
    }

    async getMaterialById(id) {
        return await this.handleRequest(this.axios.get(`/${id}`));
    }

    // Dashboard methods
    async GetMaterials() {
        return await this.handleRequest(this.axios.get('/dashboard'));
    }

    async GetOneMaterial(id) {
        return await this.handleRequest(this.axios.get(`/dashboard/${id}`));
    }

    async CreateMaterial(materialData) {
        return await this.handleRequest(this.axios.post('/dashboard', materialData));
    }

    async UpdateMaterial(materialData) {
        return await this.handleRequest(this.axios.put(`/dashboard/${materialData.id}`, materialData));
    }

    async DeleteMaterial(id) {
        return await this.handleRequest(this.axios.delete(`/dashboard/${id}`));
    }

    // Filter and Search methods
    async searchMaterials(query) {
        return await this.handleRequest(this.axios.get(`/search?q=${query}`));
    }

    async getMaterialsByCategory(category) {
        return await this.handleRequest(this.axios.get(`/category/${category}`));
    }

    async getMaterialsByStatus(status) {
        return await this.handleRequest(this.axios.get(`/status/${status}`));
    }

    async filterMaterials(filters) {
        return await this.handleRequest(this.axios.get('/filter', { params: filters }));
    }

    // Bulk operations
    async bulkUpdateMaterials(materialsData) {
        return await this.handleRequest(this.axios.post('/bulk-update', materialsData));
    }

    // Statistics and Reports
    async getMaterialStats() {
        return await this.handleRequest(this.axios.get('/stats'));
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

export default new MaterialService();
