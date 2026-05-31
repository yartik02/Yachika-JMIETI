import React, { memo } from 'react';

const ComplaintItem = memo(({ complaint, onClick, isActive }) => {
    const statusClass = `status-${(complaint.status || "").toLowerCase()}`;
    const priorityClass = `priority-${(complaint.priority || "").toLowerCase()}`;
    const activeClass = isActive ? 'active-complaint bg-secondary bg-opacity-10' : '';

    const handleClick = () => {
        onClick(complaint);
    };

    return (
        <div
            className={`complaint p-lg-3 p-2 rounded-4 text-start mb-2 ${activeClass}`}
            onClick={handleClick} 
            style={{ cursor: "pointer", backgroundColor: "var(--bg-surface)", border: isActive ? '2px solid var(--accent-primary)' : '2px solid var(--light-hover)', transition: 'border 0.1s ease' }}
        >
            <p className="d-flex m-0 justify-content-between">
                <span className="value text-truncate" style={{}}>{complaint.complaintTitle}</span>
                <span className="my-auto bg-primary bg-opacity-10 fw-light rounded-3 para catagory p-1 px-2">{complaint.category}</span>
            </p>
            <div
                className="d-flex opacity-75 para"
                style={{ fontSize: "0.8rem", width: "fit-content" }}
            >
                <p className="m-0 text-truncate" style={{ maxWidth: "290px" }}>
                    {complaint.complaintBody}
                </p>
            </div>
            <div className="stone-footer d-flex flex-sm-row flex-column mt-1"
                style={{ fontSize: "0.7rem" }}
            >
                <div className={`d-flex align-items-center para ${statusClass}`}>
                    <div className="status-dot me-2" style={{ width: "8px", height: "8px" }}></div>
                    <span>{complaint.status}</span>
                </div>
                <div
                    className={`p-2 py-1 rounded-3 mx-sm-5 mx-lg-5 mx-md-5 text-nowrap text-center para ${priorityClass}`}
                >
                    {complaint.priority}
                </div>
            </div>
        </div>
    );
});

export default ComplaintItem;