import { AddRestaurantType, PhotoType } from "./../../types/types";
import { restaurantsApi } from "./../../api/api";
import { RootState, AppThunk } from "./../store/store";
import { createSlice } from "@reduxjs/toolkit";
import { RestaurantType, ReviewsType } from "../../types/types";

const initialState = {
  restaurants: [] as Array<RestaurantType>,
  restaurant: null as RestaurantType | null,
  filteredRes: [] as Array<RestaurantType>,
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    restaurantsData: (state, { payload }) => {
      state.restaurants = payload;
    },
    restaurantById: (state, { payload }) => {
      state.restaurant = payload;
    },
    fiterRest: (state, action) => {
      state.filteredRes = state.restaurants.filter((rest) => {
        if (rest.name.toLowerCase().includes(action.payload.toLowerCase())) {
          return rest;
        }
      });
    },
  },
});

//Actions
export const { restaurantsData, restaurantById, fiterRest } =
  restaurantsSlice.actions;

//Selector
export const restaurantSelector = (state: RootState) => state.data.restaurants;
export const restaurantByIdSelector = (state: RootState) =>
  state.data.restaurant;
export const filteredRestSelector = (state: RootState) =>
  state.data.filteredRes;

//Thunk
export const reqRestaurants = (): AppThunk => async (dispatch) => {
  const res = await restaurantsApi.getRestaurants();
  dispatch(restaurantsData(res));
};
export const reqRestaurantById =
  (id: string): AppThunk =>
  async (dispatch) => {
    const res = await restaurantsApi.getRestaurant(id);
    dispatch(restaurantById(res));
  };

export const reqUpdateRestaurant =
  (data: ReviewsType, id: string): AppThunk =>
  async (dispatch) => {
    await restaurantsApi.updateRestaurant(data, id);
    dispatch(reqRestaurantById(id));
  };
export const reqAddRest =
  (data: AddRestaurantType, photo: any): AppThunk =>
  async (dispatch) => {
    await restaurantsApi.addRestaurant(data, photo);
  };

export default restaurantsSlice.reducer;
