import axios from 'axios';

const API_URL = 'http://localhost:8085/api/bookings/court';

export const getAllBookings = async (token) => {
    // console.log(`Bearer ${token}`);
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // console.log(`Bearer ${token}`);
        // console.log('Response from backend:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const getBookingById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const createBooking = async (bookingCourtDTO, token) => {
    try {
        const response = await axios.post(API_URL, bookingCourtDTO, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const updateBooking = async (id, bookingCourtDTO, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, bookingCourtDTO, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const deleteBooking = async (id, token) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};