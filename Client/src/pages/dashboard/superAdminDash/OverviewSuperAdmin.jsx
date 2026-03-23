import React, { useState, useEffect } from "react";
import OverviewSuperAdminCards from "./OverviewSuperAdminCards";
import "../Admindashboard/new.css";

const OverviewSuperAdmin = () => {
  const [recentComplaints, setRecentComplaints] = useState([]);
  const token = localStorage.getItem("authToken");

  const getRecentComplaints = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/getRecentComplaints`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setRecentComplaints(data.map((item, index) => ({ ...item, index })));
    } catch (error) {
      console.error("Error fetching recent complaints:", error);
    }
  };

  useEffect(() => {
    getRecentComplaints();
  }, []);

  return (
    <section className="">
      {/* The OverviewAdmin cards can sit at the top, outside the main theme if desired */}
      <div className="">
        <OverviewSuperAdminCards />
      </div>
      <div className="mainBack border bg-white mt-4 rounded-4">
        <div className="p-3">
            <p className="m-0 fw-semibold">Reported Complaints:</p>
            <p className="m-0 text-truncate">Complaints which are reported by Admin User, and u can view them in the Reported Complaints section.</p>
        </div>
      </div>
      <div className="mainBack border bg-white mt-4 rounded-4">
        <div className="p-3">
            <p className="m-0 fw-semibold">Unresolved Complaints:</p>
            <p className="m-0 text-truncate">Complaints which are not resolved under one week and need to be resolved, and u can view them in the Unresolved Complaints section.</p>
        </div>
      </div>
    </section>
  );
};

export default OverviewSuperAdmin;
