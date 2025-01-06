import axios from 'axios';

const API_URL = 'http://localhost:8085/api/summers';

export const getSummers = async (filters = {}) => {
    let params = {};

    if (filters.search) {
        params.search = filters.search;
    }

    try {
        const response = await axios.get(`${API_URL}`, { params });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const getSummerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const createSummer = async (summerData) => {
    try {
        const response = await axios.post(`${API_URL}`, summerData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const updateSummer = async (id, summerData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, summerData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const deleteSummer = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
// import axios from 'axios';

// const API_URL = 'http://localhost:8085/api/summers';

// export const getSummers = async () => {
//     const response = await axios.get(API_URL);
//     return response.data;
// };

// export const getSummerById = async (id) => {
//     const response = await axios.get(`${API_URL}/${id}`);
//     return response.data;
// };