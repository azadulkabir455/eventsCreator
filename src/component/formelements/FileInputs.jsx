import React, { useState, useRef, useEffect } from 'react';
import { Upload, XCircle } from 'feather-icons-react';
import { Field } from 'formik';

// For Image upload
import { v4 } from "uuid";
import { storage } from '../../firebase_config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FileInputs = ({ getUrlHandler }) => {
  // For Image Upload
  const [eventImage, setEventImage] = useState(null);
  const [uploadImgUrl, setUploadImgUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const inputRef = useRef(null);

  // Function for image select
  const dropHandler = (e) => {
    e.preventDefault();
    setEventImage(e.dataTransfer.files[0]);
  };

  const dragHandler = (e) => {
    e.preventDefault();
  };

  const imageHandler = (e) => {
    setEventImage(e.target.files[0]);
  };

  const removeeventImageHandler = () => {
    setEventImage(null);
  };

  // Function for sent Img url by props
  getUrlHandler(uploadImgUrl);


  useEffect(() => {

    // Uploading image to the firebase
    if (eventImage === null) return;
    const imgRef = ref(storage, `eventImages/${eventImage.name + v4()}`);
    const uploadTask = uploadBytesResumable(imgRef, eventImage);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(Math.floor(progress));

      switch (snapshot.state) {
        case "paused":
          console.log("Img uploading paused !");
          break;
        case "running":
          console.log("Img uploading running");
          break;
        default:
          console.log("Img uploading done");
      }
    }, (error) => {
      console.log(error.message);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setUploadImgUrl(url);
      });
    }
    );

  }, [eventImage]);

  return (
    <div className="mb-3">
      <label className="form-label text-body-secondary">
        Event image :
      </label>
      <Field>
        {() => {
          return (
            <>
              <div
                className="eventImage rounded p-5 d-flex flex-column align-items-center"
                onDrop={dropHandler}
                onDragOver={dragHandler}
              >
                <input
                  type="file"
                  ref={inputRef}
                  hidden
                  onChange={imageHandler}
                />
                {eventImage === null ? (
                  // Area for select image
                  <div className="eventImageContent">
                    <p className="m-0 text-center text-body-secondary text-capitalize fw-medium">
                      Drag and drop to upload
                    </p>
                    <p className="m-0 text-center text-secondary">or</p>
                    <p
                      className="mb-0 text-center text-body-secondary text-capitalize"
                      style={{ fontSize: '14px', marginTop: '-5px' }}
                    >
                      Click to upload
                    </p>
                  </div>
                ) : (
                  <>
                    {
                      // Area for after select image
                      uploadProgress == 100 &&
                      <div className="uploadeventImage position-relative d-flex flex-wrap rounded p-2 shadow">
                        <XCircle
                          className="position-absolute close"
                          size="22px"
                          color="#FFDC60"
                          onClick={removeeventImageHandler}
                        />
                        {eventImage &&
                          <img
                            src={URL.createObjectURL(eventImage)}
                            alt=""
                            className="rounded object-fit-cover m-2"
                          />
                        }
                      </div>
                    }
                  </>
                )}

                <button
                  type="button"
                  className="btn btn-secondary text-capitalize fw-semibold mt-4"
                  onClick={() => inputRef.current?.click()}
                >
                  <Upload size="16px" className="me-2" />
                  Upload event image
                </button>
              </div>
              {
                // Upload image progress bar
                (uploadProgress != null && uploadProgress < 100) &&
                <div className="progress mt-2">
                  <div className="progress-bar bg-secondary text-dark" role="progressbar" style={{ width: `${uploadProgress}%` }}>{uploadProgress}%</div>
                </div>
              }
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default FileInputs;
