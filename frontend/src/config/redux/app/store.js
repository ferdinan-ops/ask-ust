import { configureStore } from "@reduxjs/toolkit";
import tagSlice from "../features/tagSlice";

export const store = configureStore({
   reducer: {
      tag: tagSlice,
   },
});
