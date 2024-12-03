import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardProfile from "../Components/DashboardProfile";
import DashboardSidebar from "../Components/DashboardSidebar";
import AdminCreateHotel from "../Components/AdminCreateHotel";
import UserTable from "../Components/UserTable";

const Dashboard = () => {
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
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-58">
        <DashboardSidebar />
      </div>
      {tab === "profile" && <DashboardProfile />}
      {tab === "createhotel" && <AdminCreateHotel />}
      {tab === "userdetails" && <UserTable />}
    </div>
  );
};

export default Dashboard;
