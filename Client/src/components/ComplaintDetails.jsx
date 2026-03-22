import React, { useState, useEffect } from "react";
import "./CompliantSorting.css";
import { toast } from "react-toastify";
import { useAuth } from "../../src/store/auth";

function ComplaintDetails({ complaint }) {
  const { token, refetchComplaintsAdmin } = useAuth();

  const [localStatus, setLocalStatus] = useState("");
  const [localIsForwarded, setLocalIsForwarded] = useState(false);
  const [reasonModalShow, setReasonModalShow] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (complaint) {
      setLocalStatus(complaint.status);
      setLocalIsForwarded(complaint.isForwarded || false);
    }
  }, [complaint]);

  if (!complaint) {
    return (
      <p className="p-5 d-flex text-muted clickedComp rounded-4 flex-column align-items-center justify-content-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          fill="gray"
          className="bi bi-chat-left-text mb-2"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
        </svg>
        Select a complaint to view details
      </p>
    );
  }

  // Derived variables for cleaner logic
  const isResolvedOrRejected = localStatus === "Resolved" || localStatus === "Rejected";
  const isActionDisabled = isSubmitting || isResolvedOrRejected;
  const statusClass = `status-${(localStatus || "").toLowerCase()}`;
  const priorityClass = `priority-${(complaint.priority || "").toLowerCase()}`;

  // Helper to cleanly reset modal state
  const handleCloseModal = () => {
    setReasonModalShow(false);
    setReason("");
  };

  const updateStatus = async (newStatus, additionalData = {}) => {
    if (isSubmitting) return;
    if (localStatus === "Resolved") return toast.error("Already resolved!");
    if (localStatus === "Rejected") return toast.error("Already rejected!");
    if (localStatus === newStatus) return toast.error(`Already in ${newStatus}!`);

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/complaint/update/${complaint._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus, ...additionalData }),
        }
      );

      if (response.ok) {
        setLocalStatus(newStatus);
        toast.success(`Status updated to ${newStatus}`);
        await refetchComplaintsAdmin();
        handleCloseModal();
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForward = async () => {
    if (isSubmitting || localIsForwarded) return;
    if (!window.confirm("Are you sure you want to escalate this complaint to the Super Admin?")) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/complaint/${complaint._id}/escalate`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setLocalIsForwarded(true);
        toast.warning("Complaint escalated to Super Admin.");
        await refetchComplaintsAdmin();
      } else {
        toast.error("Failed to escalate complaint.");
      }
    } catch (error) {
      console.error("Escalation error:", error);
      toast.error("Network error while escalating.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="clickedComp rounded-4 overflow-hidden">
      <div
        className="text-start p-4 detailedComplain my-auto"
        style={{ maxHeight: "77vh", overflowY:"scroll" }}
      >
        <p className="mb-2 fs-5 fw-light" style={{ fontSize: "1.1rem" }}>
          {complaint.complaintTitle}
        </p>
        
        <div className="d-flex gap-4 mb-2">
          <div className={`d-flex align-items-center ${statusClass}`} style={{ fontSize: "0.8rem" }}>
            <div className="status-dot me-2" style={{ width: "8px", height: "8px" }}></div>
            <span>{localStatus}</span>
          </div>
          <div className={`p-1 px-2 rounded-3 text-nowrap text-center ${priorityClass}`} style={{ fontSize: "0.7rem", width: "fit-content" }}>
            {complaint.priority}
          </div>
        </div>

        <p className="d-flex flex-column mt-3">
          <span className="fw-semibold">Description</span>
          <span style={{ fontSize: "0.9rem" }}>{complaint.complaintBody}</span>
        </p>

        <p className="d-flex flex-column" style={{ width: "fit-content" }}>
          <span className="fw-semibold">Category</span>
          {complaint.category} - {complaint.subCategory}
        </p>

        <div className="row mb-2 p-0">
          <p className="col-4 d-flex m-0 flex-column">
            <span className="fw-semibold">Name</span> {complaint.createdByName}
          </p>
          <p className="col-8 d-flex m-0 flex-column">
            <span className="fw-semibold">Roll No</span> {complaint.createdByRollno}
          </p>
        </div>

        <div className="row mb-2">
          <p className="col-4 d-flex m-0 flex-column">
            <span className="fw-semibold">Year</span> {complaint.createdByClass}
          </p>
          <p className="col-8 d-flex m-0 flex-column">
            <span className="fw-semibold">Branch</span> {complaint.createdByBranch}
          </p>
        </div>

        <div className="row mb-2">
          {complaint.isAnonymous && (
            <p className="col-4 m-0 d-flex flex-column">
              <span className="fw-semibold">Anonymous</span> Yes
            </p>
          )}
          <p className="col-8 m-0 d-flex flex-column">
            <span className="fw-semibold">Created At</span>{" "}
            {new Date(complaint.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* FEEDBACK BLOCK */}
        {localStatus === "Resolved" && (complaint.rating !== 0 || (complaint.feedback && complaint.feedback.trim() !== "")) && (
          <div className="row mb-2 mt-2 p-2 bg-light rounded-3">
            {complaint.rating !== 0 && (
              <p className="col-4 d-flex m-0 flex-column">
                <span className="fw-semibold">Rating</span> {complaint.rating}/5
              </p>
            )}
            {complaint.feedback && complaint.feedback.trim() !== "" && (
              <p className="col-8 d-flex m-0 flex-column">
                <span className="fw-semibold">Feedback</span> {complaint.feedback}
              </p>
            )}
          </div>
        )}

        {/* REJECTED BLOCK */}
        {localStatus === "Rejected" && complaint.rating === 0 && complaint.feedback && complaint.feedback.trim() !== "" && (
          <div className="row mb-2 mt-2 p-2 bg-danger bg-opacity-10 border border-danger rounded-3">
            <p className="col-12 d-flex m-0 flex-column text-danger">
              <span className="fw-semibold">Reason for Rejection</span> {complaint.feedback}
            </p>
          </div>
        )}

        {/* FORWARD COMPLAINT BUTTON (Only shows if not resolved/rejected) */}
        {!isResolvedOrRejected && (
          <div className="d-flex justify-content-end mb-2 mt-3">
            <button
              className="btnForward rounded-2 btn-sm px-2 py-1 d-flex align-items-center "
              onClick={handleForward}
              disabled={isActionDisabled || localIsForwarded}
              style={{ fontSize: "0.75rem" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle me-2" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>
              {localIsForwarded ? "Reported to Super Admin" : "Report to Super Admin"}
            </button>
          </div>
        )}

        <hr />

        <div className="d-flex gap-2">
          <button
            className="w-50 p-2 btn1 rounded-2"
            disabled={isActionDisabled}
            onClick={() => updateStatus("Progress")}
          >
            Mark in Progress
          </button>
          <button
            className="w-50 p-2 btn2 rounded-2"
            disabled={isActionDisabled}
            onClick={() => updateStatus("Resolved")}
          >
            Mark as Resolved
          </button>
        </div>
        <button
          className="w-100 mt-2 p-2 btn3 rounded-2"
          disabled={isActionDisabled}
          onClick={() => setReasonModalShow(true)}
        >
          Reject Complaint
        </button>

        {/* MODAL */}
        {reasonModalShow && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Rejection Reason</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <textarea
                      className="form-control"
                      rows="3"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Why is this being rejected?"
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-danger"
                      disabled={isSubmitting || !reason.trim()}
                      onClick={() => updateStatus("Rejected", { feedback: reason, rating: 0 })}
                    >
                      {isSubmitting ? "Processing..." : "Confirm Rejection"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ComplaintDetails;