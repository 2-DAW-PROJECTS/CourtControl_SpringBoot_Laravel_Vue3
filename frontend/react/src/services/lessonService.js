import axios from 'axios';

const API_URL = 'http://localhost:8085/api/lessons';

export const getLessons = async (filters = {}) => {
    let params = {};

    if (filters.search) {
        params.search = filters.search;
    }

    try {
        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const getLessonById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
