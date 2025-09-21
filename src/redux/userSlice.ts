import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../api";
import { AppDispatch } from "@/store/store";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
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

export const { setIsAuthenticated, setIsLoading } = userSlice.actions;
export default userSlice.reducer;

export const getUsers = () => async (_dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/users');
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error.response?.data);
  }
};

export const createUser = (user: { name: string; email: string }) => async (_dispatch: AppDispatch) => {
  try {
    const { data } = await API.post('/user/create', user);
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error.response?.data);
  }
};

// Update an existing user
export const updateUser = (id: string, user: { name: string; email: string }) => async (_dispatch: AppDispatch) => {
  try {
    const { data } = await API.put(`/user/update/${id}`, user);
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error.response?.data);
  }
};

// Delete a user
export const deleteUser = (id: string) => async (_dispatch: AppDispatch) => {
  try {
    const { data } = await API.delete(`/user/delete/${id}`);
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error.response?.data);
  }
};
