import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersAPI, searchUserAPI, getActiveUserAPI, getUserAPI } from "../../api";

export const getUsers = createAsyncThunk("/users/get", async (page) => {
   const { data } = await getUsersAPI(page);
   return data;
});

export const searchUser = createAsyncThunk("/users/search", async (fields) => {
   const { params, page } = fields;
   const { data } = await searchUserAPI(params, page);
   return data;
});

export const getActiveUser = createAsyncThunk("/users/active", async () => {
   const { data } = await getActiveUserAPI();
   return data;
});

export const getUser = createAsyncThunk("/users/detail", async (id) => {
   const { data } = await getUserAPI(id);
   return data;
})

const userSlice = createSlice({
   name: "user",
   initialState: {
      users: [],
      user: {},
      active: [],
      counts: 0,
      isLoading: false,
   },
   extraReducers: (builder) => {
      builder.addCase(getUsers.pending, (state) => {
         state.isLoading = true;
      }).addCase(getUsers.rejected, (state) => {
         state.isLoading = false;
      }).addCase(getUsers.fulfilled, (state, { payload }) => {
         state.users = payload.data;
         state.counts = payload.counts;
         state.isLoading = false;
      }).addCase(searchUser.pending, (state) => {
         state.isLoading = true;
      }).addCase(searchUser.rejected, (state) => {
         state.isLoading = false;
      }).addCase(searchUser.fulfilled, (state, { payload }) => {
         state.users = payload.data;
         state.counts = payload.counts;
         state.isLoading = false;
      }).addCase(getActiveUser.fulfilled, (state, { payload }) => {
         state.active = payload;
      }).addCase(getUser.pending, (state) => {
         state.isLoading = true;
      }).addCase(getUser.rejected, (state) => {
         state.isLoading = false;
      }).addCase(getUser.fulfilled, (state, { payload }) => {
         state.user = payload;
         state.isLoading = false;
      })
   }
});

export default userSlice.reducer;