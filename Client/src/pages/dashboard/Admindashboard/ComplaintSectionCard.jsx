import React from "react";

const ComplaintSectionCard = ({ complaint, viewClickedComplaint }) => {
  const statusClass = `status-${(complaint.status || "").toLowerCase()}`;
  const priorityClass = `priority-${(complaint.priority || "").toLowerCase()}`;
  return (
    <div
      className="complaint border p-3 rounded-4 text-start mb-2 bg-white"
      key={complaint._id}
      onClick={() => viewClickedComplaint(complaint)}
      style={{ cursor: "pointer" }}
    >
      <p className="d-flex m-0 justify-content-between">
        <span className="fs-5">{complaint.complaintTitle}</span>
        <span
          className="my-auto bg-secondary bg-opacity-10 rounded-3 p-1 px-2 text-dark"
          style={{ fontSize: "0.7rem" }}
        >
          {complaint.category}
        </span>
      </p>
      <div
        className="d-flex text-muted"
        style={{ fontSize: "0.8rem", width: "fit-content" }}
      >
        <p className="m-0 w-50 text-nowrap overflow-hidden">
          {complaint.complaintBody}
        </p>
        ...
      </div>
      <div
        className="stone-footer d-flex flex-sm-row flex-column mt-1"
        style={{ fontSize: "0.7rem" }}
      >
        <div className={`d-flex align-items-center ${statusClass}`}>
          <div
            className="status-dot me-2"
            style={{ width: "8px", height: "8px" }}
          ></div>
          <span>{complaint.status}</span>
        </div>
        <div
          className={`p-2 py-1 rounded-3 mx-sm-5 mx-lg-5 mx-md-5 text-nowrap text-center ${priorityClass}`}
        >
          {complaint.priority}
        </div>
      </div>
    </div>
  );
};

export default ComplaintSectionCard;