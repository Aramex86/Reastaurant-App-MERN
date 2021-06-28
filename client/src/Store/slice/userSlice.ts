import {
  AddNoteType,
  AddReview,
  IsAuthType,
  LoginResponseType,
  LoginUserType,
  LogoutUserType,
  NoteType,
  PhotoType,
  ProfileBgType,
  RestaurantType,
} from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../../api/api";
import { RegisterType, RegUserRsponseType } from "../../types/types";
import { RootState, AppThunk } from "./../store/store";

const initialState = {
  registerUser: null as RegUserRsponseType | null,
  registerError: null as RegUserRsponseType | null,
  loginUser: null as LoginResponseType | null,
  loginError: null as LoginResponseType | null,
  logoutSuccess: null as LogoutUserType | null,
  userPhotoSuccess: "",
  authUser: {} as IsAuthType,
  isAuth: false,
  reviews: [] as Array<AddReview>,
  likedRest: [] as Array<RestaurantType>,
  avatar: "",
  selectedBg: {} as ProfileBgType,
  note: [] as Array<NoteType>,
  closePopup: false,
  deletedNoteId: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    regUser: (state, { payload }) => {
      state.registerUser = payload;
    },
    regError: (state, { payload }) => {
      state.registerError = payload;
    },
    loginUserSuccess: (state, { payload }) => {
      state.loginUser = payload;
    },
    loginUserError: (state, { payload }) => {
      state.loginUser = payload;
    },
    authSuccess: (state, { payload }) => {
      state.authUser = payload;
      state.isAuth = true;
    },
    logoutUser: (state, { payload }) => {
      state.logoutSuccess = payload;
      state.isAuth = false;
      state.loginUser = null;
    },
    userReviews: (state, { payload }) => {
      console.log(payload);
      state.reviews = payload;
    },
    userLikedRest: (state, { payload }) => {
      state.likedRest = payload;
    },
    deleteLikedRest: (state, action) => {
      state.likedRest = state.likedRest.filter((r) => r._id !== action.payload);
    },
    userPhotoUploadSuccess: (state, action) => {
      state.userPhotoSuccess = action.payload;
    },
    getUserAvatar: (state, { payload }) => {
      state.avatar = payload;
    },
    setBg: (state, { payload }) => {
      state.selectedBg = payload;
    },
    setNote: (state, { payload }) => {
      state.note = payload;
    },
    closePopup: (state, action) => {
      state.closePopup = action.payload;
    },
    deleteId: (state, action) => {
      state.deletedNoteId = action.payload;
    },
    deleteNote: (state) => {
      state.note = state.note.filter((n) => n._id !== state.deletedNoteId);
    },
  },
});

//Actions
export const {
  regUser,
  regError,
  loginUserError,
  loginUserSuccess,
  authSuccess,
  logoutUser,
  userReviews,
  userLikedRest,
  deleteLikedRest,
  userPhotoUploadSuccess,
  getUserAvatar,
  setBg,
  setNote,
  closePopup,
  deleteId,
  deleteNote,
} = usersSlice.actions;

//Selector
export const regUserSelector = (state: RootState) => state.users.registerUser;
export const regUserErrorSelector = (state: RootState) =>
  state.users.registerError;
export const loginUserSuccessSelector = (state: RootState) =>
  state.users.loginUser;
export const loginUserErrorSelector = (state: RootState) =>
  state.users.loginError;
export const authUserSelector = (state: RootState) => state.users.authUser;

export const isAuthUserSelector = (state: RootState) => state.users.isAuth;

export const logoutUserSelector = (state: RootState) =>
  state.users.logoutSuccess;
export const userReviewSelector = (state: RootState) => state.users.reviews;
export const userLikedRestSelector = (state: RootState) =>
  state.users.likedRest;
export const userAvatarSelector = (state: RootState) => state.users.avatar;
export const userSelectedBgSelector = (state: RootState) =>
  state.users.selectedBg;
export const userNotesSelector = (state: RootState) => state.users.note;

export const closePopUpSelector = (state: RootState) => state.users.closePopup;
export const idDeleteNote = (state: RootState) => state.users.deletedNoteId;
//Thunk
export const reqRegUser =
  (data: RegisterType): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.registerUser(data);
    if (res.success) {
      dispatch(regUser(res));
    } else {
      dispatch(regError(res));
    }
  };

export const reqLoginUser =
  (data: LoginUserType): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.loginUser(data);
    // if (res.loginSuccess) dispatch(loginUserSuccess(res));

    // if (!res.loginSuccess) dispatch(loginUserError(res));
  };

export const reqIsAuth = (): AppThunk => async (dispatch) => {
  const res = await usersApi.authUser();
  if (res.isAuth) {
    dispatch(authSuccess(res));
  }
};

export const reqLogoutUser = (): AppThunk => async (dispatch) => {
  const res = await usersApi.logoutUser();
  dispatch(logoutUser(res));
};
export const reqLikedRest =
  (data: RestaurantType, id: string): AppThunk =>
  async (dispatch) => {
    await usersApi.likedRes(data, id);
  };
export const reqDeleteLikedRest =
  (userId: string, id: string): AppThunk =>
  async (dispatch) => {
    await usersApi.deleteLikedRes(userId, id);
    dispatch(deleteLikedRest(id));
  };
export const reqAddReview =
  (data: AddReview): AppThunk =>
  async (dispatch) => {
    await usersApi.addReviewToProfile(data);
  };

export const reqReviews =
  (id: string): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.getReview(id);
    dispatch(userReviews(res));
  };
export const reqUserLikedRest =
  (id: string): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.getLikedRest(id);
    dispatch(userLikedRest(res));
  };

export const reqUserPhoto =
  (data: PhotoType, id: string): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.userPhotoUpload(data, id);
    dispatch(userPhotoUploadSuccess(res));
    dispatch(getUserAvatar(res));
  };
export const reqUserAvatar =
  (id: string): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.userGetImage(id);
    dispatch(getUserAvatar(res));
  };
export const reqUserSelectedBg =
  (id: string, data: ProfileBgType): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.selectedBg(id, data);
    // console.log("Respond", res);
    dispatch(setBg(res));
  };
export const reqAddUserNote =
  (id: string, data: AddNoteType): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.addUserNote(id, data);
    if (res.message === "success") {
      dispatch(reqGetUserNote(id));
    }
  };

export const reqGetUserNote =
  (id: string): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.getUserNote(id);
    dispatch(setNote(res));
  };
export const reqDeleteNote =
  (id: string, userId: string): AppThunk =>
  async (dispatch) => {
    await usersApi.deleteNone(userId, id);
    dispatch(deleteNote());
    dispatch(closePopup(false));
  };

export default usersSlice.reducer;
