import axios from 'axios';

const API_URL = 'http://localhost:8085/api/bookings/summers';

export const fetchAllSummerBookings = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getAllHours = async (token) => {
    try {
        const response = await axios.get('http://localhost:8085/api/hours', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const fetchSummerBookingById = async (id, token) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const createSummerBooking = async (bookingData, token) => {
    const response = await axios.post(API_URL, bookingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const updateSummerBooking = async (id, bookingData, token) => {
    const response = await axios.put(`${API_URL}/${id}`, bookingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const deleteSummerBooking = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};