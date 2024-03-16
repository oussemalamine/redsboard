import React, { useState } from "react";
import "./HandleFileName.css";
function HandleFileName({ setShowFileNameInput, onSubmit }) {
  const [filenameInput, setFilenameInput] = useState("");

  const handleChange = (e) => {
    setFilenameInput(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(filenameInput);
  };
  const handleClose = () => {
    setShowFileNameInput(false);
  };
  return (
    <div className="filename-container">
      <h1>Choose FileName</h1>
      <input
        type="text"
        placeholder="Choose File Name"
        value={filenameInput}
        onChange={handleChange}
      />
      <div className="buttons-filename">
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default HandleFileName;
