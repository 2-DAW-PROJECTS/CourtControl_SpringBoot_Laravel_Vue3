import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSummers, getSummerById, createSummer, updateSummer, deleteSummer } from '../../services/summerService';
import Constants from '../../Constants';

export const fetchSummers = createAsyncThunk(Constants.FETCH_SUMMERS, async (filters) => {
    const summers = await getSummers(filters);
    return summers;
});

export const fetchSummerById = createAsyncThunk(Constants.FETCH_SUMMER_BY_ID, async (id) => {
    const summer = await getSummerById(id);
    return summer;
});

export const createNewSummer = createAsyncThunk(Constants.CREATE_SUMMER, async (summerData) => {
    const summer = await createSummer(summerData);
    return summer;
});

export const updateExistingSummer = createAsyncThunk(Constants.UPDATE_SUMMER, async ({ id, summerData }) => {
    const summer = await updateSummer(id, summerData);
    return summer;
});

export const deleteExistingSummer = createAsyncThunk(Constants.DELETE_SUMMER, async (id) => {
    await deleteSummer(id);
    return id;
});

const summersSlice = createSlice({
    name: 'summers',
    initialState: {
        summers: [],
        currentSummer: null,
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
        .addCase(fetchSummers.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchSummers.fulfilled, (state, action) => {
            state.status = 'idle';
            state.summers = action.payload;
        })
        .addCase(fetchSummers.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(fetchSummerById.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchSummerById.fulfilled, (state, action) => {
            state.status = 'idle';
            state.currentSummer = action.payload;
        })
        .addCase(fetchSummerById.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(createNewSummer.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(createNewSummer.fulfilled, (state, action) => {
            state.status = 'idle';
            state.summers.push(action.payload);
        })
        .addCase(createNewSummer.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(updateExistingSummer.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(updateExistingSummer.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.summers.findIndex(summer => summer.id === action.payload.id);
            if (index !== -1) {
                state.summers[index] = action.payload;
            }
        })
        .addCase(updateExistingSummer.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        })
        .addCase(deleteExistingSummer.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(deleteExistingSummer.fulfilled, (state, action) => {
            state.status = 'idle';
            state.summers = state.summers.filter(summer => summer.id !== action.payload);
        })
        .addCase(deleteExistingSummer.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error.message;
        });
    },
});

export const { setFilters } = summersSlice.actions;

export default summersSlice.reducer;
