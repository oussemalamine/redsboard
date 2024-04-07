import React from "react";
import ImageCropper from "./ImageCropper";
import { IoClose } from "react-icons/io5";

function PhotoModal({ setImage, UploadPhoto }) {
  return (
    <div className="editUser-container">
      <div className="modal">
        <ImageCropper setImage={setImage} UploadPhoto={UploadPhoto} />
        <IoClose
          className="close-modal-btn"
          onClick={() => UploadPhoto(false)}
        />
      </div>
    </div>
  );
}

export default PhotoModal;
