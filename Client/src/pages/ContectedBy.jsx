import React, { useState, useEffect } from "react";

const ContectedUsers = () => {
  const [allcontacts, setAllContacts] = useState([]);
  const token = localStorage.getItem("authToken");

  const getAllContacts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/allContactUsMessages`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setAllContacts(data);
      // console.log("All Contact Us Messages:",data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <section
      className="d-flex flex-column justify-content-center contectedBy align-items-center"
      style={{ width: "100%" }}
    >
      <p
        className="text-start fw-light ms-3 mb-0 fs-3 w-100 d-flex align-items-center"
        style={{ color: "#065064" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#065064"
          className="bi bi-ui-checks-grid me-2"
          viewBox="0 0 16 16"
        >
          <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1m9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0z" />
        </svg>
        Contacted By
      </p>
      <hr className="mx-auto w-100" style={{ color: "#065064" }} />
      <div className="text-center row" style={{ width: "100%" }}>
        {allcontacts.map((curMsg, idx) => {
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
            <>
              <div
                key={idx}
                className="col-lg-6 col-md-6 col-sm-12 p-4"
                style={{}}
              >
                <div
                  className="card rounded-4 py-sm-4 text-start border"
                  style={{
                    backgroundColor: "#e0e1dd42",
                    border: "none",
                    minHeight: "10vw",
                  }}
                >
                  <span className="my-auto ps-4">
                    <p className="m-0" style={{ fontSize: "0.9rem" }}>
                      <span className="fw-bold me-2">Name:</span> {curMsg.name}
                    </p>
                    <p className="m-0" style={{ fontSize: "0.9rem" }}>
                      <span className="fw-bold me-2">Email:</span>{" "}
                      {curMsg.email}
                    </p>
                    <p className="m-0" style={{ fontSize: "0.9rem" }}>
                      <span className="fw-bold me-2">Subject:</span>{" "}
                      {curMsg.subject}
                    </p>
                    <p className="m-0" style={{ fontSize: "0.9rem" }}>
                      <span className="fw-bold me-2">Message:</span>{" "}
                      {curMsg.message}
                    </p>
                    <p className="m-0" style={{ fontSize: "0.9rem" }}>
                      <span className="fw-bold me-2">Messaged at:</span>
                      {formattedDate} at {formattedTime}
                    </p>
                  </span>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default ContectedUsers;
