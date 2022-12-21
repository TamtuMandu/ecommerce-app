import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../app/index";

export const registerOrLoginUser = createAsyncThunk(
  "user/registerOrLogin",
  async ({ formValues, isLogin }, thunkAPI) => {
    const route = `users/${isLogin ? "login" : "register"}`;
    try {
      const { data } = await instance.post(route, formValues);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken);
      return data;
    } catch (error) {}
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  return null;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(registerOrLoginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerOrLoginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(registerOrLoginUser.rejected, (state) => {
      state.loading = false;
      state.error = "Something Went Wrong";
    });

    //Logout

    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
      state.error = "Something Went Wrong";
    });
  },
});

export const userReducer = userSlice.reducer;
