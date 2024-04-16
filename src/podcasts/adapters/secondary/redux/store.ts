import { configureStore } from "@reduxjs/toolkit";
import podcastDetailsReducer from "./podCastDetailsSlice";

export const store = configureStore({
  reducer: {
    podcastDetails: podcastDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
