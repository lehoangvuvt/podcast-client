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
    playNext(state) {
      if (state.currentPodcast) {
        const lastEpNo = state.currentPodcast.episodes.toSorted((a, b) => {
          return b.episode_no - a.episode_no;
        })[0].episode_no;
        if (state.currentEpisodeNo < lastEpNo) {
          state.currentEpisodeNo += 1;
          state.playerState = "PLAYING";
        } else {
          state.playerState = "STOP";
        }
      }
    },
    pauseAudio(state) {
      state.playerState = "PAUSED";
    },
    stopAudio(state) {
      state.playerState = "STOP";
    },
  },
});

export const { setCurrentEpisode, playAudio, pauseAudio, stopAudio, playNext } =
  audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
