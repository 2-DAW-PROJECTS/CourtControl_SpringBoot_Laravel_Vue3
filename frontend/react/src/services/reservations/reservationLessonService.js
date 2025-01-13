import axios from 'axios';

const API_URL = 'http://localhost:8085/api/bookings/lessons';

export const fetchAllLessonBookings = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const fetchLessonBookingById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching booking by ID:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const createLessonBooking = async (bookingData, token) => {
    try {
        const response = await axios.post(API_URL, bookingData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const updateLessonBooking = async (id, bookingData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, bookingData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating booking:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const deleteLessonBooking = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting booking:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};