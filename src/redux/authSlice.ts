import { AppDispatch } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../api"

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setIsAuthenticated, setIsLoading } = authSlice.actions;
export default authSlice.reducer;

export const authenticatingUser = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const res = await API.get("/auth/auth-url");
        const googleUrl = res.data.url;
        dispatch(setIsAuthenticated(true));
        window.location.href = googleUrl;
    } catch (error) {
        console.error("Google login error:", error);
    } finally {
        dispatch(setIsLoading(false));
    }
};

export const logoutUser = (navigate: (path: string) => void) => async (dispatch: AppDispatch) => {
    try {
        localStorage.clear();
        dispatch(setIsAuthenticated(false));
        navigate("/auth");
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(error.response?.data);
    }
};