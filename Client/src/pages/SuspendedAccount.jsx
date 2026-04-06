import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SuspendedAcc.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

// Helper function to format date specifically to Indian Standard Time (IST)
const formatExpiryDate = (isoString) => {
  if (!isoString) return "Indefinite / Not Specified";

  const date = new Date(isoString);

  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const formattedDate = date.toLocaleDateString("en-IN", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-IN", timeOptions);

  return `${formattedDate} at ${formattedTime} IST`;
};

const SuspendedPage = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appealText, setAppealText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track local appeal state so UI updates immediately without refreshing
  const [hasAppealedLocal, setHasAppealedLocal] = useState(
    user?.suspensionDetails?.appeal?.hasAppealed || false
  );
  
  // Track the actual status to display (None, Pending, Rejected)
  const [localAppealStatus, setLocalAppealStatus] = useState(
    user?.suspensionDetails.appeal.status || "None"
  );

  // Fallback values
  const backendMessage = "Your account access has been restricted by the administration. Remember you can only appeal once.";
  const suspensionReason = user?.suspensionDetails?.reason || "Violation of platform guidelines or pending administrative review.";
  const expiryDate = user?.suspensionDetails?.expiresAt;
  const adminRemarks = user?.suspensionDetails?.appeal?.adminRemarks;

  const handleSubmitAppeal = async (e) => {
    e.preventDefault();

    if (!appealText.trim()) {
      toast.error("Please provide an explanation for your appeal.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/submitAppeal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ appealText }),
        },
      );

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        toast.success(
          "Appeal submitted successfully. Please wait for admin review.",
        );
        setHasAppealedLocal(true);
        setLocalAppealStatus("Pending"); // Update UI to "Pending"
        setIsModalOpen(false); // Close modal
      } else {
        toast.error(data.message || "Failed to submit appeal.");
      }
    } catch (error) {
      console.error("Appeal error:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="suspension-bg min-vh-100 d-flex justify-content-center align-items-center px-3 py-4">
        <div
          className="shadow-lg bg-white w-100 d-flex rounded-4 overflow-hidden horizontal-premium-card"
          style={{ maxWidth: "970px", width: "auto" }}
        >
          {/* --- LEFT PANE --- */}
          <div className="card-left-pane text-white d-flex flex-column align-items-center justify-content-center text-center">
            <div
              className="mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{
                width: "72px",
                height: "72px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
            </div>
            <h3 className="fw-bold mb-2 fs-4">Access Denied</h3>
            <p style={{ opacity: 0.85, fontSize: "0.9rem", margin: 0 }}>
              Account privileges revoked
            </p>
          </div>

          {/* --- RIGHT PANE --- */}
          <div className="card-right-pane text-start p-5 d-flex flex-column justify-content-center">
            <h4 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
              Suspension Notice
            </h4>
            <p
              className="mb-4"
              style={{ color: "#475569", fontSize: "1rem", lineHeight: "1.6" }}
            >
              {backendMessage}
            </p>

            {/* Reason Box */}
            <div className="reason-box mb-3">
              <div className="d-flex align-items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#be123c"
                  className="me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
                <span
                  className="fw-bold"
                  style={{
                    color: "#be123c",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Reason Provided
                </span>
              </div>
              <p
                className="m-0 fw-medium"
                style={{ color: "#881337", fontSize: "0.95rem" }}
              >
                {suspensionReason}
              </p>
            </div>

            {/* Expiry Box */}
            <div className="expiry-box mb-4 d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="#64748b"
                className="me-3"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
              </svg>
              <div>
                <span
                  className="d-block fw-bold"
                  style={{
                    color: "#64748b",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Suspension Expires
                </span>
                <span
                  className="fw-bold"
                  style={{ color: "#0f172a", fontSize: "0.95rem" }}
                >
                  {formatExpiryDate(expiryDate)}
                </span>
              </div>
            </div>

            {/* --- APPEAL STATUS BOX --- */}
            {(localAppealStatus !== "None" || hasAppealedLocal)  && (
              <div className={`mb-4 ${localAppealStatus === "Pending" ? "status-box-pending" : "status-box-rejected"}`}>
                <div className="d-flex align-items-center mb-1">
                  {localAppealStatus === "Pending" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d97706" className="me-2" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0zM8 4a.5.5 0 0 0-.5.5v3.793L5.354 10.146a.5.5 0 1 0 .708.708l2.5-2.5a.5.5 0 0 0 .146-.354V4.5A.5.5 0 0 0 8 4z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc2626" className="me-2" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  )}
                  <span className="fw-bold" style={{ color: localAppealStatus === "Pending" ? "#b45309" : "#991b1b", fontSize: "0.85rem", textTransform: "uppercase" }}>
                    Appeal Status: {localAppealStatus}
                  </span>
                </div>
                
                {localAppealStatus === "Pending" && (
                  <p className="m-0" style={{ color: "#92400e", fontSize: "0.9rem" }}>
                    Your appeal has been received and is currently under review by the administration.
                  </p>
                )}
                
                {localAppealStatus === "Rejected" && (
                  <>
                    <p className="mb-2" style={{ color: "#7f1d1d", fontSize: "0.9rem" }}>
                      Your appeal was reviewed and denied. The suspension will remain in place.
                    </p>
                    {adminRemarks && (
                      <div className="p-2 rounded bg-light bg-opacity-50 border border-danger border-opacity-50">
                        <span className="fw-bold d-block" style={{ fontSize: "0.8rem", color: "#991b1b" }}>Admin Note:</span>
                        <span style={{ fontSize: "0.85rem", color: "#7f1d1d" }}>{adminRemarks}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 mt-auto">
              <button
                className="btn-primary-custom"
                onClick={() => setIsModalOpen(true)}
                disabled={hasAppealedLocal}
              >
                {hasAppealedLocal ? "Appeal Pending Review" : "Submit Appeal"}
              </button>

              <button
                onClick={()=>{
                  navigate("/logout");
                }}
                className="btn-outline-custom text-center fw-medium"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>

        {/* --- APPEAL MODAL --- */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div
              className="modal-content-custom text-start bg-white rounded-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold m-0" style={{ color: "#0f172a" }}>
                  Submit Appeal
                </h4>
                <button
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                ></button>
              </div>

              <p
                style={{
                  color: "#475569",
                  fontSize: "0.9rem",
                  marginBottom: "1.5rem",
                }}
              >
                Provide a detailed explanation regarding your suspension. This
                will be reviewed directly by the administration.
              </p>

              <form onSubmit={handleSubmitAppeal}>
                <div className="mb-4">
                  <label
                    className="form-label fw-bold"
                    style={{ color: "#334155", fontSize: "0.85rem" }}
                  >
                    Your Explanation
                  </label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="I am writing to appeal my suspension because..."
                    value={appealText}
                    onChange={(e) => setAppealText(e.target.value)}
                    required
                    style={{
                      resize: "none",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                    }}
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn-outline-custom border-0 bg-light"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-custom"
                    disabled={isSubmitting || !appealText.trim()}
                  >
                    {isSubmitting ? "Submitting..." : "Send Appeal"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SuspendedPage;
