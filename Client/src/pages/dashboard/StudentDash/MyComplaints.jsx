import React, { useMemo } from "react";
import MyComplaintCard from "./MyComplaintCard";
import { Link, useNavigate } from "react-router-dom";

const MyComplaints = ({studentComplaints}) => {
    const navigate = useNavigate();

    const sortedComplaints = useMemo(() => {
        return [...studentComplaints].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }, [studentComplaints]);
    return (
    <section className="m-0 py-0">
        <div className="head d-flex justify-content-between align-items-center mx-2">
        <h6 className="fw-normal text-start px-2 my-auto ">
            Mycomplaints ({studentComplaints.length})
        </h6>
            <Link to="/complaintSubmission" className="text-decoration-none">
                <p className="px-3 py-1 rounded-3 my-auto myCompBtn d-flex align-items-center">
                    <span className="me-1" style={{fontSize:"1.1rem"}}>+</span> New Complaint
                </p>
            </Link>
        </div>
        <div className="ComplaintCard rounded-4 py-4 pb-3 p-3 my-3" style={{backgroundColor:"#f2f5feba"}}>
            {studentComplaints.length > 0 ?(
            sortedComplaints.map((complaint) => (
                    <MyComplaintCard complaint={complaint}  key={complaint._id}/>
                ))):
                <div className="noComplaints p-5 d-flex flex-column align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#a5a5a5ff" className="bi bi-chat-square-text" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                      <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    <p className="text-center fw-light my-2" style={{color:"#585858ff"}}>You haven't submitted any complaints yet.</p>
                        <button className="px-3 py-2 rounded-3 firstCompBtn d-flex align-items-center mx-auto mt-3" onClick={() => navigate("/complaintSubmission")} style={{width:"fit-content", fontSize:"0.9rem"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-lg me-1" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                            </svg>
                             Submit Your First Complaint
                        </button>
                </div>
            }
            {studentComplaints.length === 0 ? "" : 
              <p className="m-0 mt-auto mb-0 text-muted opacity-75 text-center" style={{fontSize:"0.8rem"}}>
                You won't be able to<strong> find and track</strong> your anonymous complaints!
              </p>
            }
        </div>
    </section>
    );
};

export default MyComplaints;