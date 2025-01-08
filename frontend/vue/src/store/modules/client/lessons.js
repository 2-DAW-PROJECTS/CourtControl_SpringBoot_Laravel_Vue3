import Constant from '@/Constant';
import LessonService from '@/services/client/lessonService';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const lessons = {
    namespaced: true,
    state: {
        lessons: [],
        currentLesson: null,
        loading: false,
        error: null,
        filters: {
            search: '',
            category: '',
            status: ''
        }
    },
    mutations: {
        [Constant.SET_LOADING](state, status) {
            state.loading = status;
        },
        [Constant.SET_ERROR](state, error) {
            state.error = error;
        },
        [Constant.INITIALIZE_LESSONS](state, lessons) {
            state.lessons = lessons;
        },
        UPDATE_FILTERS(state, filters) {
            state.filters = { ...state.filters, ...filters };
        },
        [Constant.SET_LESSON](state, lesson) {
            state.currentLesson = lesson;
        }
    },
    actions: {
        async [Constant.INITIALIZE_LESSONS]({ commit }, filters = {}) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await LessonService.GetLessons(filters);
                if (response.status === Constant.STATUS_OK) {
                    console.log('Raw data from database:', response.data); 

                    commit(Constant.INITIALIZE_LESSONS, response.data);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error loading lessons');
                console.error('Error loading lessons:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        updateFilters({ commit, dispatch }, filters) {
            commit('UPDATE_FILTERS', filters);
            dispatch(Constant.INITIALIZE_LESSONS, filters);
        },
        async [Constant.FETCH_LESSON_BY_ID]({ commit }, id) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await LessonService.GetLessonById(id);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.SET_LESSON, response.data);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error fetching lesson');
                console.error('Error fetching lesson:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        }
    },
    getters: {
        allLessons: state => state.lessons,
        currentLesson: state => state.currentLesson,
        lesson: state => state.currentLesson,
        isLoading: state => state.loading,
        getError: state => state.error,
        getFilters: state => state.filters,
        getLessonById: (state) => (id) => {
            return state.lessons.find(lesson => lesson.id === id);
        }
    }
};
