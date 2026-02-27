import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../store/auth";
import { formatTimeAgo } from "../../utils/timeAgo.js";
import "./Notifications.css";
import FeedbackForm from "../../components/FeedbackForm.jsx";

const getNotificationIcon = (message) => {
  const msgLower = message.toLowerCase();

  if (msgLower.includes("resolved")) {
    return {
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
    };
  }

  if (msgLower.includes("working") || msgLower.includes("progress")) {
    return {
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
    };
  }
  if (msgLower.includes("rejected")) {
    return {
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
    };
  } // Default icon for new complaints

  return {
    theme: "default",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
      </svg>
    ),
  };
};

const Notifications = () => {
  const [allNotifications, setAllNotifications] = useState([]); // Get allComplaints from context to check rating status
  const { token, user, allComplaints } = useAuth();
  let complaint= {};

  const markAsUnread = (index) => {
    return index === 0;
  };
  const getComplaintsRatingandFeedback = (complaintId) => {
    complaint = allComplaints.find((c) => c._id === complaintId);
    if (!complaint) {
      return false;
    } 

    return complaint.rating === 0 || complaint.feedback === "";
  };
  const getAllNotifications = useCallback(async () => {
    if (!token || !user) {
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/getNotifications?rollno=${user.rollno}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setAllNotifications(data);
      } else {
        console.error("Failed to fetch notifications:", response.statusText);
        setAllNotifications([]);
      }
    } catch (error) {
      console.error("Cannot fetch notifications:", error);
      setAllNotifications([]);
    }
  }, [token, user]);

  useEffect(() => {
    getAllNotifications();

    const intervalId = setInterval(() => {
      getAllNotifications();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [getAllNotifications]);

  return (
    <section className="notifications-page rounded-4 p-4">
      <div className="notifications-card bg-white">
        <header className="notifications-header p-4">
                    <h5 className="m-0">Notifications</h5>  
          <span className="notification-count-badge">
            {allNotifications.length}
          </span>
        </header>
        <div className="notifications-list">
          {allNotifications.length > 0 ? (
            allNotifications.map((notification, index) => {
              const { icon, theme } = getNotificationIcon(notification.message);
              const isResolved = notification.message
                .toLowerCase()
                .includes("resolved");
              const isRejected = notification.message
                .toLowerCase()
                .includes("rejected");
              const complaintId = notification.complaintId; // This is the _id from the complaint
              const isUnread = markAsUnread(index);

              return (
                <div
                  className={`notification-item position-relative p-4 ${
                    isUnread ? "unread" : ""
                  }`}
                  key={notification._id}
                >
                  {isUnread && (
                    <div className="notification-unread-dot p-1 px-2 rounded-pill">
                      New
                    </div>
                  )}
                  <span className="notification-time my-auto">
                    {formatTimeAgo(notification.createdAt)}
                  </span>
                  <div className={`notification-icon-wrapper theme-${theme}`}>
                    {icon}
                  </div>
                  <div className="notification-content m-0">
                    <p className="notification-message text-start text-lg-center">
                      {notification.message}
                    </p>
                    <div className="row container bg-secondary ms-0 bg-opacity-10 p-1 rounded-3 w-100 mt-2 text-sm-start g-3">
                      <div className="col-lg-3 col-md-6 col-sm-12 text-start notText border-dark notification-context my-auto text-muted">
                        <span className="fw-semibold">Title: </span>{notification.complaintTitle}
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 text-start notText border-dark notification-context my-auto text-muted">
                        <span className="fw-semibold">Category: </span>{notification.complaintCategory} - {notification.complaintSubCategory}
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 text-start notText border-dark notification-context my-auto text-muted">
                        <span className="fw-semibold">Priority: </span> {notification.complaintPriority} 
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 text-start notification-context my-auto text-muted">
                        <span className="fw-semibold">Submitted at: </span> 
                        {new Date(
                          notification.complaintCreatedAt
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    {
                      isResolved &&
                        getComplaintsRatingandFeedback(complaintId) && (
                          <div className="container bg-white shadow-lg p-3 rounded-3 mt-4 mx-auto w-75 text-sm-start">
                            <div className="text-start border-dark notification-context my-auto text-muted">
                              <p className="fw-light">
                                Your complaint has been resolved. Please share
                                your feedback with us.
                              </p>
                              <FeedbackForm complaintId={complaintId} />   
                            </div>
                          </div>
                        )
                    }
                    {
                      isRejected && getComplaintsRatingandFeedback(complaintId) && (
                        <div className="rejection rounded-3 p-2 mt-2 justify-content-start align-items-center bg-danger border border-danger bg-opacity-10 ">
                          <p className="border-dark m-0 text-start me-lg-3 fw-semibold text-danger">Reason for rejection</p>
                          <p className="border-dark m-0 text-start">{complaint.feedback}</p>
                        </div>
                      )
                    }
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-notifications-card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                width={70}
                fill="#cacacaff"
              >
                <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L513.4 479.7C530.6 477.3 543.9 462.4 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 99.2C249.4 107 215.8 128.8 192.8 158.9L73 39.1zM160 277.6C160 325.7 143.6 372.4 113.6 410L103.8 422.2C98.8 428.5 96 436.3 96 444.4C96 464 111.9 479.9 131.5 479.9L366.8 479.9L159.9 273L159.9 277.5zM320 576C349.8 576 374.9 555.6 382 528L258 528C265.1 555.6 290.2 576 320 576z" />
              </svg>
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
