import React, { useEffect } from "react";
import { useFormik } from "formik";
import { RegisterType, RegUserRsponseType } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import {
  regUserErrorSelector,
  regUserSelector,
  reqRegUser,
} from "../../Store/slice/userSlice";
import { useHistory } from "react-router";
import SnackBar from "../common/Snackbar/SnackBar";

const validate = (values: RegisterType) => {
  const errors = {} as RegisterType;

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 20) {
    errors.name = "Must be 20 characters or less";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.name.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 8) {
    errors.password = "Must be 8 characters";
  }
  if (!values.passwordCheck) {
    errors.passwordCheck = "Required";
  } else if (values.password.length > 8) {
    errors.passwordCheck = "Must be 8 characters";
  } else if (values.password !== values.passwordCheck) {
    errors.passwordCheck = "Password didn't match";
  }

  return errors;
};

const Register = () => {
  const dispatch = useAppDispatch();
  const regUser: RegUserRsponseType | null = useAppSelector(regUserSelector);
  const regUserErr: RegUserRsponseType | null =
    useAppSelector(regUserErrorSelector);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    validate,
    onSubmit: (values) => {
      const { name, lastName, password, email } = values;

      const data = {
        name,
        lastName,
        password,
        email,
      };
      formik.resetForm();
      dispatch(reqRegUser(data));
    },
  });

  useEffect(() => {
    if (regUser !== null) {
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    }
  }, [regUser]);

  return (
    <div className="registerwrapp">
      {regUser && (
        <SnackBar
          mesg="Resgistration success , you will be redirected to Login!!!"
          type="success"
        />
      )}
      {regUserErr && <SnackBar mesg={`${regUserErr?.message}`} type="error" />}
      <form className="registerwrapp__form" onSubmit={formik.handleSubmit}>
        <h3>Create Account</h3>
        <div className="registerwrapp__form-name">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <div
              style={{
                color: "#ff2323eb",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div className="registerwrapp__form-lastname">
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.errors.lastName ? (
            <div
              style={{
                color: "#ff2323eb",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              {formik.errors.lastName}
            </div>
          ) : null}
        </div>
        <div className="registerwrapp__form-email">
          <input
            type="text"
            name="email"
            placeholder="Email"
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
        </div>
        <div className="registerwrapp__form-password">
          <input
            type="text"
            name="password"
            placeholder="Password"
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
        </div>
        <div className="registerwrapp__form-cofpassword">
          <input
            type="text"
            name="passwordCheck"
            placeholder="Confirm password"
            onChange={formik.handleChange}
            value={formik.values.passwordCheck}
          />
          {formik.errors.passwordCheck ? (
            <div
              style={{
                color: "#ff2323eb",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              {formik.errors.passwordCheck}
            </div>
          ) : null}
        </div>
        <button className="btn btn--loginFform">Register</button>
      </form>
    </div>
  );
};

export default Register;
