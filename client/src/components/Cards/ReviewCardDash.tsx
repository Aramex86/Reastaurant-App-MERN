import React, { FC } from "react";
import { AddReview } from "../../types/types";
import { IoIosStar } from "react-icons/io";

type Propstype = {
  reviews: Array<AddReview>;
};

const ReviewCardDash: FC<Propstype> = ({ reviews }) => {
  return (
    <div className="review-wrapp">
      {reviews.map((r, i) => (
        <div key={i} className="review-wrapp__card">
          <div className="review-wrapp__card__name">
            Restaurant name - <span>{r.restName}</span>
          </div>
          <div className="review-wrapp__card___raiting">
            <span>raitng: </span>
            {r.raiting} <IoIosStar fill="gold" />
          </div>
          <div className="review-wrapp__card__comment">
            <span>comment:</span> <q>{r.comment}</q>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCardDash;
