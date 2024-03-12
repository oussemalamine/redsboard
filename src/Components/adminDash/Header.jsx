import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { IoSettings } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import face from "../Images/face.jpg";
import Menu from "./Menu/Menu";
import { FaMessage } from "react-icons/fa6";

function Header({ selectedItem }) {
  return (
    <header className="header-dash">
      <div className="header-title">
        <h3>{selectedItem}</h3>
      </div>
      <SearchBar />
      <div className="header-list-container">
        <ul className="header-list">
          <li className="header-list-item">
            <Menu  />
          </li>
          <li className="header-list-item">
            <FaMessage style={{ color: "white" }} />
          </li>
          <li className="header-list-item">
            <IoIosNotifications style={{ color: "white" }} />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
