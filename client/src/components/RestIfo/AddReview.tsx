import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { ReviewsType } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import { reqUpdateRestaurant } from "../../Store/slice/restaurantSlice";
import { useParams } from "react-router";
import {
  authUserSelector,
  isAuthUserSelector,
  reqAddReview,
} from "../../Store/slice/userSlice";
import Tooltip from "../common/Tooltip/Tooltip";

interface PropsType {
  handleReviewClose: () => void;
  name: string;
}

const AddReview: FC<PropsType> = ({ handleReviewClose, name }) => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthUserSelector);
  const authUser = useAppSelector(authUserSelector);
  let { id }: { id: string } = useParams();
  const { _id } = authUser;

  const formik = useFormik<ReviewsType>({
    initialValues: {
      name: "",
      raiting: 0,
      comments: "",
      createdAt: "",
    },
    onSubmit: (values) => {
      dispatch(reqUpdateRestaurant(values, id));
      formik.resetForm();
      handleReviewClose();

      const addReviw = {
        id: _id,
        restName: name,
        raiting: values.raiting,
        comment: values.comments,
      };
      dispatch(reqAddReview(addReviw));
    },
  });

  return (
    <div className="reviews__add">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            placeholder="Enter your name"
            className="reviews__add-name"
          />
          <input
            name="raiting"
            onChange={formik.handleChange}
            value={formik.values.raiting}
            type="number"
            placeholder="Enter number from 1 to 5"
            max={5}
            min={1}
            className="reviews__add-raiting"
          />
        </div>
        <textarea
          name="comments"
          onChange={formik.handleChange}
          value={formik.values.comments}
          id=""
          cols={30}
          rows={10}
          placeholder="Enter review"
        />
        <Tooltip text="Please login to leave a review!" />
        <button
          type="submit"
          className="btn btn--add"
          disabled={isAuth ? false : true}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddReview;
