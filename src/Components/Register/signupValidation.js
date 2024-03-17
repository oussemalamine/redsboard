import * as Yup from "yup";
import "yup-phone-lite";
const signupValidation = Yup.object({
  username: Yup.string().required("Required").min(6, "at least 6 characters"),
  email: Yup.string().email("Not valid").required("Required"),
  phone: Yup.string().phone("TN", "Not valid").required("Required"),
  role: Yup.string()
    .oneOf(["super admin", "hr", "logistics", "comm", "regional manager"])
    .required("Required"),
  password: Yup.string().required("Required").min(8, "At least 8 characters"),
  confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Not matched")
    .required("Required"),
});

export default signupValidation;
