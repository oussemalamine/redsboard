import React from "react";
import "./PageNotFound.css";
import Attention from "../Images/att.png";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-container-info">
        <p className="codeError">Oops!</p>
        <h1>404- Page Not Found</h1>
        <p>The page you requested could not be found ...</p>
        <Link className="redirectBtn" to={"/login"}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
