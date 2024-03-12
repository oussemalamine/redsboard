import React from "react";
import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";
function PageNotFound() {
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate("/login");
  };

  return (
    <div className="not-found-container">
      <div className="not-found-container-info">
        <p className="codeError">Oops!</p>
        <h1>401- Authorization required</h1>
        <p>WE'RE SORRY, YOUR REQUEST IS UNAUTHORIZED</p>
        <button onClick={handleRefresh} className="redirectBtn">
          Refresh
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
