import React, { useEffect, useState } from "react";
import "./User.css";
import { FaLinkedin } from "react-icons/fa6";
import img from "../Images/user.png";
import axiosInstance from "../axiosInstance";
import { MdEdit } from "react-icons/md";
import EditUser from "./EditUser";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";
import { GiRank3 } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaIdCard } from "react-icons/fa";
import { FcTreeStructure } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoMail } from "react-icons/io5";
import EditPassword from "./EditPassword";
import PhotoModal from "./PhotoModal";
function User({ username, data }) {
  const [user, setUser] = useState();
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editMode2, setEditMode2] = useState(false);
  const [updateLog, setUpdateLog] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [Upload, UploadPhoto] = useState(false);
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log("UpdatedLog :", updateLog);
    setEditedData((prev) => {
      if (prev === null) return [name];
      const index = prev.indexOf(name);
      if (index !== -1) {
        // If name exists, update it
        const updatedData = [...prev];
        updatedData[index] = name;
        return updatedData;
      } else {
        // If name doesn't exist, add it
        return [...prev, name];
      }
    });
  };
  const calculateCompletionPercentage = () => {
    const fieldsToCheck = [
      "role",
      "department",
      "cin",
      "matricule",
      "phone",
      "adress",
      "birthday",
      "exp",
      "password",
    ];
    const completedFields = fieldsToCheck.filter((field) => {
      const value = user[field];
      return value !== undefined && value !== "" && value !== "Undefined";
    });
    const completionPercentage =
      (completedFields.length / fieldsToCheck.length) * 100;
    return completionPercentage.toFixed(2);
  };

  const handleEdit = () => {
    setEditMode(true);
  };
  const handleEditMode = () => {
    setEditMode2(true);
  };
  const handleConfirm = async () => {
    try {
      const updatedData = {};
      editedData.forEach((field) => {
        updatedData[field] = user[field];
      });
      const response = await axiosInstance.put(
        `/users/${user._id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("User updated successfully:", response.data);
        if (editedData.length > 0) {
          // Check if editedData is not empty
          editedData.forEach((element) => {
            const currentDate = new Date().toLocaleDateString();
            setUpdateLog((prevUpdateLog) => {
              const updatedLogs = [...prevUpdateLog];
              const existingLogIndex = updatedLogs.findIndex(
                (log) => log.date === currentDate
              );
              if (existingLogIndex !== -1) {
                updatedLogs[existingLogIndex].events.push(
                  `User update ${element} at ${new Date().toLocaleTimeString()}`
                );
              } else {
                updatedLogs.push({
                  date: currentDate,
                  events: [
                    `User update ${element} at ${new Date().toLocaleTimeString()}`,
                  ],
                });
              }
              return updatedLogs;
            });
          });
        }
        setEditedData([]);
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
    setEditMode(false);
  };
  const handleConfirm2 = async () => {
    try {
      const updatedData = {};
      editedData.forEach((field) => {
        updatedData[field] = user[field];
      });
      const response = await axiosInstance.put(
        `/users/${user._id}`,
        updatedData
      );
      if (response.status === 200) {
        console.log("User updated successfully:", response.data);
        if (editedData.length > 0) {
          // Check if editedData is not empty
          editedData.forEach((element) => {
            const currentDate = new Date();
            const tomorrow = currentDate.setDate(currentDate.getDate() + 1);
            const tomorrowDate = new Date(tomorrow).toLocaleDateString();
            setUpdateLog((prevUpdateLog) => {
              const updatedLogs = [...prevUpdateLog];
              const existingLogIndex = updatedLogs.findIndex(
                (log) => log.date === tomorrowDate
              );
              if (existingLogIndex !== -1) {
                updatedLogs[existingLogIndex].events.push(
                  `User update ${element} at ${new Date().toLocaleTimeString()}`
                );
              } else {
                updatedLogs.push({
                  date: tomorrowDate,
                  events: [
                    `User update ${element} at ${new Date().toLocaleTimeString()}`,
                  ],
                });
              }
              return updatedLogs;
            });
          });
        }
        setEditedData(null);
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
    setEditMode2(false);
  };
  const handleConfirmPhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image); // Assuming image is a File object obtained from input[type=file]

      const response = await axiosInstance.put(`/users/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("User photo updated successfully:", response.data);
        const currentDate = new Date().toLocaleDateString();
        setUpdateLog((prevUpdateLog) => {
          const updatedLogs = [...prevUpdateLog];
          const existingLogIndex = updatedLogs.findIndex(
            (log) => log.date === currentDate
          );
          if (existingLogIndex !== -1) {
            updatedLogs[existingLogIndex].events.push(
              `User update photo at ${new Date().toLocaleTimeString()}`
            );
          } else {
            updatedLogs.push({
              date: currentDate,
              events: [
                `User update photo at ${new Date().toLocaleTimeString()}`,
              ],
            });
          }
          return updatedLogs;
        });
        setUser((prevUser) => ({
          ...prevUser,
          image: response.data.image,
        }));
      } else {
        console.error("Failed to update user photo:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user photo:", error.message);
    }
    setImage(null);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users?username=${username}`);
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, [username]);
  if (!user) {
    return null; // Or you can render a loading indicator
  }
  const completionPercentage = calculateCompletionPercentage();
  return (
    <div className="user-container">
      {Upload ? (
        <PhotoModal setImage={setImage} UploadPhoto={UploadPhoto} />
      ) : null}
      {open ? (
        <div className="editUser-container">
          <EditUser
            setOpen={setOpen}
            user={user}
            setUser={setUser}
            setUpdateLog={setUpdateLog}
          />
        </div>
      ) : null}
      {open2 ? (
        <div className="editUser-container">
          {" "}
          <EditPassword setOpen={setOpen2} user={user} />
        </div>
      ) : null}
      <div className="user-information1">
        <div className="photo-container">
          <img src={image ? image : user.image ? user.image : img} alt="" />
          <button
            onClick={() => UploadPhoto(true)}
            className="upload-photo-edit"
          >
            <MdEdit />
          </button>
        </div>

        <h3>{user.username}</h3>
        <p className="exp">
          <GiRank3 />
          Exp points:{user.Exp}
        </p>
        <div className="linkedin-wrapper">
          <label htmlFor="LinkedIn">
            <FaLinkedin />
          </label>
          <p className="linkedIn">
            {user.linkedIn ? user.linkedIn : "Undefined"}
          </p>
        </div>
        {image ? (
          <div className="btns">
            <button className="confirm-btn" onClick={handleConfirmPhoto}>
              confirm
            </button>
            <butto className="edit-btn" onClick={() => setImage(null)}>
              Cancel
            </butto>
          </div>
        ) : (
          <div className="btns">
            <button className="edit-personal-btn" onClick={() => setOpen(true)}>
              <MdEdit style={{ color: "#044c54" }} />
            </button>
          </div>
        )}

        <div className="completion-percentage">
          <div
            className="indicator"
            style={{
              background: `linear-gradient(to right, #044c54 ${completionPercentage}%, transparent ${completionPercentage}%)`,
            }}
          ></div>
          {completionPercentage}% Completed
        </div>
        {editMode ? (
          <>
            {" "}
            <div className="info-item1 info-item">
              {" "}
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                className="role"
                name="role"
                value={user.role}
                onChange={handleChange}
              />
            </div>
            <div className="info-item2  info-item">
              {" "}
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                className="department"
                name="department"
                value={user.department}
                onChange={handleChange}
              />
            </div>
            <div className="info-item3  info-item">
              {" "}
              <label htmlFor="cin">N°CIN:</label>
              <input
                type="text"
                className="cin"
                name="cin"
                value={user.cin}
                onChange={handleChange}
              />
            </div>
            <div className="info-item4  info-item">
              {" "}
              <label htmlFor="matricule">Matricule Fiscale:</label>
              <input
                type="text"
                className="matricule"
                name="matricule"
                value={user.matricule}
                onChange={handleChange}
              />
            </div>
            <div className="button">
              <button className="confirm-btn" onClick={handleConfirm}>
                Confirm
              </button>
              <button className="edit-btn" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>{" "}
          </>
        ) : (
          <>
            {" "}
            <div className="info-item1 info-item">
              {" "}
              <label htmlFor="role">
                <FcBusinessman /> Role:
              </label>
              <p className="role">{user.role}</p>
            </div>
            <div className="info-item2  info-item">
              {" "}
              <label htmlFor="department">
                <FcTreeStructure /> Department:
              </label>
              <p className="department">{user.department}</p>
            </div>
            <div className="info-item3  info-item">
              {" "}
              <label htmlFor="cin">
                <FaIdCard /> N°CIN:
              </label>
              <p className="cin">{user.cin ? user.cin : "undefined"}</p>
            </div>
            <div className="info-item4  info-item">
              {" "}
              <label htmlFor="matricule">
                <FcMoneyTransfer /> Matricule Fiscale:
              </label>
              <p className="matricule">
                {user.matricule ? user.matricule : "undefined"}
              </p>
            </div>
            <div className="button">
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>
              {/* <button className="confirm-btn">Confirm</button> */}
            </div>
          </>
        )}
      </div>
      <div className="user-information2">
        <div className="inf1">
          {editMode2 ? (
            <>
              {" "}
              <div className="info-item1  info-item">
                <label htmlFor="phone ">Phone:</label>
                <input
                  type="text"
                  className="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item2  info-item">
                {" "}
                <label htmlFor="adress">Adress:</label>
                <input
                  type="text"
                  className="adress"
                  name="adress"
                  value={user.adress}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item3  info-item">
                {" "}
                <label htmlFor="birthday">Birthday:</label>
                <input
                  type="text"
                  className="birthday"
                  name="birthday"
                  value={user.birthday}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item4  info-item">
                {" "}
                <label htmlFor="exp">Email:</label>
                <input
                  type="text"
                  className="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="button">
                <button className="confirm-btn" onClick={handleConfirm2}>
                  Confirm
                </button>
                <button
                  className="edit-btn"
                  onClick={() => setEditMode2(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="info-item1  info-item">
                {" "}
                <label htmlFor="phone ">
                  <FaPhoneAlt /> Phone:
                </label>
                <p className="phone">{user.phone}</p>
              </div>
              <div className="info-item2  info-item">
                {" "}
                <label htmlFor="adress">
                  <IoLocation />
                  Adress:
                </label>
                <p className="adress">{user.adress}</p>
              </div>
              <div className="info-item3  info-item">
                {" "}
                <label htmlFor="birthday">
                  <FaBirthdayCake />
                  Birthday:
                </label>
                <p className="birthday">{user.birthday}</p>
              </div>
              <div className="info-item4  info-item">
                {" "}
                <label htmlFor="exp">
                  <IoMail />
                  Email:
                </label>
                <p className="email">{user.email}</p>
              </div>
              <div className="info-item5  info-item">
                {" "}
                <label htmlFor="password">
                  <RiLockPasswordFill /> Password:
                </label>
                <p className="password">*********</p>
              </div>
              <div className="button">
                <button className="edit-btn" onClick={handleEditMode}>
                  Edit
                </button>
                <button className="confirm-btn" onClick={() => setOpen2(true)}>
                  Edit Password
                </button>
              </div>
            </>
          )}
        </div>
        <div className="inf2">
          <div className="session-information">
            <h2>Session Information</h2>
            <div>
              <h3>Logged In: </h3>
              {formatDateTime(data.loginTime)}
            </div>
            <div>
              <h3>Session Expiry Time: </h3>
              {formatDateTime(data.expiryTime)}
            </div>
          </div>
          <div className="changes">
            <h2 className="history-title">History</h2>
            <div className="history-container">
              {updateLog.map((log) => {
                return (
                  <div className="history-item">
                    {" "}
                    <h3>{log.date}</h3>
                    <ul>
                      {log.events.map((event) => {
                        return <li>{event}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
