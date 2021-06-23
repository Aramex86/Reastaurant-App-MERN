import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import {
  reqRestaurantById,
  reqUpdateRestaurant,
  restaurantByIdSelector,
} from "../../Store/slice/restaurantSlice";
import { RestaurantType } from "../../types/types";
import { ImLocation2 } from "react-icons/im";
import { GiKnifeFork } from "react-icons/gi";
import { BsFillHouseFill } from "react-icons/bs";
import { BiMessageRoundedAdd } from "react-icons/bi";

import Map from "../Map/Map";
import AddReview from "./AddReview";
import Reviews from "./Reviews";
import { useCallback } from "react";
import { reqReviews } from "../../Store/slice/userSlice";

interface IdType {
  id: string;
}

const Restinfo = () => {
  const restaurant: RestaurantType | null = useAppSelector(
    restaurantByIdSelector
  );
  const dispatch = useAppDispatch();
  let { id }: IdType = useParams();

  const [addReview, setAddReview] = useState(false);

  useEffect(() => {
    dispatch(reqRestaurantById(id));
  }, []);

  const handleReview = () => {
    setAddReview(!addReview);
  };

  const handleReviewClose = () => {
    setAddReview(false);
  };

  if (!restaurant) return <p>Loading...</p>;
  const { name, address, neighborhood, cuisine_type, image, reviews, latlng } =
    restaurant;

  console.log(reviews);
  return (
    <>
      <div className="resinfo">
        <div className="resinfo__image">
          <img src={image} alt={name} />
        </div>
        <div className="resinfo__info">
          <h3>{name}</h3>
          <ul>
            <li>
              <ImLocation2 />
              {neighborhood}
            </li>
            <li>
              <BsFillHouseFill />
              {address}
            </li>
            <li>
              <GiKnifeFork />
              {cuisine_type}
            </li>
          </ul>
          <div className="map">
            <Map latlng={latlng} />
          </div>
        </div>
      </div>
      <div className="reviews">
        <Reviews reviews={reviews} />
        <div>
          <button className="btn btn--addreview" onClick={handleReview}>
            {" "}
            <BiMessageRoundedAdd size={24} />
            Add review
          </button>
          {addReview && (
            <AddReview handleReviewClose={handleReviewClose} name={name} />
          )}
        </div>
      </div>
    </>
  );
};

export default Restinfo;
