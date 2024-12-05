import Constant from '@/Constant';
import LessonServiceDashboard from '@/services/dashboard/lessonServiceDashboard';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const lessonsDashboard = {
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
        [Constant.ADD_LESSON](state, lesson) {
            state.lessons.push(lesson);
        },
        [Constant.UPDATE_LESSON](state, updatedLesson) {
            const index = state.lessons.findIndex(lesson => lesson.id === updatedLesson.id);
            if (index !== -1) {
                state.lessons.splice(index, 1, updatedLesson);
            }
        },
        [Constant.DELETE_LESSON](state, id) {
            state.lessons = state.lessons.filter(lesson => lesson.id !== id);
        },
        UPDATE_FILTERS(state, filters) {
            state.filters = { ...state.filters, ...filters };
        }
    },
    actions: {
        async [Constant.INITIALIZE_LESSONS]({ commit }, page = 1) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await LessonServiceDashboard.GetLessons(page);
                if (response.status === Constant.STATUS_OK) {
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
        async [Constant.ADD_LESSON]({ commit }, lessonData) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await LessonServiceDashboard.CreateLesson(lessonData);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.ADD_LESSON, response.data);
                    toaster.success('Lesson created successfully');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error creating lesson');
                console.error('Error creating lesson:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        async [Constant.UPDATE_LESSON]({ commit }, lessonData) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await LessonServiceDashboard.UpdateLesson(lessonData);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.UPDATE_LESSON, response.data);
                    toaster.success('Lesson updated successfully');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error updating lesson');
                console.error('Error updating lesson:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        async [Constant.DELETE_LESSON]({ commit }, id) {
            commit(Constant.SET_LOADING, true);
            try {
                const response = await LessonServiceDashboard.DeleteLesson(id);
                if (response.status === Constant.STATUS_OK) {
                    commit(Constant.DELETE_LESSON, id);
                    toaster.success('Lesson deleted successfully');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                commit(Constant.SET_ERROR, error.message);
                toaster.error('Error deleting lesson');
                console.error('Error deleting lesson:', error);
            } finally {
                commit(Constant.SET_LOADING, false);
            }
        },
        updateFilters({ commit, dispatch }, filters) {
            commit('UPDATE_FILTERS', filters);
            dispatch(Constant.INITIALIZE_LESSONS);
        }
    },
    getters: {
        allLessons: state => state.lessons,
        currentLesson: state => state.currentLesson,
        isLoading: state => state.loading,
        getError: state => state.error,
        getFilters: state => state.filters,
        getLessonById: (state) => (id) => {
            return state.lessons.find(lesson => lesson.id === id);
        }
    }
};
