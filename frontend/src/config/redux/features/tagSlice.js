import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTagAPI } from "../../api";

export const createTag = createAsyncThunk("/tag/create", async (fields) => {
   const { data } = await createTagAPI(fields);
   return data;
});

export const tagSlice = createSlice({
   name: "tag",
   initialState: {
      tags: [],
      isLoading: "",
   },
   reducers: {},
   extraReducers: {
      [createTag.pending]: (state) => {
         state.isLoading = true;
      }
   }
});

export default tagSlice.reducer;