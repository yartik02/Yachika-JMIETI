import React, { memo } from 'react';

const ComplaintItem = memo(({ complaint, onClick, isActive }) => {
    const statusClass = `status-${(complaint.status || "").toLowerCase()}`;
    const priorityClass = `priority-${(complaint.priority || "").toLowerCase()}`;
    const activeClass = isActive ? 'active-complaint' : '';

    const handleClick = () => {
        onClick(complaint);
    };

    return (
        <div
            className={`complaint p-lg-3 p-2 rounded-4 text-start mb-2 ${activeClass}`}
            onClick={handleClick} 
            style={{ cursor: "pointer", backgroundColor: "#f2f5fe89" }}
        >
            <p className="d-flex m-0 justify-content-between">
                <span className="value">{complaint.complaintTitle}</span>
                <span className="my-auto bg-primary bg-opacity-10 fw-light rounded-3 para catagory p-1 px-2 text-dark">{complaint.category}</span>
            </p>
            <div
                className="d-flex text-muted para"
                style={{ fontSize: "0.8rem", width: "fit-content" }}
            >
                <p className="m-0 text-nowrap overflow-hidden" style={{ maxWidth: "190px" }}>
                    {complaint.complaintBody}
                </p>
                ...
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