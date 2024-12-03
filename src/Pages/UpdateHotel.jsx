import React, { useEffect, useState } from "react";
import {
  Button,
  FileInput,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import { FaLocationPin } from "react-icons/fa6";
import { PiListNumbersFill } from "react-icons/pi";
import { MdTitle } from "react-icons/md";
import { GiGymBag } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateHotel = ({ hotelId }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [editHotelError, setEditHotelError] = useState(null);


  useEffect(() => {

    fetchHotelData();

  }, [hotelId]);

  const fetchHotelData = async (id) => {
    await axios.get(`https://hotel-booking-app-backend-yjvv.onrender.com/api/hotel/single/${id}`)
      .then((res) => setFormData(console.log(res.data)))
      .catch((error) => console.log(error));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hotelId) {
      toast.error("Tour ID not found");
      return;
    }
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No Changes made");
      return;
    }
    try {
      const res = await fetch(
        `https://hotel-booking-app-backend-yjvv.onrender.com/api/hotel/edit/${hotelId}`,
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
        setEditHotelError(data.message)
        toast.error(data.message);
        return;
      } else {
        setEditHotelError(null);
        toast.success(data.message)
        navigate("/hotels")
      }
    } catch (error) {
      setEditHotelError(error.message);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    //console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    //console.log(formData)
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update a Hotel
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
            onChange={handleChange}
          />
          <TextInput
            type="number"
            placeholder="Number Digits..."
            icon={PiListNumbersFill}
            required
            name="pricePerDay"
            id="pricePerDay"
            className="flex-1"
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <TextInput
            type="text"
            icon={FaLocationPin}
            placeholder="location..."
            required
            id="location"
            name="location"
            className="flex-1"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Select
            id="category"
            name="category"
            onChange={handleChange}
          >
            <option value="Uncategorized">Select Category</option>
            <option value="Luxury Hotel">Luxury Hotel</option>
            <option value="5 Star Hotel">5 Star Hotel</option>
            <option value="3 Star Hotel">3 Star Hotel</option>
          </Select>
        </div>
        <Textarea
          placeholder="Write Something....."
          required
          id="description"
          name="description"
          className="h-20 mb-5"
          onChange={handleChange}
        />
        <Button type="submit" gradientMonochrome="success">
          <RxUpdate className="mt-1 me-2" /> Update Hotel
        </Button>
      </form>
    </div>
  );
};

export default UpdateHotel;
