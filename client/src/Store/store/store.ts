import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import restaurantsReducer from "../slice/restaurantSlice";
import usersReducer from "../slice/userSlice";
import bckReducer from "../slice/backgroundSlice";

export const store = configureStore({
  reducer: {
    data: restaurantsReducer,
    users: usersReducer,
    bck: bckReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
