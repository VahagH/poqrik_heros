import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { storage } from "../../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";

const useStyles = makeStyles((theme) => ({
  uploadImageWrapper: {
    display: "flex",
    justifyContent: "space-around",
    flexFlow: "wrap",
  },
  btnChoose: {
    width: "100%",
    height: 40,
    marginBottom: 5,
    textTransform: "unset",
    marginTop: 8,
    fontSize: 16,
    border: "1px solid black",
    borderRadius: 4,
    "&.Mui-disabled": {
      border: "1px solid rgba(0,0,0,.4)",
    },
  },
  deleteBtn: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 28,
    height: 28,
    background: "red",
    color: "white",
    borderRadius: "50%",
    fontSize: 20,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageCont: {
    position: "relative",
    marginRight: 10,
    width: 180,
    minWidth: 150,
    marginTop: 10,
  },
  forEditBkg: {
    position: "relative",
    marginRight: 10,
    width: 120,
    minWidth: 100,
    marginTop: 10,
  },
}));

function UploadImages({
  label,
  multiple = false,
  handleSubmit,
  name,
  disable = false,
  value,
  error,
  helperText,
}: any) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const maxNumber = 5;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    let images;
    if (imageList.length === 1 && name !== "images") {
      images = imageList[0];
    }

    setImages(imageList as never[]);
    if (!images || images.length === 0) {
      handleSubmit(name, null);
    } else {
      handleSubmit(name, images);
    }
  };

  useEffect(() => {
    if (typeof value === "string" && value?.startsWith("img")) {
      getDownloadURL(ref(storage, value)).then((url) => {
        setImages([{ dataURL: url }] as never[]);
      });
    }
  }, [value]);

  return (
    <ImageUploading
      multiple={multiple}
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      //   maxFileSize={310000}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div>
          <Button
            className={classes.btnChoose}
            onClick={onImageUpload}
            {...dragProps}
            disabled={disable}
          >
            {label}
          </Button>
          <div className={classes.uploadImageWrapper}>
            {imageList.map((image, index) => (
              <div key={index} className={classes.imageCont}>
                <img src={image.dataURL} alt="" width="100%" />

                <div className="image-item__btn-wrapper">
                  <span
                    onClick={() => {
                      handleSubmit("deleteImgName", value);

                      onImageRemove(index);
                    }}
                    className={classes.deleteBtn}
                  >
                    &times;
                  </span>
                </div>
              </div>
            ))}
          </div>
          {error && (
            <p
              style={{
                color: "#FF3333",
                fontSize: 12,
                fontWeight: 400,
                marginLeft: 15,
              }}
            >
              {helperText}
            </p>
          )}
        </div>
      )}
    </ImageUploading>
  );
}

export default UploadImages;
