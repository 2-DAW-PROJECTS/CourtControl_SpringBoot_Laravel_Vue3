import axios from 'axios';

const API_URL = 'http://localhost:8085/api/courts';

export const getCourts = async (filters) => {
    let params = {};

    if (filters.sport && filters.sport.length > 0 && filters.sport[0] !== '') {
        params.sportIds = filters.sport.join(',');
    }
    if (filters.search) {
        params.search = filters.search;
    }

    const response = await axios.get(API_URL, { params });
    return response.data;
};

export const getCourtById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};