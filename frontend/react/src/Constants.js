const Constants = {
    // User actions
    FETCH_USER_PROFILE: 'FETCH_USER_PROFILE',
    SET_USER_PROFILE: 'SET_USER_PROFILE',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    FETCH_USERS: 'FETCH_USERS',
    FETCH_USER_BY_ID: 'FETCH_USER_BY_ID',
    ADD_USER: 'ADD_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',

    // Court actions
    FETCH_COURTS: 'courts/fetchCourts',
    FETCH_COURT_BY_ID: 'courts/fetchCourtById',
    CREATE_COURT: 'courts/createCourt',
    UPDATE_COURT: 'courts/updateCourt',
    DELETE_COURT: 'courts/deleteCourt',

    // Lesson actions
    FETCH_LESSONS: 'lessons/fetchLessons',
    FETCH_LESSON_BY_ID: 'lessons/fetchLessonById',

    // Summer actions
    FETCH_SUMMERS: 'summers/fetchSummers',
    FETCH_SUMMER_BY_ID: 'summers/fetchSummerById',

    // Status codes
    STATUS_OK: 200,
    STATUS_CREATED: 201,
    STATUS_BAD_REQUEST: 400,
};

export default Constants;