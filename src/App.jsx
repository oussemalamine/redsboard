import React from "react";
import Login from "./Components/loginPage/Login";
import "./App.css";
import Register from "./Components/Register/Register";
import { Routes, Route } from "react-router-dom";
import Dash from "./Components/adminDash/Dash";
import Dashboard from "./Components/DashPages/Dashboard";
import Database from "./Components/DashPages/Database";
import Events from "./Components/DashPages/Events";
import HR from "./Components/DashPages/HRmanagment";
import Activity from "./Components/DashPages/LatestActivity";
import Marketing from "./Components/DashPages/Marketing";
import User from "./Components/DashPages/User";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <Routes>
          <Route path="/Dash" element={<Dash />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="database" element={<Database />} />
            <Route path="events" element={<Events />} />
            <Route path="HR" element={<HR />} />
            <Route path="activities" element={<Activity />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="user" element={<User />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
