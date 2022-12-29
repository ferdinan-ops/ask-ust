import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNotificationsAPI } from '../../api';

export const getNotif = createAsyncThunk("notif/getNotif", async (page) => {
   const { data } = await getNotificationsAPI(page);
   return data;
});

const notifSlice = createSlice({
   name: "notif",
   initialState: {
      notif: [],
      counts: 0,
      isLoading: false,
   },
   extraReducers: (builder) => {
      builder.addCase(getNotif.pending, (state) => {
         state.isLoading = true;
      }).addCase(getNotif.fulfilled, (state, { payload }) => {
         state.notif = payload.data;
         state.counts = payload.counts;
         state.isLoading = false;
      }).addCase(getNotif.rejected, (state) => {
         state.isLoading = false;
      });
   }
});

export default notifSlice.reducer;