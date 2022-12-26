import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTagAPI, getAllTagsAPI, getTagsAPI, searchTagsAPI } from "../../api";
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

export const getTags = createAsyncThunk("/tag/get", async (page) => {
   const { data } = await getTagsAPI(page);
   return data;
});

export const getAllTags = createAsyncThunk("tag/all", async () => {
   const { data } = await getAllTagsAPI();
   return data;
})

export const searchTag = createAsyncThunk("tag/search", async (fields) => {
   const { params, page } = fields;
   const { data } = await searchTagsAPI(params, page);
   return data;
});

export const tagSlice = createSlice({
   name: "tag",
   initialState: {
      tags: [],
      counts: 0,
      isLoading: true,
   },
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
      }).addCase(getTags.rejected, (state) => {
         state.isLoading = false;
      }).addCase(getTags.fulfilled, (state, { payload }) => {
         state.tags = payload.data;
         state.counts = payload.counts;
         state.isLoading = false;
      }).addCase(searchTag.pending, (state) => {
         state.isLoading = true;
      }).addCase(searchTag.rejected, (state) => {
         state.isLoading = false;
      }).addCase(searchTag.fulfilled, (state, { payload }) => {
         state.tags = payload.data;
         state.counts = payload.counts;
         state.isLoading = false;
      }).addCase(getAllTags.pending, (state) => {
         state.isLoading = true;
      }).addCase(getAllTags.rejected, (state) => {
         state.isLoading = false;
      }).addCase(getAllTags.fulfilled, (state, { payload }) => {
         state.tags = payload;
         state.isLoading = false;
      })
   }
});

export default tagSlice.reducer;