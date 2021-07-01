import React, { FC, useEffect, useState } from "react";
import { ImLocation2 } from "react-icons/im";
import { GiKnifeFork } from "react-icons/gi";
import { BsFillHouseFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { IsAuthType, RestaurantType, ReviewsType } from "../../types/types";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import { authUserSelector, reqLikedRest } from "../../Store/slice/userSlice";
import { restaurantSelector } from "../../Store/slice/restaurantSlice";
import { imageType } from "../../helpers/imageType";

interface PropsType {
  name: string;
  neighborhood: string;
  address: string;
  cuisine_type: string;
  reviews: Array<ReviewsType>;
  image: string;
  _id: string;
}

const ResCard: FC<PropsType> = ({
  _id,
  name,
  neighborhood,
  address,
  cuisine_type,
  reviews,
  image,
}) => {
  const restaurants: Array<RestaurantType> = useAppSelector(restaurantSelector);
  const auth: IsAuthType = useAppSelector(authUserSelector);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(false);

  useEffect(() => {}, []);
  const findRestById = (id: string) => {
    restaurants.find((rest) => {
      if (rest._id === id) {
        dispatch(reqLikedRest(rest, auth._id));
      }
    });
  };

  const selectedLike = () => {
    setSelected(true);
  };

  return (
    <div className="rescardwrapp ">
      <button
        className="btn btn--like "
        onClick={() => {
          findRestById(_id);

          selectedLike();
        }}
      >
        {selected ? (
          <FcLike size="24" />
        ) : (
          <AiOutlineHeart size="24" fill="#fff" />
        )}{" "}
      </button>
      <Link to={`/${_id}`}>
        <div className="top ">
          <div className="top__img ">{imageType(image)}</div>
        </div>
        <div className="bottom">
          <ul className="bottom__list ">
            <li>
              {" "}
              <h3 className="bottom__name">{name}</h3>
            </li>
            <li>
              <ImLocation2 /> {neighborhood}
            </li>
            <li>
              {" "}
              <BsFillHouseFill />
              {address.length > 30 ? `${address.slice(0, 35)}...` : address}
            </li>
            <li>
              <GiKnifeFork /> {cuisine_type}
            </li>
            <li>
              {" "}
              <BsFillEyeFill />
              Reviews {reviews.length}
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default ResCard;
