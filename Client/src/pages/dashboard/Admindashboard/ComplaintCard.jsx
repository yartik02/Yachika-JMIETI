import React from "react";

const ComplaintCard = ({ complaint }) => {
  const statusClass = `status-${(complaint.status || "").toLowerCase()}`;
  const priorityClass = `priority-${(complaint.priority || "").toLowerCase()}`;

  return (
    <div className="stone-card d-flex flex-row justify-content-between align-items-lg-center rounded-4 p-3 text-start" style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--light-hover)" }}>
      <div className="d-flex flex-column justify-content-center align-items-start" style={{maxWidth:"70%"}}>
        <h3 className="stone-title m-0">{complaint.complaintTitle}</h3>
        <p className="m-0 opacity-75 text-truncate w-100">{complaint.complaintBody}</p>
      </div>

      <div className="stone-footer d-flex flex-column flex-md-row flex-lg-row align-items-center gap-2">
        <div
          className={`status-indicator d-flex align-items-center ${statusClass}`}
        >
          <div className="status-dot"></div>
          <span className="settingsText">{complaint.status}</span>
        </div>
        <div
          className={`priority-tag text-center ${priorityClass}`}
        >
          {complaint.priority}
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;