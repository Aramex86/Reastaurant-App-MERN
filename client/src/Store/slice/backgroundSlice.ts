import { createSlice } from "@reduxjs/toolkit";
import { profileBgApi } from "../../api/api";
import { ProfileBgType } from "../../types/types";
import { RootState, AppThunk } from "./../store/store";

const initialState = {
  profileBg: [] as Array<ProfileBgType>,
  selectedBg: {} as ProfileBgType,
};

export const bckSlice = createSlice({
  name: "bck",
  initialState,
  reducers: {
    getBg: (state, { payload }) => {
      state.profileBg = payload;
    },
    getSelectedBg: (state, { payload }) => {
      state.selectedBg = payload;
    },
  },
});

//Actions
export const { getBg, getSelectedBg } = bckSlice.actions;

//Selector
export const userBgSelector = (state: RootState) => state.bck.profileBg;
export const userBgSelSelector = (state: RootState) => state.bck.selectedBg;

//Thunk
export const reqUserBg = (): AppThunk => async (dispatch) => {
  const res = await profileBgApi.getBg();
  dispatch(getBg(res));
};
export const reqUserSelectBg =
  (id: string): AppThunk =>
  async (dispatch) => {
    const res = await profileBgApi.getSelectedBg(id);

    dispatch(getSelectedBg(res));
  };

export default bckSlice.reducer;
