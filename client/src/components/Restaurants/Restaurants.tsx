import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import {
  filteredRestSelector,
  reqRestaurants,
  restaurantSelector,
} from "../../Store/slice/restaurantSlice";
import { reqIsAuth } from "../../Store/slice/userSlice";
import { RestaurantType } from "../../types/types";
import ResCard from "../Cards/ResCard";

const Restaurants = () => {
  const restaurants: Array<RestaurantType> = useAppSelector(restaurantSelector);
  const filteredRestaurants: Array<RestaurantType> =
    useAppSelector(filteredRestSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reqRestaurants());
    dispatch(reqIsAuth());
  }, []);

  if (!restaurants) return <div>Loading...</div>;

  console.log(restaurants);
  return (
    <section className="restaurantswrapp">
      {filteredRestaurants.length > 0
        ? filteredRestaurants.map(
            ({
              name,
              neighborhood,
              address,
              cuisine_type,
              reviews,
              _id,
              image,
            }) => (
              <ResCard
                key={_id}
                name={name}
                neighborhood={neighborhood}
                address={address}
                cuisine_type={cuisine_type}
                reviews={reviews}
                image={image}
                _id={_id}
              />
            )
          )
        : restaurants.map(
            ({
              name,
              neighborhood,
              address,
              cuisine_type,
              reviews,
              _id,
              image,
            }) => (
              <ResCard
                key={_id}
                name={name}
                neighborhood={neighborhood}
                address={address}
                cuisine_type={cuisine_type}
                reviews={reviews}
                image={image}
                _id={_id}
              />
            )
          )}
    </section>
  );
};

export default Restaurants;
