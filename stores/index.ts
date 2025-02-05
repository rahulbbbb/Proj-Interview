import { configureStore } from "@reduxjs/toolkit";
import { filterDataSlice } from "@/slices/filterSlice/filterSlice";

export const store = configureStore({
  reducer: {
    [filterDataSlice.name]: filterDataSlice.reducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
