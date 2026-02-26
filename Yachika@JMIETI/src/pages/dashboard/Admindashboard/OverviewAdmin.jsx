import React, { useState, useEffect } from "react";
import OverviewAdmin from "./OverviewAdminCards";
import ComplaintCard from "./ComplaintCard";
import "./new.css";

const Overview = () => {
    const [recentComplaints, setRecentComplaints] = useState([]);
    const token = localStorage.getItem("authToken");

    const getRecentComplaints = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/getRecentComplaints", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setRecentComplaints(data.map((item, index) => ({ ...item, index })));
        } catch (error) {
            console.error("Error fetching recent complaints:", error);
        }
    };

    useEffect(() => { getRecentComplaints(); }, []);

    return (
        <section className="">
            {/* The OverviewAdmin cards can sit at the top, outside the main theme if desired */}
            <div className=""><OverviewAdmin /></div>
            <div className="mainBack border bg-white mt-4 rounded-4">
            <div className="garden-header text-start p-4 pb-0">
                <h2 className="fs-5 fw-normal my-auto ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text me-2" viewBox="0 0 16 16">
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                  </svg>
                  Recent Complaints</h2>
                <p className="text-muted fw-light mt-1 m-0" style={{ fontSize: "0.9rem" }}>Latest submissions requiring attention.</p>
            </div>
            
            {/* This SVG creates the beautiful wavy shape */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="m-0">
            <path fill="#090f3d" fillOpacity="1" d="M0,32L26.7,32C53.3,32,107,32,160,26.7C213.3,21,267,11,320,16C373.3,21,427,43,480,90.7C533.3,139,587,213,640,240C693.3,267,747,245,800,208C853.3,171,907,117,960,85.3C1013.3,53,1067,43,1120,69.3C1173.3,96,1227,160,1280,176C1333.3,192,1387,160,1413,144L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>
            </svg>

            <main className="garden-content m-0 pt-0 pb-4 px-1 px-lg-5" style={{ backgroundColor:"#090f3d", borderRadius:"0 0 20px 20px"}}>
                {recentComplaints.length > 0 ? (
                    <div className="d-flex flex-column mb-4 stones-grid mx-xs-2 mx-lg-0">
                        {recentComplaints.map((complaint) => (
                            <ComplaintCard key={complaint._id} complaint={complaint} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-garden d-flex flex-column justify-content-center align-items-center p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#a8a8a8ff" className="bi bi-chat-left-dots mb-3" viewBox="0 0 16 16">
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