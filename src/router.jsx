import { createBrowserRouter } from "react-router-dom";
import Login from "./Components/loginPage/Login";
import Register from "./Components/Register/Register";
import Dashboard from "./Components/DashPages/Dashboard";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/Register", element: <Register /> },
  { path: "/Dash", element: <Dashboard /> },
]);

export default router;
