import axios from 'axios';

const API_URL = 'http://localhost:8085/api/summers';

class SummerServiceDashboard {
    async GetSummers(page = 1) {
        const url = `${API_URL}?page=${page}`;
        return await axios.get(url);
    }

    async GetOneSummer(id) {
        const url = `${API_URL}/${id}`;
        return await axios.get(url);
    }

    async CreateSummer(summerData) {
        return await axios.post(API_URL, summerData);
    }

    async UpdateSummer(summerData) {
        const url = `${API_URL}/${summerData.id}`;
        return await axios.put(url, summerData);
    }

    async DeleteSummer(id) {
        const url = `${API_URL}/${id}`;
        return await axios.delete(url);
    }
}

export default new SummerServiceDashboard();
