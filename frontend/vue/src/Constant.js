const Constant = {
    // Loading states
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    
    // Sport actions
    INITIALIZE_SPORT: 'INITIALIZE_SPORT',
    INITIALIZE_ONE_SPORT: 'INITIALIZE_ONE_SPORT',
    DELETE_SPORT: 'DELETE_SPORT',
    UPDATE_SPORT: 'UPDATE_SPORT',
    ADD_SPORT: 'ADD_SPORT',
    FETCH_SPORTS: 'FETCH_SPORTS',
    
    // Material actions
    INITIALIZE_MATERIAL: 'INITIALIZE_MATERIAL',
    INITIALIZE_ONE_MATERIAL: 'INITIALIZE_ONE_MATERIAL',
    DELETE_MATERIAL: 'DELETE_MATERIAL',
    UPDATE_MATERIAL: 'UPDATE_MATERIAL',
    ADD_MATERIAL: 'ADD_MATERIAL',
    FETCH_MATERIALS: 'FETCH_MATERIALS',
    FETCH_MATERIALS_BY_SPORT: 'FETCH_MATERIALS_BY_SPORT',
    UPDATE_FILTERS: 'UPDATE_FILTERS',
    
    // Courts
    INITIALIZE_COURTS: 'INITIALIZE_COURTS',
    ADD_COURT: 'ADD_COURT',
    UPDATE_COURT: 'UPDATE_COURT',
    DELETE_COURT: 'DELETE_COURT',
    FETCH_COURT_BY_ID: 'FETCH_COURT_BY_ID', 
    SET_COURT: 'SET_COURT',


    // LESSONS
    INITIALIZE_LESSONS: 'INITIALIZE_LESSONS',
    ADD_LESSON: 'ADD_LESSON',
    UPDATE_LESSON: 'UPDATE_LESSON',
    DELETE_LESSON: 'DELETE_LESSON',

    //suummers
    INITIALIZE_SUMMERS: 'INITIALIZE_SUMMERS',
    ADD_SUMMER: 'ADD_SUMMER',
    UPDATE_SUMMER: 'UPDATE_SUMMER',
    DELETE_SUMMER: 'DELETE_SUMMER',


    
    // Dashboard specific
    FETCH_DASHBOARD_SPORTS: 'FETCH_DASHBOARD_SPORTS',
    FETCH_DASHBOARD_MATERIALS: 'FETCH_DASHBOARD_MATERIALS',
    SET_DASHBOARD_MODE: 'SET_DASHBOARD_MODE',
    
    // API Status codes
    STATUS_OK: 200,
    STATUS_CREATED: 201,
    STATUS_BAD_REQUEST: 400,
    STATUS_UNAUTHORIZED: 401,
    STATUS_FORBIDDEN: 403,
    STATUS_NOT_FOUND: 404,

    // Filter actions
    CLEAR_FILTERS: 'CLEAR_FILTERS',
    SET_CATEGORY_FILTER: 'SET_CATEGORY_FILTER',
    SET_SPORT_FILTER: 'SET_SPORT_FILTER',
    SET_MATERIAL_FILTER: 'SET_MATERIAL_FILTER'
};

export default Constant;
