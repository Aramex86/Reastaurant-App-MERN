import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import { HiUserCircle } from "react-icons/hi";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import { isAuthUserSelector, reqIsAuth } from "../../Store/slice/userSlice";
import LogInMenu from "../Login/LogInMenu";
import Search from "../common/Search/Search";

const Header = () => {
  const auth = useAppSelector(isAuthUserSelector);
  const dispatch = useAppDispatch();

  const history = useHistory();
  useEffect(() => {
    dispatch(reqIsAuth());
  }, []);

  return (
    <header className="header">
      <div>
        <Link to="/" className="logo">
          <img src={logo} alt="logo" className="logo__image" />
          <div className="logo__text">Food Search</div>
        </Link>
      </div>
      <Search />
      <div className="register-login">
        {auth ? (
          <LogInMenu />
        ) : (
          <>
            {" "}
            <button
              className="btn btn--login"
              onClick={() => history.push("/login")}
            >
              Login
            </button>
            <HiUserCircle fill="#fff" size="36" />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
