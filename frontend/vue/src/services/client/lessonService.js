import axios from 'axios';

const API_URL = 'http://localhost:8085/api/lessons';

class LessonService {
    async GetLessons(filters) {
        let url = API_URL;
        let params = {};

        if (filters.sport && filters.sport.length > 0 && filters.sport[0] !== '') {
            params.sportIds = filters.sport.join(',');
        }

        if (filters.search) {
            params.search = filters.search;
        }

        return await axios.get(url, { params });
    }
}

export default new LessonService();
