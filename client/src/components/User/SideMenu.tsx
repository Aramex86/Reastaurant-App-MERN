import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { BsFillHouseFill } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../Store/hooks/hooks";
import { authUserSelector } from "../../Store/slice/userSlice";

const SideMenu = () => {
  const authUser = useAppSelector(authUserSelector);
  const [heigth, setHeigth] = useState<number>(100);

  useEffect(() => {
    const heigthW = window.innerHeight;
    setHeigth(heigthW);
  }, [heigth]);

  const { _id } = authUser;
  return (
    <div className="sidemenu" style={{ height: heigth }}>
      <ul className="sidemenu-list">
        <li className="sidemenu-list__item">
          <Link to="/">
            <BsFillHouseFill />
            Home
          </Link>
        </li>
        <li className="sidemenu-list__item">
          <Link to={`/dashboard/${_id}`}>
            <MdDashboard />
            Dashboard
          </Link>
        </li>
        <li className="sidemenu-list__item">
          <Link to={`/profile/${_id}`}>
            <ImProfile /> User Profile
          </Link>
        </li>
        <li className="sidemenu-list__item">
          <Link to={`/addrestaurant/${_id}`}>
            <BiMessageSquareAdd /> Add Restaurant
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
