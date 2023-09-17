import React, { useState } from "react";
import { Button } from "primereact/button";
import { usersList } from "../services/auth.service";
import HeaderImage from "../assets/wissenlogo.PNG";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setToken, setUserList, showLoader } from "../redux/action";
import { EMAIL_REGEX, CHECKREG } from "../assets/constants";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [fieldsData, setFieldsData] = useState({
    email: "",
    password: "",
    check: false,
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
    check: false,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ENDPOINT = useSelector((state) => state?.auth?.endpoint);

  const setFieldValue = (e) => {
    setErrorMsg("");
    if (e?.target?.name == "check") {
      fieldValidation(e.target.name, e.target.checked);
      setFieldsData({ ...fieldsData, [e.target.name]: e.target.chekced });
    } else {
      fieldValidation(e.target.name, e.target.value);
      setFieldsData({ ...fieldsData, [e.target.name]: e.target.value });
    }
  };

  const loginCall = async (e) => {
    e.preventDefault();
    const Errs = Object.values(fieldsData).filter((value) => {
      if (!value || fieldErrors[value]) return true;
    });
    if (!Errs.length) {
      try {
        dispatch(showLoader(true));
        const res = await axios({
          method: "post",
          url: ENDPOINT + "login",
          data: {
            email: fieldsData.email,
            password: fieldsData.password,
          },
        });
        if (res?.data) {
          alert("Logged In Successfully");
          dispatch(setToken(res.data.token));
          getUserList(res.data.token);
          navigate("/users");
        }
      } catch (e) {
        if (e?.response?.data?.error) setErrorMsg(e.response.data.error);
        else setErrorMsg(e.message);
      } finally {
        dispatch(showLoader(false));
      }
    }
  };

  const getUserList = async (Token) => {
    try {
      dispatch(showLoader(true));
      const res = await axios({
        method: "get",
        url: ENDPOINT + "unknown",
        headers: {
          Authorization: "Bearer " + Token,
        },
      });
      if (res?.data) {
        dispatch(setUserList(res.data.data));
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(showLoader(false));
    }
  };

  const fieldValidation = (field, value) => {
    if (field === "email") {
      checkEmpty(field, value);
      if (!CHECKREG(EMAIL_REGEX, value)) {
        setErrorMsg("Please enter a valid email id");
        setFieldErrors({ ...fieldErrors, [field]: true });
      } else {
        setFieldErrors({ ...fieldErrors, [field]: false });
      }
    } else if (field === "password") {
      checkEmpty(field, value);
    } else if (field === "check") {
      if (!value) {
        setErrorMsg("Please check the checkbox");
        setFieldErrors({ ...fieldErrors, [field]: true });
      } else {
        setFieldErrors({ ...fieldErrors, [field]: false });
      }
    }
  };

  const checkEmpty = (field, value) => {
    if (!value.length) {
      setErrorMsg(`${field} cannot be empty`);
      setFieldErrors({ ...fieldErrors, [field]: true });
    } else {
      setFieldErrors({ ...fieldErrors, [field]: false });
    }
  };

  return (
    <div className="container col-md-4 col-sm-6 col-lg-4">
      <header className="">
        <img src={HeaderImage} className="d-flex" />
        <p className="font-weight-bold d-flex d-blk">
          Hello there, Sign In to continue
        </p>
      </header>
      <form onSubmit={loginCall}>
        <div className="form-group my-3">
          <label
            className="label d-flex justify-content-start d-grey"
            htmlFor="email">
            Email
          </label>
          <input
            type={"text"}
            name="email"
            id="email"
            onChange={setFieldValue}
            className={
              fieldErrors.email ? "p-invalid form-control" : "form-control"
            }
          />
        </div>
        <div className="form-group my-3">
          <label
            className="label d-flex justify-content-start d-grey"
            htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={"password"}
            onChange={setFieldValue}
            className={
              fieldErrors.password ? "p-invalid form-control" : "form-control"
            }
          />
        </div>
        <div className="error text-danger d-flex text-left">{errorMsg}</div>
        <div className="form-check my-3">
          <input
            className={
              fieldErrors.check
                ? "p-invalid form-check-input"
                : "form-check-input"
            }
            type="checkbox"
            name="check"
            id="flexCheckDefault"
            onChange={setFieldValue}
          />
          <label
            className="form-check-label text-left d-grey"
            htmlFor="flexCheckDefault">
            By creating or logging into an account, you are agreeing with our{" "}
            <span className="font-weight-bold d-blk">Terms & Conditions</span>{" "}
            and <span className="font-weight-bold d-blk">Privacy Policy</span>
          </label>
        </div>

        <Button type="submit" label="Next" className="form-control clr-vlt" />
      </form>
    </div>
  );
}
