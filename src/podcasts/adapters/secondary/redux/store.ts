import { configureStore } from "@reduxjs/toolkit";
import podcastDetailsReducer from "./podCastDetailsSlice";
import episodeDetailsReducer from "./episodeDetailsSlice";

export const store = configureStore({
  reducer: {
    podcastDetails: podcastDetailsReducer,
    episodeDetails: episodeDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
