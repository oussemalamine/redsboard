import { useState, useEffect } from "react";
import "./EditUser.css";
import axiosInstance from "../axiosInstance";

function EditPassword({ setOpen, user }) {
  const [editedUser, setEditedUser] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPssword] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEditedUser(user);
  }, []);
  const editPassword = async () => {
    try {
      await axiosInstance.put(`/users/${user._id}`, editedUser);
      setError(null); // Reset error state
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password. Please try again.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.get("/checkPass", {
        params: { username: user.username, oldPassword: oldPassword },
      });
      if (
        response.data.message === "Password is correct" &&
        newPassword !== null
      ) {
        editedUser.password = newPassword;
        editedUser.confirmation = newPassword;
        console.log("editedUser", editedUser);
        await editPassword(); // Call editPassword function to update password
        setOpen(false); // Close modal
      } else {
        if (newPassword === null) {
          setError("password required");
        } else setError("Error: Incorrect old password");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("An error occurred. Please try again."); // Set error state
    }
  };

  return (
    <div className="linkedIn-popUp">
      <h3>Edit Informations</h3>
      <p style={{ color: "red" }}>{error ? error : null}</p>
      <p>
        please enter your informations here. We will send Updates Occasionally
      </p>
      <input
        className="linkedIn-input"
        type="password"
        name="old password"
        placeholder="old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        className="linkedIn-input"
        type="text"
        name="password"
        value={newPassword}
        placeholder="new Password"
        onChange={(e) => setNewPssword(e.target.value)}
      />
      <div className="pop-up-buttons">
        <button className="close-pop-button" onClick={handleClose}>
          Close
        </button>
        <button className="edit-pop-button" onClick={handleSubmit}>
          Edit
        </button>
      </div>
    </div>
  );
}
export default EditPassword;
