import React,{ useState} from 'react';
import './CompliantSorting.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from "../../src/store/auth";


function ComplaintDetails({ complaint }) {
    const { token, refetchComplaints } = useAuth();
    const [reasonModalShow, setReasonModalShow] = useState(false);
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    let currComplaint;

    if (!complaint) {
        return (
            <p className="p-5 d-flex text-muted clickedComp rounded-4 flex-column align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="gray" className="bi bi-chat-left-text mb-2" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                </svg>
                Select a complaint to view details
            </p>
        );
    }

    const statusClass = `status-${(complaint.status || "").toLowerCase()}`;
    const priorityClass = `priority-${(complaint.priority || "").toLowerCase()}`;

    const editStatus = async ( currStatus, newStatus, id ) => {
        
        await refetchComplaints();
        // check if the current status if Resolved?
        console.log(currStatus,"new",newStatus);
        
        if(currStatus==="Resolved"){
            toast.error("This complaint has already been resolved!");
            return;
        }
        if(currStatus==="Rejected"){
            toast.error("This complaint has already been rejected!");
            return;
        }
        if(currStatus==="Progress" && newStatus==="Progress"){
            toast.error("This complaint is already in processing!");
            return;
        }
        if(currStatus==="Rejected" && newStatus==="Rejected"){
            toast.error("This complaint is already rejected!");
            return;
        }

        // console.log("button clicked with status:", newStatus, "and id:", id);
        //getting the current complaint by id
        try {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/admin/complaint/${id}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
                const data= await response.json();
                // currComplaint=data[0];
                
        } catch (error) {
            console.log(error.message);
        }

        // update the data in the current complaint
        try {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/admin/complaint/update/${id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
              },
            );
            const data= await response.json();
            if(response.ok){
                toast.success("Status updated successfully!");
                await refetchComplaints();
                currComplaint=data;
                // console.log(currComplaint);
            }else{
                toast.error("Error in updating status!");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Error in updating status!");
        }
    };

    const handleRejectComplaint = async(complaintId, reason) => {

        if(complaint.status==="Resolved"){
            setReasonModalShow(false);
            toast.error("This complaint has already been resolved!");
            return;
        }
        if(complaint.status==="Rejected"){
            setReasonModalShow(false);
            toast.error("This complaint has already been rejected!");
            return;
        }
        if (!reason) {
                toast.error("Please provide a rejection reason.");
                return;
            }        
        setIsSubmitting(true);
        try {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/admin/complaint/update/${complaintId}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  rating: 0,
                  feedback: reason,
                  status: "Rejected",
                }),
              },
            );

            if (response.ok) {
                toast.success("Complaint has been rejected with reason!");
                refetchComplaints();
                setReasonModalShow(false);
                setIsSubmitting(false);
                setReason("");
            } else {
                toast.error("Couldn't submit reason. Please try again.");
            }
        
        } catch (error) {
            console.error("Reason submission error:", error);
            toast.error("Couldn't connect to the server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="clickedComp rounded-4">
            <div className="text-start p-4 rounded-4 my-auto">
                <p className='mb-2 fs-5 fw-light' style={{ fontSize: "1.1rem" }}>{complaint.complaintTitle}</p>
                <div className="d-flex gap-4 mb-2">
                    <div className={`d-flex align-items-center ${statusClass}`} style={{ fontSize: "0.8rem" }}>
                        <div className="status-dot me-2" style={{ width: "8px", height: "8px" }}></div>
                        <span>{currComplaint?currComplaint.status:complaint.status}</span>
                    </div>
                    <div className={`p-1 px-2 rounded-3 text-nowrap text-center ${priorityClass}`} style={{ fontSize: "0.7rem", width: "fit-content" }} >
                        {complaint.priority}
                    </div>
                </div>
                <p className='d-flex flex-column '>
                    <span className='fw-semibold'>Description</span>
                    <span style={{ fontSize: "0.9rem" }}> {complaint.complaintBody}</span></p>
                <p className='d-flex flex-column' style={{width:"fit-content"}}><span className='fw-semibold'>Category</span> {complaint.category} - {complaint.subCategory}</p>
                    
                    <div className="row mb-2 p-0">
                        <p className='col-4 d-flex m-0 flex-column'><span className='fw-semibold'>Name</span> {complaint.createdByName}</p>
                        <p className='col-8 d-flex m-0 flex-column'><span className='fw-semibold'>Roll No</span> {complaint.createdByRollno}</p>
                    </div>
                    <div className="row mb-2">
                        <p className='col-4 d-flex m-0 flex-column'><span className='fw-semibold'>Year</span> {complaint.createdByClass}</p>
                        <p className='col-8 d-flex m-0 flex-column'><span className='fw-semibold'>Branch</span> {complaint.createdByBranch}</p>
                    </div>
                    <div className="row mb-2">
                        {
                        complaint.isAnonymous?
                        <p className='col-4 m-0 d-flex flex-column'><span className='fw-semibold'>Anonymous</span> {complaint.isAnonymous ? "Yes" : "No"}</p>:""
                        }
                        <p className='col-8 m-0 d-flex flex-column'><span className='fw-semibold'>Created At</span> {
                            new Date(complaint.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })}
                        </p>
                    </div>
                    {
                        complaint.rating!==0 && complaint.feedback!==" " ?
                        <div className="row mb-2">
                            <p className='col-4 d-flex m-0 flex-column'><span className='fw-semibold'>rating</span> {complaint.rating}/5</p>
                            <p className='col-8 d-flex m-0 flex-column'><span className='fw-semibold'>Feedback</span> {complaint.feedback}</p>
                        </div>:null
                    }
                    <hr />
                    <div className="d-flex gap-2">
                        <button value='Progress' className='w-50 p-2 btn1 rounded-2' onClick={()=>editStatus(complaint.status,"Progress", complaint._id)}>Mark in Progress</button>
                        <button value='Resolved' className='w-50 p-2 btn2 rounded-2' onClick={()=>editStatus(complaint.status,"Resolved", complaint._id)}>Mark as Resolved</button>
                    </div>
                    <button value='Rejected' className='w-100 mt-2 p-2 btn3 rounded-2' onClick={()=>{setReasonModalShow(true)}}>Reject Complaint</button>
                    {
                        reasonModalShow && (
                          <>
                            <div className="modal-backdrop fade show"></div>
                            <div className="modal fade show" id="exampleModal"tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style={{ display: 'block' }}>
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Rejection Reason</h1>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setReasonModalShow(false)}></button>
                                  </div>
                                  <div className="modal-body">
                                    <textarea
                                      className="form-control border-0"
                                      id={`reason-${complaint._id}`}
                                      rows="3"
                                      value={reason}
                                      onChange={(e) => setReason(e.target.value)}
                                      placeholder="Tell us your rejection's reason..."
                                    ></textarea>
                                  </div>
                                  <div className="modal-footer">
                                    <button 
                                      type="button"
                                      className="btn btn-danger" 
                                      disabled={isSubmitting} 
                                      onClick={() => {
                                        handleRejectComplaint( complaint._id, reason);
                                      }}
                                    >
                                      {isSubmitting ? "Submitting..." : "Submit Reason"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                    }
                </div>
            </div>
    );
}

export default ComplaintDetails;