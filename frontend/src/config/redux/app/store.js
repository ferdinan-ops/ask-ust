import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/postSlice";
import tagSlice from "../features/tagSlice";
import userSlice from "../features/userSlice";
import answerSlice from "../features/answerSlice";
import notifSlice from "../features/notifSlice";

export const store = configureStore({
   reducer: {
      tag: tagSlice,
      post: postSlice,
      user: userSlice,
      answer: answerSlice,
      notif: notifSlice,
   },
});
