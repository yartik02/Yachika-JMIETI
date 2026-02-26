import React from 'react';

const ComplaintCard = ({ complaint, viewMyComplaintSection}) => {
    const statusClass = `status-${(complaint.status || '').toLowerCase()}`;
    const priorityClass = `priority-${(complaint.priority || '').toLowerCase()}`;

    return (
        <div className="stone-card border rounded-4 p-lg-3 p-2 text-start bg-white">
            <div className="d-flex justify-content-between">
                <h3 className="stone-title m-0">{complaint.complaintTitle}</h3>
            </div>

            <div className="stone-body text-start d-flex mb-0 p-0 text-muted">
                <p className='m-0 w-75 overflow-hidden text-nowrap mb-lg-1'>{complaint.complaintBody}</p>
            </div>

            <div className="stone-footer d-flex flex-sm-row flex-column">
                <div className={`status-indicator d-flex align-items-center ${statusClass}`}>
                    <div className="status-dot"></div>
                    <span className='settingsText'>{complaint.status}</span>
                </div>
                <div className={`priority-tag mx-sm-5 mx-lg-5 mx-md-5 mt-sm-5 mt-md-0 mt-lg-0 text-nowrap text-center ${priorityClass}`} style={{width:"fit-content"}}>
                    {complaint.priority}
                </div>
            </div>
        </div>
    );
};

export default ComplaintCard;