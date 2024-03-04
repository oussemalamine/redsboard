import logo from "../Images/logo.png";
import { FaPhone, FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { signupValidation } from "./signupValidation.jsx";
import Tooltip from "./Tooltip.jsx";
import { Link } from "react-router-dom";
import "./register.css";
import ParticlesBackground from "../ParticlesBackground";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../app/features/register/registerSlice.js";
import { useDebouncedCallback } from "use-debounce";
const initialValues = {
  username: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  confirmation: "",
};
const onSubmit = async (values, actions) => {
  console.log(values); /* these are the values send by the form  */
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};
function Register() {
  const { values, handleChange, touched, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: signupValidation,
    onSubmit,
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.registerSlice);
  console.log(state);
  const handleStore = useDebouncedCallback((key, value) => {
    dispatch(handleRegister({ key, value }));
  }, 250);
  return (
    <div className="formContainer2">
      <ParticlesBackground />
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
              onChange={(e) => {
                handleChange(e);
                handleStore("username", e.target.value);
              }}
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
              onChange={(e) => {
                handleChange(e);
                handleStore("email", e.target.value);
              }}
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
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={values.phone}
              onChange={(e) => {
                handleChange(e);
                handleStore("phone", e.target.value);
              }}
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
              onChange={(e) => {
                handleChange(e);
                handleStore("password", e.target.value);
              }}
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
              onChange={(e) => {
                handleChange(e);
                handleStore("confirmation", e.target.value);
              }}
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
            <select
              name="role"
              value={values.role}
              onChange={(e) => {
                handleChange(e);
                handleStore("role", e.target.value);
              }}
            >
              <option value="" disabled>
                Select your role
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
