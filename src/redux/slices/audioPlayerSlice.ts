import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../consts";
import { PodcastEpisode } from "@/types/apiResponse";

type State = {
  currentEpisode: PodcastEpisode | null;
  playerState: "PAUSED" | "PLAYING" | "STOP";
};

const initialState: State = {
  currentEpisode: null,
  playerState: "STOP",
};

const audioPlayerSlice = createSlice({
  name: SLICE_NAMES.AUDIO_PLAYER,
  initialState,
  reducers: {
    setCurrentEpisode(state, action) {
      state.currentEpisode = action.payload;
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
