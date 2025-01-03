import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSummers, getSummerById } from '../../services/summerService';
import Constants from '../../Constants';

export const fetchSummers = createAsyncThunk(Constants.FETCH_SUMMERS, async () => {
    const summers = await getSummers();
    return summers;
});

export const fetchSummerById = createAsyncThunk(Constants.FETCH_SUMMER_BY_ID, async (id) => {
    const summer = await getSummerById(id);
    return summer;
});

const summersSlice = createSlice({
    name: 'summers',
    initialState: {
        summers: [],
        currentSummer: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSummers.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchSummers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.summers = action.payload;
        })
        .addCase(fetchSummers.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        })
        .addCase(fetchSummerById.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchSummerById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.currentSummer = action.payload;
        })
        .addCase(fetchSummerById.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        });
    },
});

export default summersSlice.reducer;
