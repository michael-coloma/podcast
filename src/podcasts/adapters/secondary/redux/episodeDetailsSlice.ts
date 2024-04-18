import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Episode } from "../../../core/domain/entities/episode";

interface EpisodeDetailsState {
  selectedEpisode: Episode | null;
}

const initialState: EpisodeDetailsState = {
  selectedEpisode: null,
};

export const episodeDetailsSlice = createSlice({
  name: "episodeDetails",
  initialState,
  reducers: {
    setSelectedEpisode: (state, action: PayloadAction<Episode | null>) => {
      state.selectedEpisode = action.payload;
    },
  },
});

export const { setSelectedEpisode } = episodeDetailsSlice.actions;

export default episodeDetailsSlice.reducer;
