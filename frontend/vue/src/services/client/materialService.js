import axios from 'axios';

const API_URL = 'http://localhost:8085/api/courts/materials';

class MaterialService {
    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Add request interceptor
        this.axios.interceptors.request.use(
            config => config,
            error => {
                console.error('Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Add response interceptor
        this.axios.interceptors.response.use(
            response => response,
            error => {
                if (error.code === 'ERR_NETWORK') {
                    console.error('Network Error - Please check if the backend server is running');
                }
                return Promise.reject(error);
            }
        );
    }

    async GetMaterials(url) {
        return await this.handleRequest(this.axios.get(url));
    }

    async GetMaterialsPaginate(page = 1) {
        return await this.handleRequest(this.axios.get(`/paginate?page=${page}`));
    }

    async GetOneMaterial(id) {
        return await this.handleRequest(this.axios.get(`/${id}`));
    }

    async handleRequest(request) {
        try {
            const response = await request;
            return response;
        } catch (error) {
            console.error('MaterialService Error:', error);
            throw error;
        }
    }
}

export default new MaterialService();