import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/postSlice";
import tagSlice from "../features/tagSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
   reducer: {
      tag: tagSlice,
      post: postSlice,
      user: userSlice,
   },
});
