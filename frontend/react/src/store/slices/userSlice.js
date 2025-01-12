import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser, getCurrentUser } from '../../services/userService';
import Constants from '../../Constants';

export const fetchUsers = createAsyncThunk(Constants.FETCH_USERS, async () => {
    const users = await getUsers();
    return users;
});

export const fetchUserById = createAsyncThunk(Constants.FETCH_USER_BY_ID, async (id) => {
    const user = await getUserById(id);
    return user;
});

export const fetchUserByEmail = createAsyncThunk(Constants.FETCH_USER_BY_ID, async (id) => {
    const user = await getUserByEmail(id);
    return user;
});

export const addUser = createAsyncThunk(Constants.ADD_USER, async (userData) => {
    const user = await createUser(userData);
    return user;
});

export const updateUserById = createAsyncThunk(Constants.UPDATE_USER, async (userData) => {
    const user = await updateUser(userData);
    return user;
});

export const deleteUserById = createAsyncThunk(Constants.DELETE_USER, async (id) => {
    await deleteUser(id);
    return id;
});

export const fetchCurrentUser = createAsyncThunk(Constants.FETCH_CURRENT_USER, async (token) => {
    const response = await getCurrentUser(token);
    return response.data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        currentAdmin: JSON.parse(localStorage.getItem('currentAdmin')) || null,
        status: 'idle',
        error: null,
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
    },
    reducers: {
        setTokens(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        getTokens(state) {
            return {
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            };
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        })
        .addCase(fetchUserById.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.currentUser = action.payload;
        })
        .addCase(fetchUserById.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        })
        .addCase(addUser.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users.push(action.payload);
        })
        .addCase(addUser.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        })
        .addCase(updateUserById.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(updateUserById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        })
        .addCase(updateUserById.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        })
        .addCase(deleteUserById.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(deleteUserById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = state.users.filter(user => user.id !== action.payload);
        })
        .addCase(deleteUserById.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        })
        .addCase(fetchCurrentUser.pending, (state) => {
            state.status = Constants.SET_LOADING;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.currentUser = action.payload;
            localStorage.setItem('currentAdmin', JSON.stringify(action.payload));
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.status = Constants.SET_ERROR;
            state.error = action.error.message;
        });
    },
});

export const { setTokens, getTokens } = usersSlice.actions;
export default usersSlice.reducer;
