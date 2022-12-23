import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { createPostAPI } from "../../api";

export const createPost = createAsyncThunk("/post/create", async (fields) => {
   const { data } = await createPostAPI(fields);
   return data;
});

export const postSlice = createSlice({
   name: "post",
   initialState: {
      posts: [],
      isLoading: false,
   },
   extraReducers: (builder) => {
      builder.addCase(createPost.pending, (state) => {
         state.isLoading = true;
      }).addCase(createPost.fulfilled, (state, { payload }) => {
         state.posts.push(payload);
         state.isLoading = false;
         toast.success("Pertanyaan anda berhasil di publish");
      })
   }
});

export default postSlice.reducer;