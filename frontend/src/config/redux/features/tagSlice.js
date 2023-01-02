import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTagAPI, getAllTagsAPI, getPostByTagAPI, getTagAPI, getTagsAPI, searchTagsAPI } from "../../api";
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

export const getPostByTag = createAsyncThunk("/tag/getPost", async (fields) => {
   const { tag, page } = fields;
   const { data } = await getPostByTagAPI(page, tag);
   return data;
});

export const getTag = createAsyncThunk("/tag/detail", async (name) => {
   const { data } = await getTagAPI(name);
   return data;
});

export const tagSlice = createSlice({
   name: "tag",
   initialState: {
      tags: [],
      counts: 0,
      isLoading: false,
      tagged: {
         data: [],
         isLoading: false,
         counts: 0,
      },
      tag: {},
   },
   reducers: {
      setIsLoading: (state, { payload }) => {
         state.isLoading = payload;
      }
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
      }).addCase(getPostByTag.pending, (state) => {
         state.tagged.isLoading = true;
      }).addCase(getPostByTag.rejected, (state) => {
         state.tagged.isLoading = false;
      }).addCase(getPostByTag.fulfilled, (state, { payload }) => {
         state.tagged.data = payload.data;
         state.tagged.counts = payload.counts;
         state.tagged.counts = false;
      }).addCase(getTag.pending, (state) => {
         state.isLoading = true;
      }).addCase(getTag.rejected, (state) => {
         state.isLoading = false;
      }).addCase(getTag.fulfilled, (state, { payload }) => {
         state.tag = payload;
         state.isLoading = false;
      })
   }
});

export const { setIsLoading } = tagSlice.actions;
export default tagSlice.reducer;