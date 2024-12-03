import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiInformationCircle } from "react-icons/hi";
import {
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  SignOutSuccess,
  UpdateFail,
  UpdateStart,
  UpdateSuccess,
} from "../Redux/Slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardProfile = () => {
  const { CurrentUser, Loading, Error } = useSelector((state) => state.Users);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploaderror, setImageUploadError] = useState(null);
  const filePickerRef = useRef();
  const navigate = useNavigate();

  // User Profile Update States :
  const Dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [imageUploading, SetImageUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  // User Profile delete States :
  const [showModal, setShowModal] = useState(false);

  // HandleImageChange function for image uploading :
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  // Uploading Process UseEffect hook:
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // Upload and storage the image to Firebase :
  const uploadImage = async () => {
    // Image Storage method :
    SetImageUploading(true);
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);

    // Image Upload method :
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0)); // toFixed method is used to round the value
      },
      (error) => {
        setImageUploadError(
          "Could not Upload the image (File Size must be less than 2mb)"
        );
        setImageURL(null);
        setImageUploadProgress(null);
        setImageFile(null);
        SetImageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          SetImageUploading(false);
        });
      }
    );
  };

  // HandleChange function for input fields :
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // User details Updated function :
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No Changes made");
      return;
    }
    if (imageUploading) {
      setUpdateUserError("Please wait while the image is Uploading");
      return;
    }
    try {
      Dispatch(UpdateStart());
      const res = await fetch(
        `https://hotel-booking-app-backend-yjvv.onrender.com/api/user/update/${CurrentUser.Result._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        Dispatch(UpdateFail(data.message));
        setUpdateUserError(data.message);
        toast.error(data.message);
      } else {
        Dispatch(UpdateSuccess(data));
        setUpdateUserSuccess("User Profile Updates Successfully");
      }
    } catch (error) {
      Dispatch(UpdateFail(error.message));
      setUpdateUserError(error.message);
      toast.error(error.message);
    }
  };

  // User Sign Out function :
  const handleSignOut = () => {
    Dispatch(SignOutSuccess());
    localStorage.removeItem("Token");
    toast.success("You have been successfully logged out");
    navigate("/signin");
  };

  // User Account handleDelete function :
  const handleDelete = async () => {
    setShowModal(false);
    try {
      Dispatch(deleteUserStart());
      const response = await fetch(
        `https://hotel-booking-app-backend-yjvv.onrender.com/api/user/delete/${CurrentUser.Result._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        Dispatch(deleteUserFail(data.message));
        toast.error(data.message);
      } else {
        Dispatch(deleteUserSuccess(data));
        toast.dark(data.message);
      }
    } catch (error) {
      Dispatch(deleteUserFail(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-lg my-10 rounded mx-auto p-4 w-full border border-lime-500 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 ">
      <h1 className="my-7 text-center font-semibold text-lime-500 text-3xl">
        Profile
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          ref={filePickerRef}
          onChange={handleImageChange}
          hidden
        />

        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden
        rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,150,180),${imageUploadProgress / 100}`,
                },
              }}
            />
          )}

          <img
            src={imageURL || CurrentUser.Result.profilePicture}
            alt="User Image"
            className={`rounded-full w-full h-full object-cover border-[#8deb81] border-8
            ${imageUploadProgress && imageUploadProgress < 100 && "opacity-60"
              }`}
          />
        </div>
        {imageUploaderror && (
          <Alert
            className="mt-2"
            color="failure"
            withBorderAccent
            icon={HiInformationCircle}
          >
            <span className="font-medium">OOPS! </span> {imageUploaderror}
          </Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="User Name"
          defaultValue={CurrentUser.Result.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="name@gmail.com"
          defaultValue={CurrentUser.Result.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="********"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientMonochrome="success"
          disabled={Loading || imageUploading}
        >
          {Loading ? "Loading..." : "Update"}
        </Button>
      </form>
      <div className="flex justify-between mt-10">
        <span
          className="cursor-pointer text-red-600"
          onClick={() => setShowModal(true)}
        >
          Delete Account
        </span>
        <span className="cursor-pointer text-blue-600" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert
          className="mt-2"
          color="success"
          withBorderAccent
          icon={HiInformationCircle}
        >
          <span className="font-medium"> Yaa! </span> {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert
          className="mt-2"
          color="failure"
          withBorderAccent
          icon={HiInformationCircle}
        >
          <span className="font-medium"> OOPS! </span> {updateUserError}
        </Alert>
      )}
      {Error && (
        <Alert
          className="mt-2"
          color="failure"
          withBorderAccent
          icon={HiInformationCircle}
        >
          <span className="font-medium"> OOPS! </span> {Error}
        </Alert>
      )}
      {
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-500 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">
                Are you sure you want to delete this Account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button gradientMonochrome="failure" onClick={handleDelete}>
                  Yes, I'm sure
                </Button>
                <Button
                  gradientMonochrome="info"
                  onClick={() => setShowModal(false)}
                >
                  No, Changed My mind
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
    </div>
  );
};

export default DashboardProfile;
