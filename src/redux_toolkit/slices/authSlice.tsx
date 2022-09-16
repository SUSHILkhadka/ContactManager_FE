import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../interface/IAuth";
import instance from "../../services/api";
import { getRefreshToken } from "../../services/localStorageAndCookies";

const defaultValue: IAuth = {
  id: 0,
  username: "",
  email: "",
  status: "loading",
};

export const checkToken = createAsyncThunk(
  "authInfo/checkRefreshToken",
  async (): Promise<any> => {
    const response = await instance.post("/token", {
      refreshToken: getRefreshToken(),
    });
    return response.data;
  }
);
export const authSlice = createSlice({
  name: "authInfo",
  initialState: defaultValue,
  reducers: {
    makeLoggedInWithInfo: (state, action) => {
      state.id = action.payload.data.id;
      state.username = action.payload.data.name;
      state.email = action.payload.data.email;
      state.status = "fulfilled";
    },
    makeLoggedOut: (state) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.status = "rejected";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.id = action.payload.data.id;
        state.username = action.payload.data.name;
        state.email = action.payload.data.email;
      })
      .addCase(checkToken.rejected, (state) => {
        state.status = "rejected";
        state.id = 0;
        state.username = "";
        state.email = "";
      });
  },
});

export const { makeLoggedInWithInfo, makeLoggedOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
