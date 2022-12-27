import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAnswerAPI, getAnswersAPI } from "../../api";

export const getAnswers = createAsyncThunk("/answer/all", async (id) => {
   const { data } = await getAnswersAPI(id);
   return data;
});

export const getAnswer = createAsyncThunk("/answer/detail", async (id) => {
   const { data } = await getAnswerAPI(id);
   return data;
});

export const answerSlice = createSlice({
   name: "answer",
   initialState: {
      answers: [],
      answer: {},
      isUpdate: false,
      isLoading: false,
   },
   reducers: {
      setIsUpdate: (state, { payload }) => {
         state.isUpdate = payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(getAnswers.pending, (state) => {
         state.isLoading = true;
      }).addCase(getAnswers.rejected, (state) => {
         state.isLoading = false;
      }).addCase(getAnswers.fulfilled, (state, { payload }) => {
         state.answers = payload;
         state.isUpdate = false;
         state.answer = {};
         state.isLoading = false;
      }).addCase(getAnswer.fulfilled, (state, { payload }) => {
         state.answer = payload;
         state.isLoading = false;
      })
   }
});

export const { setIsUpdate } = answerSlice.actions;
export default answerSlice.reducer;