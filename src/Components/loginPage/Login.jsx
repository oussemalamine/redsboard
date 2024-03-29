//********************* import
import React, { useRef, useState } from "react";
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
import { Link } from "react-router-dom";
const initial_Values = {
  email: "",
  password: "",
};
//************ Login Component
function Login() {
  // ********Hooks declaration
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: initial_Values,
    validationSchema: signinValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  //******* functions
  function handleVisiblity() {
    setPasswordVisible(!passwordVisible);
  }
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
            onChange={handleChange}
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
              onChange={handleChange}
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
        <input className="btn" type="submit" value="Get Started" />
        <p className="upLink">
          Not a member ?<Link to="/Register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
