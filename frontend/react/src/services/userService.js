import axios from 'axios';

const API_URL = 'http://localhost:8085/api/users';

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const updateUser = async (userData) => {
    try {
        // console.log(userData);
        const response = await axios.put(`${API_URL}/${userData.id}`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};


export const getCurrentUser = async (token) => {
    try {
        // console.log(token);
        const response = await axios.get(`${API_URL}/profile`, {
            headers: { 
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};