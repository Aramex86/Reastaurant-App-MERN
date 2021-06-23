import React, { FC } from "react";
import { IoIosStar } from "react-icons/io";
import { ReviewsType } from "../../types/types";

interface PropsType {
  reviews: Array<ReviewsType>;
}

const Reviews: FC<PropsType> = ({ reviews }) => {
  return (
    <>
      {reviews?.map(({ name, createdAt, comments, _id, raiting }) => (
        <div className="reviews__card" key={_id}>
          <h4>
            {name}{" "}
            {raiting ? (
              <>
                {raiting}
                <IoIosStar fill="gold" />
              </>
            ) : null}
          </h4>
          <span>{new Date(createdAt).toDateString()}</span>
          <p>{comments}</p>
        </div>
      ))}
    </>
  );
};

export default Reviews;
