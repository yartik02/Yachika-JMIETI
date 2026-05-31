import React, { useState, useEffect } from "react";
import OverviewAdmin from "./OverviewAdminCards";
import ComplaintCard from "./ComplaintCard";
import "./new.css";

const Overview = () => {
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

    useEffect(() => { getRecentComplaints(); }, []);

    return (
        <section className="">
            <div className=""><OverviewAdmin /></div>
            <div className="mainBack mt-4 rounded-4" style={{ backgroundColor: "var(--bg-main)",  }}>
            <div className="garden-header text-start p-4 pb-0">
                <h2 className="fs-5 fw-normal my-auto ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text me-2" viewBox="0 0 16 16">
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                  </svg>
                  Recent Complaints</h2>
                <p className="opacity-75 fw-light mt-1 m-0" style={{ fontSize: "0.9rem" }}>Latest submissions requiring attention.</p>
            </div>

            <main className="garden-content m-0 py-3 px-1 px-lg-4 mt-0" style={{ borderRadius:"0 0 20px 20px"}}>
                {recentComplaints.length > 0 ? (
                    <div className="d-flex flex-column mb-4 stones-grid mx-xs-2 mx-lg-0">
                        {recentComplaints.map((complaint) => (
                            <ComplaintCard key={complaint._id} complaint={complaint} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-garden d-flex flex-column justify-content-center align-items-center p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="var(--text-primary)" className="opacity-75 mb-3" viewBox="0 0 16 16">
                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                        </svg>
                        <p>A Moment of Peace</p>
                        <span>There are no recent complaints.</span>
                    </div>
                )}
            </main>
            </div>
        </section>
    );
};

export default Overview;