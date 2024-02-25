import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import face from "../Images/face.jpg";
import { RiMessage2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

function Header() {
  const [dropdown, setDrop] = useState(false);
  function setVisible() {
    setDrop(!dropdown);
  }
  return (
    <header className="header-dash">
      <h1>Database</h1>
      <SearchBar />
      <ul className="header-conf">
        <li className="header-conf-item">
          <IoIosNotifications
            className="header-icon"
            style={{ color: "#fff" }}
          />
        </li>
        <li className="header-conf-item">
          <RiMessage2Fill className="header-icon" style={{ color: "#fff" }} />
        </li>
        <li className="header-conf-item ">
          <img src={face} alt="" className="face-img" />
        </li>
        <li className="header-conf-item down-key">
          <MdKeyboardArrowDown
            onClick={setVisible}
            className="down-icon"
            style={{ color: "#fff" }}
          />
          <div className={dropdown ? "liste-deroul dropdown" : "liste-deroul"}>
            <ul>
              <li>Settings</li>
              <li>Profile</li>
              <li>Logout</li>
            </ul>
            <div className="liste-deroul-fleche "></div>
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Header;
