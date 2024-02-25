import React from "react";
import logo from "../Images/whiteLogo.png";
import { AiFillHome } from "react-icons/ai";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { FaDatabase, FaHandHoldingDollar } from "react-icons/fa6";
import { MdEventNote } from "react-icons/md";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="" />
      </div>
      <div className="sidebar-title">
        <h3>Admin Panel</h3>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <a href="">
            <AiFillHome
              className="sidebar-item-icon"
              style={{ color: "#9e9ea4" }}
            />
            Dashboard
          </a>
          <FaArrowRight style={{ color: "#9e9ea4" }} />
        </li>
        <li className="sidebar-item">
          <a href="">
            <PiFinnTheHumanFill
              className="sidebar-item-icon"
              style={{ color: "#9e9ea4" }}
            />
            HR Management
          </a>
          <FaArrowRight style={{ color: "#9e9ea4" }} />
        </li>
        <li className="sidebar-item">
          <a href="">
            <FaDatabase
              className="sidebar-item-icon"
              style={{ color: "#9e9ea4" }}
            />
            Database
          </a>
          <FaArrowRight style={{ color: "#9e9ea4" }} />
        </li>
        <li className="sidebar-item">
          <a href="">
            <MdEventNote
              className="sidebar-item-icon"
              style={{ color: "#9e9ea4" }}
            />
            Events
          </a>
          <FaArrowRight style={{ color: "#9e9ea4" }} />
        </li>
        <li className="sidebar-item">
          <a href="">
            <FaHandHoldingDollar
              className="sidebar-item-icon"
              style={{ color: "#9e9ea4" }}
            />
            Marketing
          </a>
          <FaArrowRight style={{ color: "#9e9ea4" }} />
        </li>
        <li className="sidebar-item">
          <a href="">
            <FaUser
              className="sidebar-item-icon"
              style={{ color: "#9e9ea4" }}
            />
            User
          </a>
          <FaArrowRight style={{ color: "#9e9ea4" }} />
        </li>
        <li className="sidebar-item">
          <a href="">
            <FiActivity
              className="sidebar-item-icon"
              style={{ color: "#9e9ea4" }}
            />
            Latest Activity
          </a>
          <FaArrowRight style={{ color: "#9e9ea4" }} />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
