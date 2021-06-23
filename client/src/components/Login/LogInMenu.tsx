import React from "react";
import { HiUserCircle } from "react-icons/hi";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import { authUserSelector, reqLogoutUser } from "../../Store/slice/userSlice";
import { IsAuthType } from "../../types/types";
import UserMenu from "../User/UserMenu";

const LogInMenu = () => {
  const dispatch = useAppDispatch();
  const auth: IsAuthType = useAppSelector(authUserSelector);
  const history = useHistory();
  const { name } = auth;

  const randomBg = [
    "violet",
    "salmon",
    "goldenrod",
    "olivedrab",
    "hotpink",
  ] as Array<string>;

  let initials, bgColor;

  const nameBg = (name: string, arr: Array<string>) => {
    const firstLeter = name.toLocaleLowerCase().slice(0, 1);
    let color;
    arr.forEach((item) => {
      const first = item.slice(0, 1);
      if (firstLeter === first) {
        color = item;
      }
    });
    initials = firstLeter;
    bgColor = color;
  };

  nameBg(name, randomBg);

  const handleLogout = () => {
    dispatch(reqLogoutUser());
    history.push("/");
  };
  return (
    <>
      <button className="btn btn--login" onClick={handleLogout}>
        Logout
      </button>
      <div className="login__icon" style={{ background: `${bgColor}` }}>
        {`${initials}`.toLocaleUpperCase()}
      </div>
      <UserMenu />
    </>
  );
};

export default LogInMenu;
