import React, { useState, useEffect } from "react";
import OverviewSuperAdminCards from "./OverviewSuperAdminCards";
import { useTheme } from "../../../utils/useTheme.jsx";
import "../Admindashboard/new.css";

const OverviewSuperAdmin = () => {
  const { theme } = useTheme();
  const [recentComplaints, setRecentComplaints] = useState([]);

  const getRecentComplaints = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/getRecentComplaints`,
        {
          method: "GET",
          credentials: "include",
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
      <div className="">
        <OverviewSuperAdminCards />
      </div>
      <div className={`mainBack mt-4 rounded-4 ${theme === "dark" ? "" : "bg-secondary bg-opacity-10"}`} style={{ backgroundColor: "var(--bg-glass)", color: "var(--text-primary)", border: "1px solid var(--light-hover)" }}>
        <div className="p-3 opacity-75">
            <p className="m-0 fw-semibold">Reported Complaints:</p>
            <p className="m-0 text-truncate">Complaints which are reported by Admin User, and u can view them in the Reported Complaints section.</p>
        </div>
      </div>
      <div className={`mainBack mt-4 rounded-4 ${theme === "dark" ? "" : "bg-secondary bg-opacity-10"}`} style={{ backgroundColor: "var(--bg-glass)", color: "var(--text-primary)", border: "1px solid var(--light-hover)" }}>
        <div className="p-3 opacity-75">
            <p className="m-0 fw-semibold">Unresolved Complaints:</p>
            <p className="m-0 text-truncate">Complaints which are not resolved under one week and need to be resolved, and u can view them in the Unresolved Complaints section.</p>
        </div>
      </div>
    </section>
  );
};

export default OverviewSuperAdmin;
