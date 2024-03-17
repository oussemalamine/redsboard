// Dash.jsx
import React, { useState } from "react";
import { Outlet, BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import "./Dash.css";
function Dash() {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  // Fonction pour mettre à jour l'élément sélectionné
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <div className="dashContainer">
      {/* Passer la fonction à Sidebar */}
      <Header selectedItem={selectedItem} />
      <Sidebar handleItemClick={handleItemClick} />
      <Main />
    </div>
  );
}

export default Dash;
