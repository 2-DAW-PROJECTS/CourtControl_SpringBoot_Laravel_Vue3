import axios from 'axios';

const API_URL = 'http://localhost:8085/api/summers';

export const getSummers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getSummerById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};