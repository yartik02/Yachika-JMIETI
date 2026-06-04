import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { trashIcon } from "../utils/Icons";

const ContactedUsers = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllContacts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/allContactUsMessages`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      setAllContacts(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Could not load messages.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      }
      );
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const deleteMsg = async (msgId) => {
    if (!window.confirm("Are you sure you want to delete this Message?"))
      return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/delete/SingleContactUsMessage/${msgId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        toast.success("Message deleted successfully!" , {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
        setAllContacts((prev) => prev.filter((msg) => msg._id !== msgId));
      } else {
        toast.error("Failed to delete message.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
      }
    } catch (error) {
      toast.error("An error occurred, try again later!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          minWidth: "40vw",
        },
      });
      console.error("Delete error:", error);
    }
  };

  return (
    <section className="d-flex flex-column justify-content-center align-items-center w-100">
      <div className="w-100">
        <h3
          className="text-start fw-light ms-3 mb-0 d-flex align-items-center"
          style={{ color: "var(--text-dashboard-name)" }}
        >
          <GridIcon />
          Contacted By
        </h3>
        <hr
          className="mx-auto w-100"
          style={{ color: "var(--text-dashboard-name)" }}
        />
      </div>

      <div className="row px-3 w-100">
        {isLoading ? (<div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading&hellip;</span>
        </div>
        <p className="mt-2 fs-5 opacity-75" style={{ color: "var(--text-primary)"}}>Loading messages&hellip;</p>
        </div>
      ) : allContacts.length === 0 ? (
          <div className="mt-5 fs-5 d-flex flex-column justify-content-center align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={70}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-secondary opacity-75"
            >
              <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
              <path d="M7 11h10" />
              <path d="M7 15h6" />
              <path d="M7 7h8" />
            </svg>
            <p className="text-center opacity-75">No contact messages found.</p>
          </div>
        ) : (
          allContacts.map((curMsg) => {
            const createdAtDate = new Date(curMsg.createdAt);
            const formattedDate = createdAtDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            const formattedTime = createdAtDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div key={curMsg._id} className="col-lg-6 col-md-6 col-sm-12 p-3">
                <div
                  className="card rounded-4 text-start p-4 d-flex flex-column justify-content-between shadow-sm"
                  style={{
                    backgroundColor: "var(--bg-glass)",
                    minHeight: "30vh",
                    color: "var(--text-primary)",
                  }}
                >
                  <div className="d-flex flex-column gap-2 mb-4">
                    <p className="m-0" style={{ fontSize: "0.95rem" }}>
                      <span
                        className="fw-bold me-2"
                        style={{ color: "var(--text-dashboard-name)" }}
                      >
                        Name:
                      </span>{" "}
                      {curMsg.name}
                    </p>
                    <p className="m-0" style={{ fontSize: "0.95rem" }}>
                      <span
                        className="fw-bold me-2"
                        style={{ color: "var(--text-dashboard-name)" }}
                      >
                        Email:
                      </span>
                      {curMsg.email}
                    </p>
                    <p className="m-0" style={{ fontSize: "0.95rem" }}>
                      <span
                        className="fw-bold me-2"
                        style={{ color: "var(--text-dashboard-name)" }}
                      >
                        Subject:
                      </span>
                      {curMsg.subject}
                    </p>
                    <div
                      className="m-0 mt-2 p-3 rounded-3 border border-secondary border-opacity-10"
                      style={{
                        fontSize: "0.9rem",
                        backgroundColor: "var(--light-hover)",
                      }}
                    >
                      <span className="fst-italic">"{curMsg.message}"</span>
                    </div>
                  </div>

                  <div
                    className="d-flex justify-content-between align-items-center mt-auto pt-3"
                    style={{ borderTop: "1px solid var(--light-hover)" }}
                  >
                    <p className="m-0" style={{ fontSize: "0.85rem" }}>
                      <span
                        className="fw-bold me-1"
                        style={{ color: "var(--text-dashboard-name)" }}
                      >
                        Received:
                      </span>
                      {formattedDate} at {formattedTime}
                    </p>
                    <button
                      className="btn btn-outline-danger rounded-pill d-flex align-items-center px-3"
                      onClick={() => deleteMsg(curMsg._id)}
                      style={{ fontSize: "0.85rem" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        // height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="me-1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                      {trashIcon}
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default ContactedUsers;

const GridIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="currentColor"
    className="me-2"
    viewBox="0 0 16 16"
  >
    <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1m9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0z" />
  </svg>
);