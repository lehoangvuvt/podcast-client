import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../consts";
import { PodcastDetails } from "@/types/apiResponse";

type State = {
  currentPodcast: PodcastDetails | null;
  currentEpisodeNo: number;
  playerState: "PAUSED" | "PLAYING" | "STOP";
};

const initialState: State = {
  currentPodcast: null,
  currentEpisodeNo: 0,
  playerState: "STOP",
};

const audioPlayerSlice = createSlice({
  name: SLICE_NAMES.AUDIO_PLAYER,
  initialState,
  reducers: {
    setCurrentEpisode(
      state,
      action: { payload: { podcastDetails: PodcastDetails; episodeNo: number } }
    ) {
      state.currentPodcast = action.payload.podcastDetails;
      state.currentEpisodeNo = action.payload.episodeNo;
    },
    playAudio(state) {
      state.playerState = "PLAYING";
    },
    pauseAudio(state) {
      state.playerState = "PAUSED";
    },
    stopAudio(state) {
      state.playerState = "STOP";
    },
  },
});

export const { setCurrentEpisode, playAudio, pauseAudio, stopAudio } =
  audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
