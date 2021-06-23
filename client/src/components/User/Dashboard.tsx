import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import {
  authUserSelector,
  reqIsAuth,
  reqReviews,
  reqUserLikedRest,
  userLikedRestSelector,
  userReviewSelector,
} from "../../Store/slice/userSlice";
import { AddReview, RestaurantType } from "../../types/types";
import DashCard from "../Cards/DashCard";
import ReviewCardDash from "../Cards/ReviewCardDash";
import SideMenu from "./SideMenu";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const reviews: Array<AddReview> = useAppSelector(userReviewSelector);
  const likedRest: Array<RestaurantType> = useAppSelector(
    userLikedRestSelector
  );
  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch(reqUserLikedRest(id));
    dispatch(reqReviews(id));
  }, []);

  return (
    <div className="dashboard">
      <SideMenu />
      <div className="likedrest">
        <h3>Liked Restaurants</h3>
        {!likedRest ? (
          <div className="noitems">No Item</div>
        ) : (
          <div className="card-wrapp">
            {!likedRest ? (
              <div>Loading...</div>
            ) : (
              likedRest.map(
                ({
                  name,
                  neighborhood,
                  address,
                  cuisine_type,
                  // reviews,
                  _id,
                  image,
                }) => (
                  <DashCard
                    key={_id}
                    neighborhood={neighborhood}
                    address={address}
                    name={name}
                    cuisine_type={cuisine_type}
                    image={image}
                    _id={_id}
                    userId={id}
                  />
                )
              )
            )}
          </div>
        )}
      </div>
      <div className="reviews-dash">
        <h3>Reviews</h3>
        <ReviewCardDash reviews={reviews} />
      </div>
    </div>
  );
};

export default Dashboard;
