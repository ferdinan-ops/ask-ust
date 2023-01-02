import { getUsersAPI, searchUserAPI, getActiveUserAPI, getUserAPI, getMyPostsAPI, getMySavedPostsAPI } from "../../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
});

export const getMyPosts = createAsyncThunk("/users/my-post", async (fields) => {
   const { page, id } = fields;
   const { data } = await getMyPostsAPI(page, id);
   return data;
});

export const getMySavedPosts = createAsyncThunk("/users/saved-post", async (page) => {
   const { data } = await getMySavedPostsAPI(page);
   return data;
})

const userSlice = createSlice({
   name: "user",
   initialState: {
      users: [],
      counts: 0,
      isLoading: false,
      user: {},
      active: [],
      myPosts: {
         posts: [],
         isLoading: false,
         counts: 0,
      },
      mySavedPosts: {
         savedPosts: [],
         isLoading: false,
         counts: 0,
      },
   },
   reducers: {
      setIsLoading: (state, { payload }) => {
         state.isLoading = payload;
      }
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
      }).addCase(getMyPosts.pending, (state) => {
         state.myPosts.isLoading = true;
      }).addCase(getMyPosts.rejected, (state) => {
         state.myPosts.isLoading = false;
      }).addCase(getMyPosts.fulfilled, (state, { payload }) => {
         state.myPosts.posts = payload.data;
         state.myPosts.counts = payload.counts;
         state.myPosts.isLoading = false;
      }).addCase(getMySavedPosts.pending, (state) => {
         state.mySavedPosts.isLoading = true;
      }).addCase(getMySavedPosts.rejected, (state) => {
         state.mySavedPosts.isLoading = false;
      }).addCase(getMySavedPosts.fulfilled, (state, { payload }) => {
         state.mySavedPosts.savedPosts = payload.data;
         state.mySavedPosts.counts = payload.counts;
         state.mySavedPosts.isLoading = false;
      })
   }
});

export const { setIsLoading } = userSlice.actions;
export default userSlice.reducer;