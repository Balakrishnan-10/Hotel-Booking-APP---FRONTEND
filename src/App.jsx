import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Hotels from "./Pages/Hotels";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Header from "./Components/Header";
import Footercom from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute";
import Bookings from "./Pages/Bookings";
import UpdateHotel from "./Pages/UpdateHotel";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import ForgotPassword from "./Pages/ForgotPassword";
import PageNotFound from "./Pages/PageNotFound";
import ResetPassword from "./Pages/ResetPassword";
import CreateBooking from "./Pages/CreateBooking";
import UserHome from "./Pages/UserHome";
import ScrollToTop from "./Components/ScrollToTop";
import StartingPage from "./Pages/StartingPage";
import HotelPage from "./Pages/HotelPage";
import { HotelContext } from "./Context/SearchContext";
import CompareHotels from "./Pages/CompareHotels";

const App = () => {
  const [hotelId, setHotelId] = useState(0);
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Use Effect Hook :
  useEffect(() => {
    fetchHotels();
  }, [searchQuery]);

  const fetchHotels = async () => {
    try {
      const response = await fetch(`https://hotel-booking-app-backend-yjvv.onrender.com/api/hotel/all-hotels?search=${searchQuery}`);
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HotelContext.Provider value={{ hotels, searchQuery, setSearchQuery, fetchHotels }}>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<StartingPage />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/hotelpage/:id" element={<HotelPage />} />
          <Route path="/compareHotels" element={<CompareHotels />} />

          {/* User Private Routes : */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/create-booking/:id" element={<CreateBooking />} />
          </Route>

          {/* Admin Private Route : */}
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/admin" element={<Home />} />
            <Route path="/hotels" element={<Hotels setHotelId={setHotelId} />} />
            <Route path="/edit/:id" element={<UpdateHotel hotelId={hotelId} />} />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footercom />
      </HotelContext.Provider>
    </BrowserRouter>
  );
};

export default App;
