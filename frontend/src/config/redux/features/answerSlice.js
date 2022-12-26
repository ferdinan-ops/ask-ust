import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { createAnswerAPI, getAnswersAPI } from "../../api";

export const getAnswers = createAsyncThunk("/answer/all", async (id) => {
   const { data } = await getAnswersAPI(id);
   return data;
});

export const createAnswer = createAsyncThunk("/answer/create", async (fields) => {
   const { data } = await createAnswerAPI(fields);
   return data;
});

export const answerSlice = createSlice({
   name: "answer",
   initialState: {
      answers: [],
      isUpdate: false,
      isLoading: false,
      isLoadingPost: false,
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
         state.isLoading = false;
      }).addCase(createAnswer.pending, (state) => {
         state.isLoadingPost = true;
      }).addCase(createAnswer.rejected, (state) => {
         state.isLoadingPost = false;
      }).addCase(createAnswer.fulfilled, (state) => {
         state.isLoadingPost = false;
         toast.success("Jawaban berhasil dibuat");
      })
   }
});

export const { setIsUpdate } = answerSlice.actions;
export default answerSlice.reducer;