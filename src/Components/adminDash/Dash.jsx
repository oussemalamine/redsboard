import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import "./Dash.css";
function Dash() {
  return (
    <div className="dashContainer">
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
}
export default Dash;
