import { UserInfo } from "@/types/apiResponse";
import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../consts";

type State = {
  userInfo: UserInfo | null;
};

const initialState: State = {
  userInfo: null,
};

const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState: initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
