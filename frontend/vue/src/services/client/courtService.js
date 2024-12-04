import axios from 'axios';

const API_URL = 'http://localhost:8085/api/courts';

class CourtService {
    async GetCourts(filters) {
        let url = API_URL;
        let params = {};

        if (filters.sport && filters.sport.length > 0 && filters.sport[0] !== '') {
            params.sportIds = filters.sport.join(',');
        }

        if (filters.search) {
            params.search = filters.search;
        }

        console.log('Fetching courts with params:', params);
        return await axios.get(url, { params });
    }

    // Otros métodos...
}

export default new CourtService();