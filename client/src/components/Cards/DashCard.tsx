import React, { FC, useEffect } from "react";
import { ImLocation2 } from "react-icons/im";
import { GiKnifeFork } from "react-icons/gi";
import { BsFillHouseFill } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useAppDispatch } from "../../Store/hooks/hooks";
import {
  deleteLikedRest,
  reqDeleteLikedRest,
  reqUserLikedRest,
} from "../../Store/slice/userSlice";

interface IProps {
  name: string;
  neighborhood: string;
  address: string;
  cuisine_type: string;
  _id: string;
  image: string;
  userId: string;
}

const DashCard: FC<IProps> = ({
  name,
  neighborhood,
  address,
  cuisine_type,
  _id,
  image,
  userId,
}) => {
  const dispatch = useAppDispatch();

  const handaleDelete = () => {
    dispatch(reqDeleteLikedRest(userId, _id));
    // dispatch(deleteLikedRest(_id));
  };
  return (
    <div className="dashcard">
      <div className="deleted-wrapp">
        <button className="btn btn--delete" onClick={handaleDelete}>
          <RiDeleteBin2Fill size="24" fill="#fff" />
        </button>
      </div>
      <div className="dashcard__img">
        <img src={image} alt={name} />
      </div>
      <ul className="dashcard__list">
        <li className="dashcard__list__item">
          <h3 className="dashcard__name">{name}</h3>
        </li>
        <li className="dashcard__list__item">
          <ImLocation2 />
          {neighborhood}
        </li>
        <li className="dashcard__list__item">
          <BsFillHouseFill />
          {address}
        </li>
        <li className="dashcard__list__item">
          <GiKnifeFork />
          {cuisine_type}
        </li>
      </ul>
    </div>
  );
};

export default DashCard;
