import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Podcast } from "../../../core/domain/entities/podcast";

interface PodcastDetailsState {
  selectedPodcast: Podcast | null;
}

const initialState: PodcastDetailsState = {
  selectedPodcast: null,
};

export const podcastDetailsSlice = createSlice({
  name: "podcastDetails",
  initialState,
  reducers: {
    setSelectedPodcast: (state, action: PayloadAction<Podcast | null>) => {
      state.selectedPodcast = action.payload;
    },
  },
});

export const { setSelectedPodcast } = podcastDetailsSlice.actions;

export default podcastDetailsSlice.reducer;
