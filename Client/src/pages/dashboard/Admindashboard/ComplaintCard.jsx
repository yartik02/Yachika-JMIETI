import React from "react";

const ComplaintCard = ({ complaint }) => {
  const statusClass = `status-${(complaint.status || "").toLowerCase()}`;
  const priorityClass = `priority-${(complaint.priority || "").toLowerCase()}`;

  return (
    <div className="stone-card border d-flex flex-lg-row flex-column justify-content-lg-between align-items-lg-center rounded-4 p-3 text-start bg-white">
      <div className="d-flex flex-column align-items-start">
        <h3 className="stone-title m-0">{complaint.complaintTitle}</h3>
        <p className="m-0 text- text-muted">
          {complaint.complaintBody}
        </p>
      </div>

      <div className="stone-footer d-flex gap-3">
        <div
          className={`status-indicator d-flex align-items-center ${statusClass}`}
        >
          <div className="status-dot"></div>
          <span className="settingsText">{complaint.status}</span>
        </div>
        <div
          className={`priority-tag text-center ${priorityClass}`}
          style={{ width: "fit-content" }}
        >
          {complaint.priority}
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
