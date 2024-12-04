import axios from 'axios';

const API_URL = 'http://localhost:8085/api/courts';

class CourtServiceDashboard {
    async GetCourts(page = 1) {
        const url = `${API_URL}?page=${page}`;
        console.log('Fetching courts from URL:', url);
        return await axios.get(url);
    }

    async GetOneCourt(id) {
        const url = `${API_URL}/${id}`;
        console.log('Fetching court from URL:', url);
        return await axios.get(url);
    }

    async CreateCourt(courtData) {
        console.log('Creating court with data:', courtData);
        return await axios.post(API_URL, courtData);
    }

    async UpdateCourt(courtData) {
        const url = `${API_URL}/${courtData.id}`;
        console.log('Updating court with data:', courtData);
        return await axios.put(url, courtData);
    }

    async DeleteCourt(id) {
        const url = `${API_URL}/${id}`;
        console.log('Deleting court with ID:', id);
        return await axios.delete(url);
    }

    async handleRequest(request) {
        try {
            const response = await request;
            return response.data;
        } catch (error) {
            console.error('CourtServiceDashboard Error:', error);
            throw error;
        }
    }
}

export default new CourtServiceDashboard();