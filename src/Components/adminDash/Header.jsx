import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { IoSettings } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import face from "../Images/face.jpg";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaCaretDown } from "react-icons/fa";

function Header({ selectedItem }) {
  return (
    <header className="header-dash">
      <div className="header-title">
        <h3>{selectedItem}</h3>
      </div>
      <SearchBar />
      <div className="header-list-container">
        <ul className="header-list">
          <li>
            <IoSettings style={{ color: "white" }} />
          </li>
          <li>
            <IoIosNotifications style={{ color: "white" }} />
          </li>
        </ul>
        <div className="menu">
          <img src={face} alt="" />
          <FaCaretDown className="menuDown" style={{ color: "white" }} />
        </div>
      </div>
    </header>
  );
}

export default Header;
