import React from "react";

const MyComplaintCard = ({ complaint }) => {
  const statusClass = `status-${(complaint.status || "").toLowerCase()}`;
  const priorityClass = `priority-${(complaint.priority || "").toLowerCase()}`;

  const createdAtDate = new Date(complaint.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="rounded-4 p-3 mb-2 text-start"
      style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--light-hover)" }}
    >
      <div className="d-flex justify-content-between ">
        <h4 className="stone-title m-0">{complaint.complaintTitle}</h4>
        <div className="opacity-75 text-nowrap" style={{fontSize:"0.8rem"}}>{formattedDate}</div>
      </div>

      <div className="tags d-flex justify-content-between align-items-center my-sm-2 my-xs-5 my-md-2 my-lg-2">
        <div
          className={`status-indicator d-flex align-items-center ${statusClass}`}
          style={{ width: "fit-content" }}
        >
          <div className="status-dot"></div>
          <span>{complaint.status}</span>
        </div>
        <div
          className={`priority-tag text-center ${priorityClass}`}
        >
          {complaint.priority}
        </div>
      </div>

      <div className="complaintFoot my-1 d-flex flex-lg-row flex-column align-items-lg-center justify-content-between">
        <div className="complainBody text-start opacity-75 d-flex text-truncate overflow-scroll">
          {complaint.complaintBody}
        </div>

        <div className="stone-footer d-flex flex-sm-row flex-column p-0 justify-content-end" style={{width:"fit-content", maxWidth:"320px"}}>
          <div
            className="border border-secondary text-nowrap mt-2 mt-lg-0 border-opacity-10 bg-secondary bg-opacity-10 py-1 px-2 rounded-3"
            style={{ fontSize: "0.8rem", width: "fit-content" }}
          >
            <strong className="me-1 category-text">Category: </strong>
            <span className="category-text">
              {complaint.category} - {complaint.subCategory}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComplaintCard;
