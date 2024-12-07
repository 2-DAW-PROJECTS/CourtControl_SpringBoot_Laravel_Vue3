import axios from 'axios';

const API_URL = 'http://localhost:8085/api/lessons';

class LessonServiceDashboard {
    async GetLessons(page = 1) {
        const url = `${API_URL}?page=${page}`;
        return await axios.get(url);
    }

    async GetOneLesson(id) {
        const url = `${API_URL}/${id}`;
        return await axios.get(url);
    }

    async CreateLesson(lessonData) {
        return await axios.post(API_URL, lessonData);
    }

    async UpdateLesson(lessonData) {
        const url = `${API_URL}/${lessonData.id}`;
        return await axios.put(url, lessonData);
    }

    async DeleteLesson(id) {
        const url = `${API_URL}/${id}`;
        return await axios.delete(url);
    }
}

export default new LessonServiceDashboard();
