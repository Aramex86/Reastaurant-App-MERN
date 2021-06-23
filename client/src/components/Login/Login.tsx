import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { LoginType } from "../../types/types";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import {
  loginUserErrorSelector,
  loginUserSuccessSelector,
  reqIsAuth,
  reqLoginUser,
} from "../../Store/slice/userSlice";

const validate = (values: LoginType) => {
  const errors = {} as LoginType;

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 8) {
    errors.password = "Must be 8 characters or less";
  }

  return errors;
};

const Login = () => {
  const loginSuccess = useAppSelector(loginUserSuccessSelector);
  const loginError = useAppSelector(loginUserErrorSelector);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<LoginType>();

  const history = useHistory();

  useEffect(() => {
    if (data) {
      dispatch(reqLoginUser(data));
    }
    if (loginSuccess) return history.push("/");
  }, [loginSuccess, data, loginError]);

  const formik = useFormik<LoginType>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      setData(values);
    },
  });

  return (
    <div className="loginwrapp">
      <form className="loginwrapp__form" onSubmit={formik.handleSubmit}>
        <h3>Wellcome</h3>
        <input
          name="email"
          type="text"
          id="email"
          placeholder="Email"
          className="loginwrapp__form-email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <div
            style={{
              color: "#ff2323eb",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {formik.errors.email}
          </div>
        ) : null}
        <input
          name="password"
          type="text"
          id="password"
          placeholder="Password"
          className="loginwrapp__form-password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? (
          <div
            style={{
              color: "#ff2323eb",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {formik.errors.password}
          </div>
        ) : null}
        <button type="submit" className="btn btn--loginFform">
          Login
        </button>
        <span>
          Don't have an account{" "}
          <Link to="/register" style={{ color: "#39fa63d4" }}>
            Register one
          </Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default Login;
