import axios from 'axios';

const API_URL = 'http://localhost:8085/api/bookings/lessons';

export const fetchAllLessonBookings = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchLessonBookingById = async (id, token) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const createLessonBooking = async (bookingData, token) => {
    const response = await axios.post(API_URL, bookingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const updateLessonBooking = async (id, bookingData, token) => {
    const response = await axios.put(`${API_URL}/${id}`, bookingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const deleteLessonBooking = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};