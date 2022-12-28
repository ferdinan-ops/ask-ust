import { createPostAPI, deletePostAPI, getPostAPI, getPostsAPI, searchPostAPI, updatePostAPI } from "../../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const createPost = createAsyncThunk("/post/create", async (fields) => {
   const { data } = await createPostAPI(fields);
   return data;
});

export const getPosts = createAsyncThunk("/post/getAll", async (page) => {
   const { data } = await getPostsAPI(page);
   return data;
});

export const getPost = createAsyncThunk("/post/getDetail", async (id) => {
   const { data } = await getPostAPI(id);
   return data;
});

export const searchPost = createAsyncThunk("/post/search", async (fields) => {
   const { keyword, page } = fields;
   const { data } = await searchPostAPI(keyword, page);
   return data;
})

export const updatePost = createAsyncThunk("/post/update", async (formData) => {
   const { postId, ...fields } = formData;
   const { data } = await updatePostAPI(postId, fields);
   return data;
});

export const deletePost = createAsyncThunk("/post/delete", async (id) => {
   const { data } = await deletePostAPI(id);
   return data.msg;
});

export const postSlice = createSlice({
   name: "post",
   initialState: {
      posts: [],
      post: {},
      counts: 0,
      isLoading: false,
   },
   extraReducers: (builder) => {
      builder.addCase(createPost.pending, (state) => {
         state.isLoading = true;
      }).addCase(createPost.rejected, (state) => {
         state.isLoading = false;
      }).addCase(createPost.fulfilled, (state) => {
         state.isLoading = false;
         toast.success("Pertanyaan anda berhasil di publish");
      }).addCase(getPosts.pending, (state) => {
         state.isLoading = true;
      }).addCase(getPosts.rejected, (state) => {
         state.isLoading = false;
      }).addCase(getPosts.fulfilled, (state, { payload }) => {
         state.posts = payload.data;
         state.counts = payload.counts;
         state.isLoading = false;
      }).addCase(searchPost.pending, (state) => {
         state.isLoading = true;
      }).addCase(searchPost.rejected, (state) => {
         state.isLoading = false;
      }).addCase(searchPost.fulfilled, (state, { payload }) => {
         state.posts = payload.data;
         state.counts = payload.counts;
         state.isLoading = false;
         console.log({ payload });
      }).addCase(getPost.pending, (state) => {
         state.isLoading = true;
      }).addCase(getPost.rejected, (state) => {
         state.isLoading = false;
      }).addCase(getPost.fulfilled, (state, { payload }) => {
         state.post = payload;
         state.isLoading = false;
      }).addCase(updatePost.pending, (state) => {
         state.isLoading = true;
      }).addCase(updatePost.rejected, (state) => {
         state.isLoading = false;
      }).addCase(updatePost.fulfilled, (state) => {
         state.isLoading = false;
         toast.success("Pertanyaan anda berhasil di ubah");
      }).addCase(deletePost.pending, (state) => {
         state.isLoading = true;
      }).addCase(deletePost.rejected, (state) => {
         state.isLoading = false;
      }).addCase(deletePost.fulfilled, (state, { payload }) => {
         state.isLoading = false;
         toast.success(payload);
      })
   }
});

export default postSlice.reducer;