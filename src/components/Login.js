import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken, setUserList, showLoader } from "../redux/action";
import { Button } from "primereact/button";
import { EMAIL_REGEX, CHECKREG } from "../assets/constants";
import HeaderImage from "../assets/wissenlogo.PNG";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [nextActive,  setNextActive]    = useState(false)
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
  const TOKEN = useSelector((state) => state?.auth?.token);
  const ENDPOINT = useSelector((state) => state?.auth?.endpoint);
  
  
  useEffect(() => {
    if (TOKEN) navigate("/users");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    const Errs = Object.values(fieldsData).filter((val)=>{
      if(!val) return true;
    })
    if(Errs.length || !CHECKREG(EMAIL_REGEX, fieldsData.email))
      setNextActive(false)
    else setNextActive(true)

  },[fieldsData])

  const setFieldValue = (e) => {
    setErrorMsg("");
    if (e?.target?.name === "check") {
      fieldValidation(e.target.name, e.target.checked);
      setFieldsData({ ...fieldsData, [e.target.name]: e?.target?.checked });
    } else {
      fieldValidation(e.target.name, e.target.value);
      setFieldsData({ ...fieldsData, [e.target.name]: e.target.value });
    }
  };



  const loginCall = async (e) => {
    e.preventDefault();
    if (nextActive) {
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
        else setErrorMsg(e?.message);
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
      setErrorMsg(e?.message);
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
        <img src={HeaderImage} className="d-flex" alt="wissen-logo"/>
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
              fieldErrors.email ? "p-invalid form-control cl-vlt" : "form-control cl-vlt"
            }
          />
        </div>
        <div className="form-group my-3">
          <label
            className="label d-flex justify-content-start d-grey"
            htmlFor="password">
            Password
          </label>
          <div className="d-flex justify-content-end">
            <input
              id="password"
              name="password"
              type={showPassword ? "text": "password"}
              onChange={setFieldValue}
              className={
                fieldErrors.password ? "p-invalid form-control cl-vlt" : "form-control cl-vlt"
              }
            />
            {showPassword?<i className="fa fa-eye-slash f-icon-password" onClick={()=>setShowPassword(!showPassword)}></i>:
            <i className="fa fa-eye f-icon-password" onClick={()=>setShowPassword(!showPassword)}></i>}



          </div>
        </div>
        <div className="error text-danger d-flex text-left">{errorMsg}</div>
        <div className="form-check my-3">
          <input
            className={
              fieldErrors.check
                ? "p-invalid form-check-input cl-vlt"
                : "form-check-input cl-vlt"
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

        <Button type="submit" label="Next" className={nextActive?"form-control b-0 clr-vlt":"form-control clr-nt-vlt b-0"} />

        <a href="#" className="d-flex cl-vlt text-decoration-none my-5  py-4 justify-content-center">Signin with company SSO</a>
      </form>
    </div>
  );
}
