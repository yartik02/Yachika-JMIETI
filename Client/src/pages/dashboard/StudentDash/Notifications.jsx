import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "../../../store/auth";
import { formatTimeAgo } from "../../../utils/timeAgo.js";
import FeedbackForm from "../../../components/FeedbackForm.jsx";
import { toast } from "react-toastify";
import "./Notifications.css";

// 1. Static Config: Moved outside to prevent re-creation on render
const THEMES = {
  resolved: {
    theme: "success",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-check-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
      </svg>
    ),
  },
  progress: {
    theme: "info",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-arrow-repeat m-auto"
        viewBox="0 0 16 16"
      >
        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
        <path
          fillRule="evenodd"
          d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
        />
      </svg>
    ),
  },
  rejected: {
    theme: "danger",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-x-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
    ),
  },
  appeal: {
    theme: "success",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  default: {
    theme: "default",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-bell"
        viewBox="0 0 16 16"
      >
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
      </svg>
    ),
  },
};

const Notifications = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const { token, user, allComplaints } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const getAllNotifications = useCallback(async () => {
    if (!token || !user?.rollno) return;
    try {
      const response = await fetch(
        `${API_URL}/api/auth/getNotifications?rollno=${user.rollno}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setAllNotifications(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, user?.rollno, API_URL]);

  const markAsReadInDatabase = useCallback(async () => {
    if (!token || !user?.rollno) return;
    try {
      await fetch(
        `${API_URL}/api/auth/markNotificationsAsRead?rollno=${user.rollno}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error("Update error:", error);
    }
  }, [token, user?.rollno, API_URL]);

  useEffect(() => {
    getAllNotifications();
    const readTimer = setTimeout(markAsReadInDatabase, 2000);
    const intervalId = setInterval(getAllNotifications, 30000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(readTimer);
    };
  }, [getAllNotifications, markAsReadInDatabase]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to clear all notifications?"))
      return;
    setIsClearing(true);
    try {
      const res = await fetch(
        `${API_URL}/api/auth/clearNotifications?rollno=${user.rollno}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        setAllNotifications([]);
        toast.success("Notifications cleared successfully!");
      }
    } catch (err) {
      toast.error("Failed to clear notifications!");
    } finally {
      setIsClearing(false);
    }
  };

  // 2. Logic to get theme based on message (Safe string comparison)
  const getThemeConfig = (message, title) => {
    const msg = message.toLowerCase();
    if (msg.includes("resolved")) return THEMES.resolved;
    if (msg.includes("working") || msg.includes("progress"))
      return THEMES.progress;
    if (msg.includes("rejected")) return THEMES.rejected;
    if (title.toLowerCase().includes("appeal approved")) return THEMES.appeal
    return THEMES.default;
  };

  return (
    <section className="notifications-page rounded-4 p-4">
      <div className="notifications-card bg-white shadow-sm">
        <header className="notifications-header p-4 d-flex justify-content-between align-items-center position-relative">
          <div className="d-flex align-items-center">
            <h5 className="m-0 me-2">Notifications</h5>
            <span className="notification-count-badge">
              {!isLoading && allNotifications.length}
            </span>
          </div>

          {allNotifications.length > 0 && (
            <div className="notification-menu-container" ref={menuRef}>
              {/* Three Vertical Dots Icon Button */}
              <button
                className="btn p-1 border-0 shadow-none"
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Notification Options"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div
                  className="position-absolute end-0 mt-2 shadow-sm rounded-3 bg-white border border-light py-2"
                  style={{ zIndex: 1000, width: "150px", top: "80%" }}
                >
                  <button
                    className="dropdown-item text-danger d-flex align-items-center px-3 py-2 w-100 text-start"
                    onClick={() => {
                      handleClearAll();
                      setShowMenu(false);
                    }}
                    disabled={isClearing}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3 me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5a.5.5 0 0 1 .47-.528M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5m2.47.5a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L10 5a.5.5 0 0 1 .47-.528" />
                    </svg>
                    {isClearing ? "Clearing..." : "Clear All"}
                  </button>
                </div>
              )}
            </div>
          )}
        </header>

        <div className="notifications-list">
          {isLoading ? (
            <div className="d-flex justify-content-center p-5">
              <div className="spinner-border" />
            </div>
          ) : allNotifications.length > 0 ? (
            allNotifications.map((notification) => {
              const { theme, icon } = getThemeConfig(notification.message, notification.title);
              const isResolved = notification.message
                .toLowerCase()
                .includes("resolved");
              const isRejected = notification.message
                .toLowerCase()
                .includes("rejected");
              const feedbackReplyNotification = notification.message
                .toLowerCase()
                .includes("feedback");
              const matchedComplaint = allComplaints?.find(
                (c) => c._id === notification.complaintId,
              );

              const currNotiIsAppeal = notification.title
                .toLowerCase()
                .includes("appeal");

              return (
                <div
                  key={notification._id}
                  className={`notification-item position-relative p-4 ${!notification.isRead ? "unread" : ""}`}
                >
                  {!notification.isRead && (
                    <div className="notification-unread-dot p-1 px-2 rounded-pill">
                      New
                    </div>
                  )}

                  <span className="notification-time my-auto">
                    {formatTimeAgo(notification.createdAt)}
                  </span>

                  <div className={`notification-icon-wrapper me-0 theme-${theme}`}>
                    {icon}
                  </div>

                  {!currNotiIsAppeal && (
                    <div className="notification-content m-0">
                      <p className="notification-message text-start text-lg-center w-75 mx-auto">
                        {notification.message}
                      </p>

                      <div className="row container bg-secondary ms-0 bg-opacity-10 p-1 rounded-3 w-100 mt-2 text-sm-start g-3">
                        <div className="col-lg-3 col-md-6 col-sm-12 text-start notText border-dark notification-context my-auto text-muted">
                          <span className="fw-semibold">Title: </span>
                          {notification.complaintTitle}
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 text-start notText border-dark notification-context my-auto text-muted">
                          <span className="fw-semibold">Category: </span>
                          {notification.complaintCategory}
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 text-start notText border-dark notification-context my-auto text-muted">
                          <span className="fw-semibold">Priority: </span>
                          {notification.complaintPriority}
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 text-start notification-context my-auto text-muted">
                          <span className="fw-semibold">Submitted: </span>
                          {new Date(
                            notification.complaintCreatedAt,
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>

                      {isResolved &&
                        matchedComplaint &&
                        matchedComplaint.feedback === " " && (
                          <div className="container bg-white shadow-lg p-3 rounded-3 mt-4 mx-auto w-75 text-sm-start">
                            <p className="fw-light">
                              Your complaint has been resolved. Please share
                              feedback.
                            </p>
                            <FeedbackForm
                              complaintId={notification.complaintId}
                            />
                          </div>
                        )}

                      {isRejected && matchedComplaint && (
                        <div className="rejection rounded-3 p-2 mt-2 bg-danger bg-opacity-10 border border-danger">
                          <p className="m-0 text-start fw-semibold text-danger">
                            Reason for rejection
                          </p>
                          <p className="m-0 text-start">
                            {matchedComplaint.feedback}
                          </p>
                        </div>
                      )}

                      {feedbackReplyNotification && matchedComplaint && (
                        <div className="container bg-info-subtle p-3 rounded-3 mt-4 mx-auto w-75 text-sm-start">
                          <p className="fw-light mb-0">
                            We have received your feedback and rating. here is
                            what you provided:
                          </p>
                          <div className="feedback-reply">
                            <p
                              className="m-0 text-start"
                              style={{ fontSize: "0.9rem" }}
                            >
                              {" "}
                              <span className="fw-semibold">
                                Your Feedback:
                              </span>{" "}
                              {matchedComplaint.feedback}
                            </p>
                            <p
                              className="m-0 text-start"
                              style={{ fontSize: "0.9rem" }}
                            >
                              {" "}
                              <span className="fw-semibold">
                                Your rating:
                              </span>{" "}
                              {matchedComplaint.rating}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {currNotiIsAppeal && (
                    <div className="notification-content m-0 d-flex flex-column align-items-center gap-1">
                      <p className="notification-message text-start text-lg-center w-75 mx-auto">
                        {notification.title}!
                      </p>
                      <div className="my-auto text-muted notification-message bg-success bg-opacity-10 py-1 px-2 px-lg-4 py-lg-2 rounded" style={{minWidth:"50%", maxWidth:"75%"}} >
                        <span className="fw-semibold me-2 text-success">
                          Admin Remarks:{" "}
                        </span>
                        {notification.message}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="no-notifications-card p-5 text-center">
              <p className="text-muted mt-3 mb-0">
                You don't have new notifications.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Notifications;