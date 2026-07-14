import React, { useState, useEffect } from "react";
import "./SuspendedAcc.css";
import { toast } from "react-toastify";
import {useTheme } from "../utils/useTheme.jsx"

// --- Extracted Icons for cleaner JSX ---
const HeaderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="me-2"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="M8 12h.01" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#64748b"
    className={`bi bi-chevron-down chevron-icon ${isOpen ? "open" : ""}`}
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
    />
  </svg>
);
  
const SuspensionAppeals = () => {
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const {theme}= useTheme();

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "",
    studentId: null,
  });
  const [adminRemarks, setAdminRemarks] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchAppeals = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/getPendingAppeals`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await response.json();
        if (response.ok) {
          setAppeals(data);
          console.log(data);
        } else {
          setAppeals([]);
        }
      } catch (error) {
        toast.error("Unable to fetch the suspension appeals!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
        console.error("Error fetching appeals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppeals();
  }, []);

  const toggleAccordion = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const closeActionModal = () => {
    setModalConfig({ isOpen: false, type: "", studentId: null });
    setAdminRemarks("");
  };

  const handleProcessAppeal = async (e) => {
    e.preventDefault();

    if (!adminRemarks.trim()) {
      toast.error("Please provide remarks for this decision.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
      return;
    }

    setIsProcessing(true);

    try {
      // TODO: Uncomment and use actual API call
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/processAppeals`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              studentId: modalConfig.studentId,
              action: modalConfig.type,
              adminRemarks: adminRemarks,
            }),
          },
        );

        if (response.ok) {
          setAppeals((prev) =>
            prev.filter((student) => student._id !== modalConfig.studentId),
          );
          toast.success(
            `Appeal ${modalConfig.type === "Approve" ? "approved" : "rejected"} successfully.`,
            {
              style: {
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-primary)",
                width: "fit-content",
                minWidth: "40vw",
              },
            },
          );
          closeActionModal();
        }
      } catch (error) {
        toast.error("Failed to process appeal!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
      console.log(error)
        closeActionModal();
      }
    } catch (error) {
      console.error("Error processing appeal:", error);
      toast.error("Server error while processing appeal.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section
      className="d-flex flex-column justify-content-start align-items-center w-100 text-start"
      style={{ color: "var(--text-primary)" }}
    >
      <div className="header w-100 mb-3">
        <p
          className="text-start fw-light mb-0 fs-3 d-flex align-items-center"
          style={{ color: "var(--text-dashboard-name)" }}
        >
          <HeaderIcon />
          Suspension Appeals
        </p>
      </div>
      <hr
        className="mx-auto mt-0 w-100"
        style={{ color: "var(--text-dashboard-name)" }}
      />

      <div className="appealsContainer w-100">
        {appeals.length > 0 && (
          <p
            className="text-secondary fw-medium mb-4"
            style={{ fontSize: "0.95rem" }}
          >
            Total Pending Actions ({appeals.length})
          </p>
        )}

        {loading ? (
          <p className="opacity-75">Loading appeals...</p>
        ) : appeals.length === 0 ? (
          <div
            className="text-center py-5 rounded-4"
            style={{ backgroundColor: "var(--bg-glass)" }}
          >
            <p className="opacity-75 m-0">
              No pending appeals to review at this time.
            </p>
          </div>
        ) : (
          <div className="w-100">
            {appeals.map((student) => {
              const isOpen = expandedId === student._id;
              const selectRandomColor = (seed) => {
                const colors = [
                  "#b82525", // Red
                  "#2661c0", // Blue
                  "#198662", // Green
                  "#b17611", // Orange
                  "#693cd3", // Purple
                  "#c53a80", // Pink
                  "#15a393", // Teal
                  "#ac8100", // Yellow
                ];
                let hash = 0;
                for (let i = 0; i < seed.length; i++) {
                  hash = seed.charCodeAt(i) + ((hash << 5) - hash);
                }
                return colors[Math.abs(hash) % colors.length];
              };

              return (
                <div
                  key={student._id}
                  className="accordion-card"
                  style={{
                    backgroundColor: "var(--bg-glass)",
                    border: "1px solid var(--light-hover)",
                    color: "var(--text-primary)",
                  }}
                >
                  {/* --- ACCORDION HEADER --- */}
                  <div
                    className="accordion-header d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => toggleAccordion(student._id)}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold shadow-sm me-3"
                        style={{
                          width: "45px",
                          height: "45px",
                          backgroundColor: selectRandomColor(
                            student.name || student.rollno,
                          ),
                          fontSize: "1.1rem",
                        }}
                      >
                        {student.name
                          ? student.name.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                      <div className="d-flex flex-column">
                        <p
                          className="fw-bold m-0"
                          style={{ fontSize: "1.05rem" }}
                        >
                          {student.name}
                        </p>
                        <span
                          className="opacity-75 m-0"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {student.rollno} - {student.className} -
                          {student.branch}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <span
                        className="badge bg-warning bg-opacity-25 fw-medium px-3 py-2 rounded-pill border border-warning border-opacity-50"
                        style={{ color: "#ffaf03" }}
                      >
                        Pending
                      </span>
                      <ChevronIcon isOpen={isOpen} />
                    </div>
                  </div>

                  {/* --- ACCORDION BODY --- */}
                  <div
                    className={`custom-anim-wrapper ${isOpen ? "open" : ""}`}
                  >
                    <div className="custom-anim-inner">
                      <div
                        className="custom-anim-content"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <div className="row">
                          <div className="col-12 mb-3">
                            <p
                              className="fw-bold mb-1"
                              style={{
                                fontSize: "0.8rem",
                                opacity: "0.85",
                                textTransform: "uppercase",
                              }}
                            >
                              Original Suspension Reason
                            </p>
                            <p
                              className="m-0 text-danger"
                              style={{ fontSize: "0.95rem" }}
                            >
                              {student.suspensionDetails.reason}
                            </p>
                          </div>

                          <div className="col-12 mb-4">
                            <p
                              className="fw-bold mb-1"
                              style={{
                                fontSize: "0.8rem",
                                opacity: "0.85",
                                textTransform: "uppercase",
                              }}
                            >
                              Student's Appeal Statement
                            </p>
                            <div className="p-3 rounded-3 shadow-sm" style={{ backgroundColor: "var(--light-hover)" }}>
                              <p
                                className="m-0 fst-italic"
                                style={{
                                  fontSize: "0.95rem",
                                }}
                              >
                                "{student.suspensionDetails.appeal.appealText}"
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex justify-content-between align-items-center gap-2 mt-2">
                          <span
                            className="fw-medium opacity-50"
                            style={{ fontSize: "0.9rem" }}
                          >
                            student email: {student.email}
                          </span>
                          <div className="btns d-flex gap-2">
                            <button
                              className="btn btn-outline-danger px-4"
                              onClick={() =>
                                setModalConfig({
                                  isOpen: true,
                                  type: "Reject",
                                  studentId: student._id,
                                })
                              }
                              style={{ fontSize: "0.9rem", fontWeight: "500" }}
                            >
                              Reject
                            </button>
                            <button
                              className="btn px-4 btn-outline-success"
                              onClick={() =>
                                setModalConfig({
                                  isOpen: true,
                                  type: "Approve",
                                  studentId: student._id,
                                })
                              }
                              style={{
                                fontSize: "0.9rem",
                                fontWeight: "500",
                              }}
                            >
                              Approve & Restore
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* --- THE ACTION MODAL --- */}
      {modalConfig.isOpen && (
        <div className="modal-overlay" onClick={closeActionModal}>
          <div
            className="modal-content-custom text-start" 
            style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-primary)" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="d-flex justify-content-between align-items-center mb-3"
            data-bs-theme={theme}
            >
              <h5
                className="fw-bold m-0"
                style={{
                  color: modalConfig.type === "Approve" ? "#059669" : "#d33232",
                }}
              >
                {modalConfig.type === "Approve"
                  ? "Approve Appeal"
                  : "Reject Appeal"}
              </h5>
              <button
                className="btn-close"
                onClick={closeActionModal}
                disabled={isProcessing}
              ></button>
            </div>

            <p
              style={{
                opacity: "0.85",
                fontSize: "0.95rem",
                marginBottom: "1.5rem",
              }}
            >
              {modalConfig.type === "Approve"
                ? "You are about to lift this student's suspension. Please provide a reason or note for the student."
                : "You are about to permanently reject this appeal. The student will remain suspended until suspend expiry. Provide a reason below."}
            </p>

            <form onSubmit={handleProcessAppeal}>
              <div className="mb-4">
                <label
                  className="form-label fw-semibold"
                  style={{ fontSize: "0.85rem" }}
                >
                  Admin Remarks (Sent to Student)
                </label>
                <textarea
                  className="form-control modalInput"
                  rows="4"
                  placeholder="e.g., Your appeal has been reviewed and accepted..."
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  required
                  style={{
                    resize: "none",
                    border: "1px solid var(--light-hover)",
                    borderRadius: "8px",
                  }}
                  disabled={isProcessing}
                ></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-light px-4 border"
                  onClick={closeActionModal}
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn px-4 text-white ${modalConfig.type === "Approve" ? "btn-success" : "btn-danger"}`}
                  disabled={isProcessing || !adminRemarks.trim()}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Confirm ${modalConfig.type}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default SuspensionAppeals;