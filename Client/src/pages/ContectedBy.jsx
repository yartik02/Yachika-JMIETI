import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ContactedUsers = () => {
  const [allContacts, setAllContacts] = useState([]);

  const getAllContacts = async () => {
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
      toast.error("Could not load messages.");
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
        toast.success("Message deleted successfully!");
        setAllContacts((prev) => prev.filter((msg) => msg._id !== msgId));
      } else {
        toast.error("Failed to delete message.");
      }
    } catch (error) {
      toast.error("An error occurred, try again later!");
      console.error("Delete error:", error);
    }
  };

  return (
    <section className="d-flex flex-column justify-content-center align-items-center w-100">
      <div className="w-100">
        <h3
          className="text-start fw-light ms-3 mb-0 d-flex align-items-center"
          style={{ color: "#065064" }}
        >
          <GridIcon />
          Contacted By
        </h3>
        <hr className="mx-auto w-100" style={{ color: "#065064" }} />
      </div>

      <div className="row w-100 px-3">
        {allContacts.length === 0 ? (
          <div className="text-muted mt-5 fs-5 d-flex flex-column justify-content-center align-items-center">
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
            <p className="text-center">No contact messages found.</p>
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
                  className="card rounded-4 text-start border border-secondary border-opacity-10 p-4 d-flex flex-column justify-content-between shadow-sm"
                  style={{
                    backgroundColor: "#e0e1dd42",
                    minHeight: "30vh",
                  }}
                >
                  <div className="d-flex flex-column gap-2 mb-4">
                    <p className="m-0" style={{ fontSize: "0.95rem" }}>
                      <span className="fw-bold me-2">Name:</span> {curMsg.name}
                    </p>
                    <p className="m-0" style={{ fontSize: "0.95rem" }}>
                      <span className="fw-bold me-2">Email:</span>{" "}
                      {curMsg.email}
                    </p>
                    <p className="m-0" style={{ fontSize: "0.95rem" }}>
                      <span className="fw-bold me-2">Subject:</span>{" "}
                      {curMsg.subject}
                    </p>
                    <div
                      className="m-0 mt-2 p-3 bg-white rounded-3 border border-secondary border-opacity-10"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <span className="fst-italic">"{curMsg.message}"</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-auto border-top pt-3">
                    <p
                      className="m-0 text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <span className="fw-bold me-1">Received:</span>
                      {formattedDate} at {formattedTime}
                    </p>
                    <button
                      className="btn btn-outline-danger rounded-pill d-flex align-items-center px-3"
                      onClick={() => deleteMsg(curMsg._id)}
                      style={{ fontSize: "0.85rem" }}
                    >
                      <TrashIcon />
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
    fill="#065064"
    className="me-2"
    viewBox="0 0 16 16"
  >
    <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1m9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="me-2"
    viewBox="0 0 16 16"
  >
    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
  </svg>
);
