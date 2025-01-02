import axios from 'axios';

const API_URL = 'http://localhost:8085/api/courts';

export const getCourts = async (filters = {}) => {
    let params = {};

    if (filters.sport && filters.sport.length > 0 && filters.sport[0] !== '') {
        params.sportIds = filters.sport.join(',');
    }
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

export const getCourtById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
// import axios from 'axios';

// const API_URL = 'http://localhost:8085/api/courts';

// export const getCourts = async (filters = {}) => {
//     let params = {};

//     if (filters.sport && filters.sport.length > 0 && filters.sport[0] !== '') {
//         params.sportIds = filters.sport.join(',');
//     }
//     if (filters.search) {
//         params.search = filters.search;
//     }

//     try {
//         const response = await axios.get(`${API_URL}`, { params });
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || error.message);
//     }
// };

// export const getCourtById = async (id) => {
//     try {
//         const response = await axios.get(`${API_URL}/${id}`);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || error.message);
//     }
// };
