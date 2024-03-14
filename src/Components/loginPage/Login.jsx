//********************* import
import React, { useRef, useState, useEffect } from "react";
import img from "../Images/logo.png";
import "./Login.css";
import signinValidation from "./signupValidation";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ParticlesBackground from "../ParticlesBackground";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin, setLogged } from "../../app/features/login/loginSlice";
import { useDebouncedCallback } from "use-debounce";
const initial_Values = {
  email: "",
  password: "",
};
//************ Login Component
function Login() {
  // ********Hooks declaration
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, touched, errors, isValid } =
    useFormik({
      initialValues: initial_Values,
      validationSchema: signinValidation,
      onSubmit: async (values) => {
        console.log(values);
        if (isValid) {
          localStorage.setItem("isLogged", true);
          dispatch(setLogged());
          navigate("/Dash");
        }
      },
    });
  console.log(state);
  //******* functions
  function handleVisiblity() {
    setPasswordVisible(!passwordVisible);
  }
  const handleStore = useDebouncedCallback((key, value) => {
    dispatch(handleLogin({ key, value }));
  }, 250);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLogged") === "true";
    if (isLoggedIn) {
      navigate("/Dash");
    }
  }, []);
  return (
    <div className="formContainer1">
      <form onSubmit={handleSubmit} className="form" action="post">
        <img className="logo" src={img} alt="" />
        <h3>Sign in to continue</h3>
        <div className="inputGroup inputGroup1">
          <div className="icon icon1">
            <FontAwesomeIcon icon={faEnvelope} style={{ color: "#000000" }} />
          </div>
          <input
            type="text"
            className="inputField inputEmail"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={(e) => {
              handleChange(e);
              handleStore("email", e.target.value);
            }}
          />
        </div>

        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <div className="inputGroup inputGroup2">
          <div className="icon icon2">
            <FontAwesomeIcon icon={faLock} style={{ color: "#000000" }} />
          </div>
          <div className="inputContainer">
            <input
              className="inputField inputPassword"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={(e) => {
                handleChange(e);
                handleStore("password", e.target.value);
              }}
            />

            <div className="eyeIcon">
              <FontAwesomeIcon
                onClick={handleVisiblity}
                icon={passwordVisible ? faEyeSlash : faEye}
                style={{ color: "#000000" }}
              />
            </div>
          </div>
        </div>

        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <div className="infos">
          <label>
            <input className="checkbox" type="checkbox" />
            Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>
        <button className="btn" type="submit">
          {" "}
          <span>
          </span>
          Get Started
        </button>
        <p className="upLink">
          Not a member ?<Link to="/Register">Sign Up</Link>
        </p>
      </form>
      <ParticlesBackground />
    </div>
  );
}

export default Login;
