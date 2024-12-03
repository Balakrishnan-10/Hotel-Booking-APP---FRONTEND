import {
  Alert,
  Button,
  FileInput,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { PiListNumbersFill } from "react-icons/pi";
import { MdTitle } from "react-icons/md";
import { GiGymBag } from "react-icons/gi";
import { IoStar } from "react-icons/io5";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiInformationCircle } from "react-icons/hi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminCreateHotel = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploaderror, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  // Upload Image :
  const handleImageUpload = async () => {
    try {
      if (!file) {
        setImageUploadError("Please Select a Image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image Upload Failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image Upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  //create hotel details :
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://hotel-booking-app-backend-yjvv.onrender.com/api/hotel/create/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("Token"),
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        toast.error(data.message)
        return;
      } else {
        setPublishError(null);
        toast.dark(data.message)
        navigate("/");
      }
    } catch (error) {
      setPublishError("Something went Wrong!!!");
      toast.error(data.message)
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a Hotel
      </h1>
      <form
        className="flex flex-col gap-5 border-2 rounded-md border-lime-300 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Enter the Title..."
            icon={MdTitle}
            required
            name="title"
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextInput
            type="number"
            placeholder="Number Digits..."
            icon={PiListNumbersFill}
            required
            name="pricePerDay"
            id="pricePerDay"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, pricePerDay: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            icon={GiGymBag}
            placeholder="Amenities..."
            required
            id="amenities"
            name="amenities"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, amenities: e.target.value })
            }
          />
          <TextInput
            type="text"
            icon={IoStar}
            placeholder="Rating..."
            required
            id="rating"
            name="rating"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Location..."
            icon={FaLocationPin}
            required
            name="location"
            id="location"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
          <Select
            name="category"
            id="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="Uncategorized">Select Category</option>
            <option value="Luxury Hotel">Luxury Hotel</option>
            <option value="5 Star Hotel">5 Star Hotel</option>
            <option value="3 Star Hotel">3 Star Hotel</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-2 border-red-500 border-dotted p-3">
          <FileInput
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientMonochrome="lime"
            size="sm"
            onClick={handleImageUpload}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
          {imageUploaderror && (
            <Alert color="failure" icon={HiInformationCircle} className="mt-3">
              <span className="font-medium me-2">🥴OOPS!</span>
              {imageUploaderror}
            </Alert>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="Upload Image"
              className="w-full h-72 object-cover"
            />
          )}
        </div>

        <Textarea
          placeholder="Write Something....."
          required
          name="description"
          id="description"
          className="h-20 mb-5"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Button type="submit" gradientMonochrome="info">
          <FaPlus className="mt-1 me-2" /> Add Hotel
        </Button>
        {publishError && (
          <Alert color="failure" icon={HiInformationCircle} className="mt-3">
            <span className="font-medium me-2">🥴OOPS!</span>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default AdminCreateHotel;
