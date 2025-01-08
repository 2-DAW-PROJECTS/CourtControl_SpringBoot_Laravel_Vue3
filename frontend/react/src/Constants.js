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
    CREATE_LESSON: 'lessons/createLesson',
    UPDATE_LESSON: 'lessons/updateLesson',
    DELETE_LESSON: 'lessons/deleteLesson',

    // Summer actions
    FETCH_SUMMERS: 'summers/fetchSummers',
    FETCH_SUMMER_BY_ID: 'summers/fetchSummerById',
    CREATE_SUMMER: 'CREATE_SUMMER',
    UPDATE_SUMMER: 'UPDATE_SUMMER',
    DELETE_SUMMER: 'DELETE_SUMMER',

    // Reservation actions
    FETCH_ALL_BOOKINGS : 'bookings/fetchAll',
    FETCH_BOOKING_BY_ID : 'bookings/fetchById',
    CREATE_BOOKING : 'bookings/create',
    UPDATE_BOOKING : 'bookings/update',
    DELETE_BOOKING : 'bookings/delete',

    // Lesson Reservation actions
    FETCH_ALL_LESSON_BOOKINGS: 'lessonBookings/fetchAll',
    FETCH_LESSON_BOOKING_BY_ID: 'lessonBookings/fetchById',
    CREATE_LESSON_BOOKING: 'lessonBookings/create',
    UPDATE_LESSON_BOOKING: 'lessonBookings/update',
    DELETE_LESSON_BOOKING: 'lessonBookings/delete',


    // Status codes
    STATUS_OK: 200,
    STATUS_CREATED: 201,
    STATUS_BAD_REQUEST: 400,
    STATUS_IDLE : 'idle',
    STATUS_LOADING : 'loading',
    STATUS_SUCCEEDED : 'succeeded',
    STATUS_FAILED : 'failed',
};

export default Constants;