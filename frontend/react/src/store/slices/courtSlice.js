import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCourts, getCourtById, createCourt, updateCourt, deleteCourt } from '../../services/courtService';
import Constants from '../../Constants';

export const fetchCourts = createAsyncThunk(Constants.FETCH_COURTS, async (filters) => {
    const courts = await getCourts(filters);
    return courts;
});

export const fetchCourtById = createAsyncThunk(Constants.FETCH_COURT_BY_ID, async (id) => {
    const court = await getCourtById(id);
    return court;
});

export const createNewCourt = createAsyncThunk(Constants.CREATE_COURT, async (courtData) => {
    const court = await createCourt(courtData);
    return court;
});

export const updateExistingCourt = createAsyncThunk(Constants.UPDATE_COURT, async ({ id, courtData }) => {
    const court = await updateCourt(id, courtData);
    return court;
});

export const deleteExistingCourt = createAsyncThunk(Constants.DELETE_COURT, async (id) => {
    await deleteCourt(id);
    return id;
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
            state.status = 'idle';
            state.courts = action.payload;
        })
        .addCase(fetchCourts.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(fetchCourtById.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchCourtById.fulfilled, (state, action) => {
            state.status = 'idle';
            state.currentCourt = action.payload;
        })
        .addCase(fetchCourtById.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(createNewCourt.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(createNewCourt.fulfilled, (state, action) => {
            state.status = 'idle';
            state.courts.push(action.payload);
        })
        .addCase(createNewCourt.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(updateExistingCourt.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(updateExistingCourt.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.courts.findIndex(court => court.id === action.payload.id);
            if (index !== -1) {
                state.courts[index] = action.payload;
            }
        })
        .addCase(updateExistingCourt.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(deleteExistingCourt.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(deleteExistingCourt.fulfilled, (state, action) => {
            state.status = 'idle';
            state.courts = state.courts.filter(court => court.id !== action.payload);
        })
        .addCase(deleteExistingCourt.rejected, (state, action) => {
            state.status = 'idle';
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
