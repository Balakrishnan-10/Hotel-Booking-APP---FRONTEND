import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { SignOutSuccess } from "../Redux/Slice/UserSlice";
import { FaBuildingUser, FaHotel } from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardSidebar = () => {
  const { CurrentUser } = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    // Search the Location :
    const urlSearch = new URLSearchParams(location.search);
    // Find the Current tab URL :
    const tabUrl = urlSearch.get("tab"); // tab = profile
    if (tabUrl) {
      setTab(tabUrl); //the tab is set in profileTab
    }
  }, [location.search]);

  // User Sign Out function :
  const handleSignOut = () => {
    dispatch(SignOutSuccess());
    localStorage.removeItem("Token");
    toast.success("You have Sign Out Successfully")
    navigate("/signin");
  };

  return (
    <Sidebar className="w-full md:w-58">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-3">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              icon={HiUser}
              active={tab === "profile"}
              label={CurrentUser.Result.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
              className="hover:bg-lime-300 dark:hover:bg-lime-300 dark:hover:text-black"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {CurrentUser.Result.isAdmin && (
            <Link to="/dashboard?tab=createhotel">
              {" "}
              <Sidebar.Item
                icon={FaHotel}
                active={tab === "createhotel"}
                labelColor="dark"
                as="div"
                className="hover:bg-lime-300 dark:hover:bg-lime-300 dark:hover:text-black"
              >
                Add Hotels
              </Sidebar.Item>
            </Link>
          )}
           {CurrentUser.Result.isAdmin && (
            <Link to="/dashboard?tab=userdetails">
              {" "}
              <Sidebar.Item
                icon={FaBuildingUser}
                active={tab === "userdetails"}
                labelColor="dark"
                as="div"
                className="hover:bg-lime-300 dark:hover:bg-lime-300 dark:hover:text-black"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer hover:bg-lime-300 dark:hover:bg-lime-300 dark:hover:text-black"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
