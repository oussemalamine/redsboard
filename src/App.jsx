import React from "react";
import Login from "./Components/loginPage/Login";
import "./App.css";
import Register from "./Components/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dash from "./Components/adminDash/Dash";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dash" element={<Dash />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
