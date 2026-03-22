import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./SuspendedAcc.css";

// Helper function to format date specifically to Indian Standard Time (IST)
const formatExpiryDate = (isoString) => {
  if (!isoString) return "Indefinite / Not Specified";
  
  const date = new Date(isoString);
  
  const dateOptions = { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" };
  
  const formattedDate = date.toLocaleDateString("en-IN", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-IN", timeOptions);

  return `${formattedDate} at ${formattedTime} IST`;
};

const SuspendedPage = () => {
  const location = useLocation();

  // Fallback values
  const backendMessage = location.state?.backendMessage || "Your account access has been restricted by the administration.";
  const suspensionReason = location.state?.reason || "Violation of platform guidelines or pending administrative review.";
  const expiryDate = location.state?.expiryDate;

  return (
    <>
      <div className="suspension-bg min-vh-100 d-flex justify-content-center align-items-center px-3 py-4">
        <div className="shadow-lg bg-white d-flex rounded-4 overflow-hidden horizontal-premium-card" style={{ maxWidth: "870px", width: "100%" }}>
          
          {/* --- LEFT PANE --- */}
          <div className="card-left-pane text-white d-flex flex-column align-items-center justify-content-center text-center">
            <div 
              className="mb-4 rounded-circle d-flex justify-content-center align-items-center" 
              style={{ width: "72px", height: "72px", backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
              </svg>
            </div>
            <h3 className="fw-bold mb-2 fs-4">Access Denied</h3>
            <p style={{ opacity: 0.85, fontSize: "0.9rem", margin: 0 }}>
              Account privileges revoked
            </p>
          </div>

          {/* --- RIGHT PANE --- */}
          <div className="card-right-pane text-start p-5 d-flex flex-column justify-content-center">
            <h4 className="fw-bold mb-2" style={{ color: "#0f172a" }}>Suspension Notice</h4>
            <p className="mb-4" style={{ color: "#475569", fontSize: "1rem", lineHeight: "1.6" }}>
              {backendMessage}
            </p>

            {/* Reason Box */}
            <div className="reason-box mb-3">
              <div className="d-flex align-items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#be123c" className="me-2" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <span className="fw-bold" style={{ color: "#be123c", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Reason Provided
                </span>
              </div>
              <p className="m-0 fw-medium" style={{ color: "#881337", fontSize: "0.95rem" }}>
                {suspensionReason}
              </p>
            </div>

            {/* Expiry Box */}
            <div className="expiry-box mb-4 d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#64748b" className="me-3" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
              </svg>
              <div>
                <span className="d-block fw-bold" style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Suspension Expires
                </span>
                <span className="fw-bold" style={{ color: "#0f172a", fontSize: "0.95rem" }}>
                  {formatExpiryDate(expiryDate)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 mt-auto">
              <a 
                href="mailto:adminYachika@jmieti.edu.in?subject=Appeal%20for%20Account%20Suspension" 
                className="btn-primary-custom text-center text-white fw-medium border-0"
              >
                Contact Administration
              </a>
              <Link to="/login" className="btn-outline-custom text-center fw-medium">
                Return to Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SuspendedPage;