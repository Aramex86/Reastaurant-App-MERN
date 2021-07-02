import React from "react";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../Store/hooks/hooks";
import { authUserSelector } from "../../Store/slice/userSlice";
import { BiMessageSquareAdd } from "react-icons/bi";
import { BsFillHouseFill } from "react-icons/bs";

const UserMenu = () => {
  const authUser = useAppSelector(authUserSelector);

  const { _id } = authUser;

  return (
    <div className="user-menu">
      <ul className="user-menu_list">
        <li className="user-menu_list_item">
          <Link to="/">
            <BsFillHouseFill />
            Home
          </Link>
        </li>
        <li className="user-menu_list_item">
          <Link to={`/dashboard/${_id}`}>
            <MdDashboard />
            dashboard
          </Link>
        </li>
        <li className="user-menu_list_item">
          <Link to={`/profile/${_id}`}>
            <ImProfile />
            profile
          </Link>
        </li>
        <li className="user-menu_list_item">
          <Link to={`/addrestaurant/${_id}`}>
            <BiMessageSquareAdd /> Add Restaurant
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
