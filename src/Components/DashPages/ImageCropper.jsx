import React, { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "../../setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

function ImageCropper({ setImage, UploadPhoto }) {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");
  const handleChangePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      const imageElement = new Image();
      imageElement.src = imageUrl;

      imageElement.onload = () => {
        if (error) setError(""); // Clear any previous errors
        const { naturalWidth, naturalHeight } = imageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150x150 pixels");
          setImgSrc(""); // Reset image source
          return;
        }
        setImgSrc(imageUrl);
      };

      imageElement.onerror = () => {
        setError("Error loading image");
        setImgSrc(""); // Reset image source
      };
    };

    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const cropImage = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(cropImage, width, height);

    setCrop(centeredCrop);
  };
  console.log("error:", error);
  return (
    <>
      <label className="upload-image-btn">
        <input
          type="file"
          accept="image/*"
          className="upload-image-input"
          onChange={handleChangePhoto}
        />
        Upload Image
      </label>
      {imgSrc && (
        <div className="crop-container">
          {error.length > 0 ? <p>{error}</p> : null}
          <ReactCrop
            crop={crop}
            circularCrop
            keepSelection
            onChange={(percentCrop) => setCrop(percentCrop)}
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "250px" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className="edit-btn"
            onClick={() => {
              setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const DataUrl = previewCanvasRef.current.toDataURL();
              setImage(DataUrl);
              UploadPhoto(false);
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          style={{
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
            display: "none",
          }}
        />
      )}
    </>
  );
}

export default ImageCropper;
