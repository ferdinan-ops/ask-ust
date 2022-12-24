import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersAPI, searchUserAPI } from "../../api";

export const getUsers = createAsyncThunk("/users/get", async () => {
   const { data } = await getUsersAPI();
   return data;
});

export const searchUser = createAsyncThunk("/users/search", async (keyword) => {
   const { data } = await searchUserAPI(keyword);
   return data;
});

const userSlice = createSlice({
   name: "user",
   initialState: {
      users: [],
      isLoading: false,
   },
   extraReducers: (builder) => {
      builder.addCase(getUsers.pending, (state) => {
         state.isLoading = true;
      }).addCase(getUsers.fulfilled, (state, { payload }) => {
         state.users = payload;
         state.isLoading = false;
      }).addCase(searchUser.pending, (state) => {
         state.isLoading = true;
      }).addCase(searchUser.fulfilled, (state, { payload }) => {
         state.users = payload;
         state.isLoading = false;
      })
   }
});

export default userSlice.reducer;