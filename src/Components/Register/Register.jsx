import logo from "../Images/logo.png";
import { FaPhone, FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { signupValidation } from "./signupValidation.jsx";
import Tooltip from "./Tooltip.jsx";
import { Link, json } from "react-router-dom";
import "./register.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import bcrypt from "bcryptjs";

const initialValues = {
  username: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  confirmation: "",
};

const onSubmit = async (values, actions) => {
  console.log("VALUES =>", values); /* these are the values send by the form  */
  // Hash the password from the values;
  const pass = await bcrypt.hash(values.password, 10);
  // Hash the pass confirmationf;
  const confPass = await pass;
  try {
    // Post request for sending user's data to the server;
    const sendData = await axios.post("http://localhost:3000/api/register", {
      ...values,
      password: pass,
      confirmation: confPass,
    });
    if (sendData.data === "Registration Succeeded, Welcome On Board!")
      // Show Success Message and Change Path Here;
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
  } catch (error) {
    console.log("sendData() error =>", error);
  }
};

function Register() {
  const { values, handleChange, touched, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: signupValidation,
    onSubmit,
  });

  return (
    <div className="formContainer2">
      <div className="register-form">
        <h1 className="app-title">
          <img src={logo} alt="redstart logo-r" className="logo-r" />
        </h1>
        <form action="#" className="form-r" onSubmit={handleSubmit}>
          <h1 className="form-title">Create an account</h1>
          <div
            className={
              errors.username && touched.username
                ? "input-group-r error-r"
                : "input-group-r"
            }
          >
            <FaUser className="icon-r" />
            <input
              type="text"
              placeholder="Full Name"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && touched.username && (
              <Tooltip state={true} error={errors.username} />
            )}
          </div>
          <div
            className={
              errors.email && touched.email
                ? "input-group-r error-r"
                : "input-group-r"
            }
          >
            <FaEnvelope className="icon-r" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <Tooltip state={true} error={errors.email} />
            )}
          </div>
          <div
            className={
              errors.phone && touched.phone
                ? "input-group-r error-r"
                : "input-group-r"
            }
          >
            <FaPhone className="icon-r" />
            <PhoneInput
              className="number"
              country={"tn"}
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={values.phone}
              onChange={(event) => (values.phone = event)}
            />
            {errors.phone && touched.phone && (
              <Tooltip state={true} error={errors.phone} />
            )}
          </div>
          <div
            className={
              errors.password && touched.password
                ? "input-group-r error-r"
                : "input-group-r"
            }
          >
            <FaLock className="icon-r" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password && (
              <Tooltip state={true} error={errors.password} />
            )}
          </div>
          <div
            className={
              errors.confirmation && touched.confirmation
                ? "input-group-r error-r"
                : "input-group-r"
            }
          >
            <FaLock className="icon-r" />
            <input
              type="password"
              placeholder="Password Confirmation"
              name="confirmation"
              value={values.confirmation}
              onChange={handleChange}
            />
            {errors.confirmation && touched.confirmation && (
              <Tooltip state={true} error={errors.confirmation} />
            )}
          </div>

          <div
            className={
              errors.role && touched.role
                ? "input-group-r error-r"
                : "input-group-r"
            }
          >
            <select name="role" value={values.role} onChange={handleChange}>
              <option value="" disabled>
                Please Select Your Business Role
              </option>
              <option value="super admin">Super Admin</option>
              <option value="hr">HR</option>
              <option value="comm">Comm</option>
              <option value="logistics">Logistics</option>
              <option value="regional manager">Regional Manager</option>
            </select>
            {errors.role && touched.role && (
              <Tooltip state={true} error={errors.role} />
            )}
          </div>
          <button type="submit" className="btn-r">
            Sign Up
          </button>
          <Link to="/login" className="login-link">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
