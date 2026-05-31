import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import "../pages/dashboard/Admindashboard/SimpleAnalytics.css";

// Helper function moved OUTSIDE the component
const formatDateTime = (isoString) => {
  if (!isoString) return "N/A";

  const date = new Date(isoString);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} at ${formattedTime}`;
};

const AllStudents = ({ role }) => {
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- SUSPENSION MODAL STATE ---
  const [showSuspendPrompt, setShowSuspendPrompt] = useState(false);
  const [curStudentId, setCurStudentId] = useState(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendDuration, setSuspendDuration] = useState("7"); // Default to 1 week

  const studentsPerPage = 6;
  const token = localStorage.getItem("authToken");

  const getAllStudents = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/allStudents`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setAllStudents(Array.isArray(data) ? data : []);
      } else {
        setAllStudents([]);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setAllStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  // UX Fix: Reset to page 1 whenever the user types a new search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const deleteStudent = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/student/delete/${studentId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        toast.success("Student deleted successfully!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          maxWidth: "40vw",
        },
      });
        setAllStudents((prev) => prev.filter((student) => student._id !== studentId));
      } else {
        toast.error("Failed to delete student.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          maxWidth: "40vw",
        },
      });
      }
    } catch (error) {
      toast.error("An error occurred, try again later!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          maxWidth: "40vw",
        },
      });
      console.error("Delete error:", error);
    }
  };

  const suspendStudent = async (studentId) => {
    if (!suspendReason.trim()) {
      toast.error("Suspension reason is required.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          maxWidth: "40vw",
        },
      });
      return;
    }

    try {
      // Adjusted route to match your existing or new backend logic
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/superAdmin/suspendStudent`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            studentId, 
            reason: suspendReason,
            durationInDays: suspendDuration 
          }),
        }
      );

      if (response.ok) {
        toast.success(`Student suspended ${suspendDuration === "permanent" ? "permanently" : "successfully"}!`, {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          maxWidth: "40vw",
        },
      });
        setAllStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === studentId
              ? { 
                  ...student, 
                  suspensionDetails: { ...student.suspensionDetails, isSuspended: true } 
                } 
              : student
          )
        );

        // Reset modal state
        setShowSuspendPrompt(false);
        setSuspendReason("");
        setSuspendDuration("7");
        setCurStudentId(null);
      } else {
        toast.error("Failed to suspend student.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          maxWidth: "40vw",
        },
      });
      }
    } catch (error) {
      toast.error("An error occurred, try again later!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          maxWidth: "40vw",
          
        },
      });
      console.error("Suspend error:", error);
    }
  };

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return allStudents;
    const query = searchQuery.toLowerCase();
    return allStudents.filter((student) => {
      return (
        (student.name || "").toLowerCase().includes(query) ||
        (student.className || "").toLowerCase().includes(query) ||
        (student.branch || "").toLowerCase().includes(query)
      );
    });
  }, [allStudents, searchQuery]);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage) || 1;
  const currentStudents = useMemo(() => {
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    return filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  }, [filteredStudents, currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const paginationJSX = (
    <div className="d-flex align-items-center justify-content-center gap-3 mt-3 mb-2">
      <span className="small text-nowrap d-none d-sm-block opacity-75">
        Total: {filteredStudents.length}
      </span>
      <div className="btn-group">
        <button className="btn btn-outline-secondary btn-sm" onClick={goToPrevPage} disabled={currentPage === 1}>
          &lt; Prev
        </button>
        <p className="btn btn-sm disabled border-0 m-0" style={{ minWidth: "100px", backgroundColor: "var(--light-hover)" }}>
          Page {currentPage} of {totalPages}
        </p>
        <button className="btn btn-outline-secondary btn-sm" onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
      </div>
    </div>
  );

  return (
    <section className="d-flex flex-column justify-content-center align-items-center allStudents">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center w-100 px-sm-5 px-lg-0 mt-sm-4 gap-3">
        <p className="text-start fw-light mb-0 fs-3 d-flex align-items-center text-nowrap" style={{ color: "var(--text-dashboard-name)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="var(--text-dashboard-name)" className="me-2 mb-1" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
          </svg>
          All Students
        </p>

        {/* SEARCH BAR */}
        <div className="rounded-3 bg-opacity d-flex align-items-center mx-auto" style={{ maxWidth: "400px", width: "100%", backgroundColor: "var(--bg-surface)", border: "1px solid var(--light-hover)" }}>
          <div className="input-group-text border-0 bg-transparent ps-3 p-0" style={{ color: "var(--text-primary)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </div>
          <input
            type="text"
            className="form-control form-control-sm bg-transparent border-0 shadow-none searchInput"
            // style={{color:"var(--text-primary)"}}
            placeholder="Search by name, class, or branch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <hr className="mx-auto w-100" style={{ color: "var(--text-dashboard-name)" }} />

      {isLoading ? (
        <p className="mt-5 fs-5 text-muted">Loading students...</p>
      ) : filteredStudents.length === 0 ? (
        <p className="mt-5 fs-5 text-muted">
          {searchQuery ? "No students match your search criteria." : "No students registered yet."}
        </p>
      ) : (
        <>
          <div className="text-center mt-2 row m-0" style={{ width: "100%" }}>
            {currentStudents.map((curStudent) => {
              const formattedCreatedAt = formatDateTime(curStudent.createdAt);
              // Fallback checking for the old schema (isSuspended) or the new schema (suspensionDetails.isSuspended)
              const isCurrentlySuspended = curStudent.suspensionDetails?.isSuspended || curStudent.isSuspended;

              return (
                <div key={curStudent._id} className="col-lg-6 col-md-6 col-sm-12 p-3">
                  <div className="card rounded-4 p-4 text-start h-100 shadow-sm position-relative" style={{ backgroundColor: "var(--bg-glass)" }}>
                    <div className="d-flex flex-column justify-content-center h-100 gap-2" style={{ color: "var(--text-primary)" }}>
                      <p className="m-0" style={{ fontSize: "0.95rem" }}>
                        <span className="fw-bold me-2" style={{ color: "var(--text-dashboard-name)" }}>Name:</span> {curStudent.name}
                      </p>
                      <p className="m-0" style={{ fontSize: "0.95rem" }}>
                        <span className="fw-bold me-2" style={{ color: "var(--text-dashboard-name)" }}>Email:</span> {curStudent.email}
                      </p>
                      <p className="m-0" style={{ fontSize: "0.95rem" }}>
                        <span className="fw-bold me-2" style={{ color: "var(--text-dashboard-name)" }}>Roll No:</span> {curStudent.rollno}
                      </p>
                      <p className="m-0" style={{ fontSize: "0.95rem" }}>
                        <span className="fw-bold me-2" style={{ color: "var(--text-dashboard-name)" }}>Class:</span> {curStudent.className}
                      </p>
                      <p className="m-0" style={{ fontSize: "0.95rem" }}>
                        <span className="fw-bold me-2" style={{ color: "var(--text-dashboard-name)" }}>Branch:</span> {curStudent.branch}
                      </p>
                      <p className="m-0" style={{ fontSize: "0.95rem" }}>
                        <span className="fw-bold me-2" style={{ color: "var(--text-dashboard-name)" }}>Gender:</span> {curStudent.gender}
                      </p>
                      <hr className="my-2 opacity-25" />

                      <div className="bottom d-flex align-items-center justify-content-between">
                          <p className="m-0 text-truncate" style={{ fontSize: "0.85rem" }}>
                            <span className="fw-bold me-2" style={{color:"var(--text-dashboard-name)"}}>Registered:</span> {formattedCreatedAt}
                          </p>
                          
                        {role === "SuperAdmin" && !isCurrentlySuspended && (
                          <button
                            className="btn btn-outline-danger text-truncate rounded-4 text-center"
                            onClick={() => {
                              setShowSuspendPrompt(true);
                              setCurStudentId(curStudent._id);
                            }}
                            style={{ fontSize: "0.85rem" }}
                          >
                            Suspend Student
                          </button>
                        )}
                        {role === "SuperAdmin" && isCurrentlySuspended && (
                          <span
                            className="px-3 py-2 bg-danger text-truncate rounded-4 text-center text-light"
                            style={{ fontSize: "0.78rem" }}
                          >
                            Suspended Student
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM PAGINATION CONTROLS */}
          {filteredStudents.length > studentsPerPage && (
            <div className="mt-4 pb-4">
              {paginationJSX}
            </div>
          )}
        </>
      )}

      {/* CUSTOM PROMPT FOR SUSPENSION */}
      {showSuspendPrompt && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
          <div className="modal fade show d-block" style={{ zIndex: 1050 }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-mg text-center">
              <div className="modal-content border-0 shadow-lg rounded-4" style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-primary)" }}>
                <div className="modal-body p-4">
                  <h6 className="fw-bold mb-2">Confirm Suspension</h6>
                  <p className="small mb-3 opacity-75">Provide a reason and select the duration.</p>

                  <div className="text-start">
                    <label htmlFor="sReason" className="fw-semibold small opacity-75">Reason</label>
                    <input
                      type="text"
                      id="sReason"
                      className="shadow-none mb-3 mt-1 rounded-3 form-control form-control-sm"
                      placeholder="e.g., Violation of guidelines..."
                      style={{ backgroundColor: "var(--bg-glass)", border: "1px solid var(--light-hover)", color: "var(--text-primary)" }}
                      value={suspendReason}
                      onChange={(e) => setSuspendReason(e.target.value)}
                      autoFocus
                    />

                    <label htmlFor="sDuration" className="fw-semibold small opacity-75">Duration</label>
                    <select
                      className="shadow-none mt-1 rounded-3 form-select form-select-sm py-2"
                      style={{ backgroundColor: "var(--bg-glass)", border: "1px solid var(--light-hover)", color: "var(--text-primary)" }}
                      id="sDuration"
                      value={suspendDuration}
                      onChange={(e) => setSuspendDuration(e.target.value)}
                    >
                      <option value="3">3 Days</option>
                      <option value="7">1 Week</option>
                      <option value="30">1 Month</option>
                      <option value="permanent">Permanent</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-center gap-2 mt-4">
                    <button
                      className="btn btn-light shadow-none rounded-3 px-3"
                      onClick={() => {
                        setShowSuspendPrompt(false);
                        setSuspendReason("");
                        setSuspendDuration("7"); 
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger shadow-none rounded-3 px-3"
                      disabled={!suspendReason.trim()}
                      onClick={() => suspendStudent(curStudentId)}
                    >
                      Suspend User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default AllStudents;