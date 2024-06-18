import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, database } from '../../firebase_config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const initialState = {
    currentUser: null,
    status: 'idle',
    error: null,
    loader: false
};
// Async thunks for auth actions
export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const authenticateUser = await createUserWithEmailAndPassword(auth, email, password);
            const userRef = doc(database, 'userProfiles', authenticateUser.user.uid);
            await setDoc(userRef, { name, email, id: authenticateUser.user.uid });
            return authenticateUser.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return auth.currentUser;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const AuthenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state, action) => {
            state.loader = true;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.loader = false;
            state.status = 'succeeded';
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.status = 'failed';
            state.loader = false;
            state.error = action.payload;
        });
        builder.addCase(login.pending, (state, action) => {
            state.loader = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.loader = false;
            state.status = 'succeeded';
        });
        builder.addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.loader = false;
            state.error = action.payload;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.currentUser = null;
            state.status = 'succeeded';
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export const { setCurrentUser } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
