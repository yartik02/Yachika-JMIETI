import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomeStudent.css";
import dashImg from "../../assets/newImgForStudDash.png";
import OverviewCards from "./OverviewCards";
import ComplaintCard from "../../pages/dashboard/Admindashboard/ComplaintCard.jsx";


const HomeStudent = ({ student , studentComplaints, viewMyComplaintSection}) => {
  const bannerRef = useRef(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const handleMouseMove = (e) => {
      const { left, top } = banner.getBoundingClientRect();
      banner.style.setProperty("--mouse-x", `${e.clientX - left}px`);
      banner.style.setProperty("--mouse-y", `${e.clientY - top}px`);
    };

    banner.addEventListener("mousemove", handleMouseMove);

    return () => {
      banner.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
// Get the three most recent complaints
const recentComplaints = [...studentComplaints]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 3);
  
  return (
    <section>
      <div className="luminous-banner-wrapper rounded-4 border-5" style={{width:"100%"}}>
        <div className="luminous-banner row rounded-4 text-center p-lg-5 p-md-5 p-sm-0 mx-auto" style={{width: "100%"}} ref={bannerRef}>
          <div className="banner-content col-12 order-sm-2 mb-3 order-lg-1 col-lg-6 text-lg-start text-sm-center">
            <h2 className="banner-title text-capitalize mb-3">Welcome back, {student.name}!</h2>
            <p className="banner-subtitle mx-0 text-lg-start text-sm-center">
              Your voice is essential. Let's work together to improve your
              campus experience.
            </p>
            <Link to="/complaintSubmission" className="banner-button p-2 px-3 rounded-3">
              <span className="d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={20} className="me-1">
                <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                </svg>
                Submit New Complaint</span>
            </Link>
          </div>
          <div className="floating-shape shape1 rounded-circle"></div>
          <div className="floating-shape shape2 rounded-circle"></div>
          <div className="col-12 col-lg-6 d-flex order-sm-1 order-lg-2 mb-sm-3 justify-content-center align-items-center">
            <img src={dashImg} width={265} className="dashImg" alt="Dashboard Image" />
          </div>
        </div>
      </div>

        <OverviewCards studentComplaints={studentComplaints} />

        <section className="recentComplaints border my-3 shadow-sm rounded-4" style={{backgroundColor:"#f2f5fe"}}>
          <div className="main m-3">
            <div className="recentHead d-flex align-items-center fs-6"  style={{fontWeight:500}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text me-2" viewBox="0 0 16 16">
                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
              </svg>
              Recent Complaints
            </div>
            <p className="text-muted text-start mt-2" style={{fontSize:"0.8rem"}}>Your latest submissions and their status</p>


            <div className="complaintSection d-flex flex-column justify-content-center" style={{ minHeight:"250px"}}>
              {
                studentComplaints.length === 0 ? (<div className=" d-flex flex-column align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-chat-left-dots mb-2 text-muted" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                  <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                <p className="text-muted" style={{fontSize:"0.8rem"}}>You haven't submitted any complaints yet. </p>
                <Link className="newComp p-2 px-3 rounded-3" to="/complaintSubmission" style={{fontSize:"0.8rem", textDecoration:"none"}}> + Submit your first complaint</Link>
              </div>) : (
                <div className="complaints">
                  {recentComplaints.map((complaint, index) => (
                    <div key={index} className="mb-2" style={{width:"100%"}}>
                      <ComplaintCard complaint={complaint} viewMyComplaintSection={viewMyComplaintSection}/>
                    </div>

                  ))}
                  
                </div>
              )
              }
              {studentComplaints.length === 0 ? "" : 
              <p className="m-0 mt-auto mb-0 text-muted opacity-75" style={{fontSize:"0.8rem"}}>
                To view your all complaints please visit the <strong>My Complaints</strong> tab.
              </p>
              }
              
            </div>
        </div>
        </section>
    </section>
  );
};

export default HomeStudent;
