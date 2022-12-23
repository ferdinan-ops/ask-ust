import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTagAPI, getTagsAPI, searchTagsAPI } from "../../api";
import { toast } from "react-hot-toast";

export const createTag = createAsyncThunk("/tag/create", async (fields, { rejectWithValue }) => {
   try {
      const { data } = await createTagAPI(fields);
      return data;
   } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data.msg);
   }
});

export const getTags = createAsyncThunk("/tag/get", async () => {
   const { data } = await getTagsAPI();
   return data;
});

export const searchTag = createAsyncThunk("tag/search", async (keyword) => {
   const { data } = await searchTagsAPI(keyword);
   return data;
});

export const tagSlice = createSlice({
   name: "tag",
   initialState: {
      tags: [],
      isLoading: true,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(createTag.pending, (state) => {
         state.isLoading = true;
      }).addCase(createTag.rejected, (state, { payload }) => {
         state.isLoading = false;
         toast.error(payload);
      }).addCase(createTag.fulfilled, (state, { payload }) => {
         state.tags.push(payload);
         state.isLoading = false;
         toast.success("Tag berhasil dibuat");
      }).addCase(getTags.pending, (state) => {
         state.isLoading = true;
      }).addCase(getTags.fulfilled, (state, { payload }) => {
         state.tags = payload;
         state.isLoading = false;
      }).addCase(searchTag.pending, (state) => {
         state.isLoading = true;
      }).addCase(searchTag.fulfilled, (state, { payload }) => {
         state.tags = payload;
         state.isLoading = false;
      })
   }
});

export default tagSlice.reducer;