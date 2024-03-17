import * as Yup from "yup";
// Form Validation using Yup
const signinValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default signinValidation;

import * as Yup from "yup";
// Form Validation using Yup
const signinValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default signinValidation;
