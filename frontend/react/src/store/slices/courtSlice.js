import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCourts, getCourtById } from '../../services/courtService';
import Constants from '../../Constants';

export const fetchCourts = createAsyncThunk(Constants.FETCH_COURTS, async (filters) => {
    const courts = await getCourts(filters);
    return courts;
});

export const fetchCourtById = createAsyncThunk(Constants.FETCH_COURT_BY_ID, async (id) => {
    const court = await getCourtById(id);
    return court;
});

const courtsSlice = createSlice({
    name: 'courts',
    initialState: {
        courts: [],
        currentCourt: null,
        filters: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCourts.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchCourts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.courts = action.payload;
        })
        .addCase(fetchCourts.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        })
        .addCase(fetchCourtById.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchCourtById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.currentCourt = action.payload;
        })
        .addCase(fetchCourtById.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        });
    },
});

export const { setFilters } = courtsSlice.actions;

export default courtsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getCourts, getCourtById } from '../../services/courtService';
// import Constants from '../../Constants';

// export const fetchCourts = createAsyncThunk(Constants.FETCH_COURTS, async (filters) => {
//     const courts = await getCourts(filters);
//     return courts;
// });

// export const fetchCourtById = createAsyncThunk(Constants.FETCH_COURT_BY_ID, async (id) => {
//     const court = await getCourtById(id);
//     return court;
// });

// const courtsSlice = createSlice({
//     name: 'courts',
//     initialState: {
//         courts: [],
//         currentCourt: null,
//         filters: {},
//         status: 'idle',
//         error: null,
//     },
//     reducers: {
//         setFilters: (state, action) => {
//             state.filters = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(fetchCourts.pending, (state) => {
//             state.status = Constants.SET_LOADING;
//         })
//         .addCase(fetchCourts.fulfilled, (state, action) => {
//             state.status = 'succeeded';
//             state.courts = action.payload;
//         })
//         .addCase(fetchCourts.rejected, (state, action) => {
//             state.status = Constants.SET_ERROR;
//             state.error = action.error.message;
//         })
//         .addCase(fetchCourtById.pending, (state) => {
//             state.status = Constants.SET_LOADING;
//         })
//         .addCase(fetchCourtById.fulfilled, (state, action) => {
//             state.status = 'succeeded';
//             state.currentCourt = action.payload;
//         })
//         .addCase(fetchCourtById.rejected, (state, action) => {
//             state.status = Constants.SET_ERROR;
//             state.error = action.error.message;
//         });
//     },
// });

// export const { setFilters } = courtsSlice.actions;

// export default courtsSlice.reducer;
