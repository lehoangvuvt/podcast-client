import {
  Podcast,
  PodcastEpisode,
  UserFavouriteItems,
  UserInfo,
} from "@/types/apiResponse";
import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../consts";

type State = {
  userInfo: UserInfo | null;
  favouriteItems: UserFavouriteItems | null;
  isMutateFavItems: boolean;
};

const initialState: State = {
  userInfo: null,
  favouriteItems: null,
  isMutateFavItems: false,
};

const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState: initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setUserFavouriteItems(
      state,
      action: {
        payload: UserFavouriteItems | null;
      }
    ) {
      state.favouriteItems = action.payload;
      state.isMutateFavItems = false;
    },
    setMutateFavItems(state, action) {
      state.isMutateFavItems = action.payload;
    },
  },
});

export const { setUserInfo, setUserFavouriteItems, setMutateFavItems } =
  userSlice.actions;
export default userSlice.reducer;
