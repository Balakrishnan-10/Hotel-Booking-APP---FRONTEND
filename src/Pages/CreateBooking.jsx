import { Button, Label, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { FaRegAddressCard, FaUser } from 'react-icons/fa';
import { FaBuildingUser } from 'react-icons/fa6';
import { GoNumber } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import { GiModernCity } from "react-icons/gi";
import { TfiWorld } from 'react-icons/tfi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const CreateBooking = () => {
  const { CurrentUser } = useSelector((state) => state.Users);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    user: CurrentUser.Result._id,
    hotel: id,
    age:"",
    address:"",
    zipcode : "", 
    city : "", 
    state : "",
    country : "",
    phone : "",
    checkindate : "",
    checkoutdate : "",
    totalmembers : "",
    roomType : ""
  });
  const navigate = useNavigate();

   // HandleChange function for input fields :
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://hotel-booking-app-backend-yjvv.onrender.com/api/booking/new", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("Token"),
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message)
        return;
      } else {
        toast.dark(data.message)
        navigate("/bookings");
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
  };
  return (
    <div className="p-3 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        User Information
      </h1>
      <form
        className="flex flex-col gap-5 border-2 rounded-md border-lime-300 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 p-8"
        onSubmit={handleSubmit}
      >

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="First Name"
            defaultValue={CurrentUser.Result.username}
            icon={FaUser}
            required
            id="firstname"
            className="flex-1"
          />
          {/* <TextInput
            type="text"
            placeholder="Last Name"
            icon={FaUser}
            required
            name="lastname"
            id="lastname"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
          /> */}
          {/* <TextInput
                        type="text"
                        placeholder="name@gmail.com"
                        icon={CiMail}
                        required
                        name="email"
                        id="email"
                        className="flex-1"
                        defaultValue={CurrentUser.Result.email}
                        onChange={handleChange}
                    /> */}

        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="number"
            placeholder="Age"
            icon={GoNumber}
            required
            name="age"
            id="age"
            className="flex-1"
            onChange={handleChange}
          />
          <TextInput
            type="text"
            placeholder="Address"
            icon={FaRegAddressCard}
            required
            name="address"
            id="address"
            className="flex-1"
            onChange={handleChange}
          />
          <TextInput
            type="number"
            placeholder="Zip Code"
            icon={GoNumber}
            required
            name="zipcode"
            id="zipcode"
            className="flex-1"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="city"
            icon={GiModernCity}
            required
            name="city"
            id="city"
            className="flex-1"
            onChange={handleChange}
          />
          <TextInput
            type="text"
            placeholder="State"
            required
            name="state"
            id="state"
            className="flex-1"
            onChange={handleChange}
          />
          <TextInput
            type="text"
            placeholder="Country"
            icon={TfiWorld}
            required
            name="country"
            id="country"
            className="flex-1"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div className='flex-1'>
            <Label className="font-semibold text-md" value="Phone" />
            <TextInput
              type="text"
              placeholder='+91**********'
              required
              id="phone"
              className="flex-1"
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div className='flex-1'>
            <Label className="font-semibold text-md" value="Check-In" />
            <TextInput
              type="date"
              required
              id="checkindate"
              className="flex-1"
              onChange={handleChange}
            />
          </div>
          <div className='flex-1'>
            <Label className="font-semibold text-md" value="Check-Out" />
            <TextInput
              type="date"
              required
              id="checkoutdate"
              className="flex-1"
              onChange={handleChange}
            />
          </div>
          <div className='flex-1'>
            <Label className="font-semibold text-md" value="Total Members" />
            <TextInput
              type="text"
              icon={FaBuildingUser}
              placeholder="Total Members"
              required
              id="totalmembers"
              className="flex-1"
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">

          <div className='flex-1'>
            <Label className="font-semibold text-md" value="Room Type" />

            <Select
              id="roomType"
              onChange={handleChange}
            >
              <option value="Uncategorized">Select Category</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Classic Room">Classic Room</option>
              <option value="AC Room">Ac Room</option>
              <option value="Non/Ac Room">Non/Ac Room</option>
            </Select></div>

        </div>
        <Button className="mx-auto w-36" type="submit" gradientMonochrome="info">
          Proceed
        </Button>
      </form>
    </div>
  );
};

export default CreateBooking;