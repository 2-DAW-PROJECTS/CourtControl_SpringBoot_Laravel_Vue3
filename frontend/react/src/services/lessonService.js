import axios from 'axios';

const API_URL = 'http://localhost:8085/api/lessons';

export const getLessons = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getLessonById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};