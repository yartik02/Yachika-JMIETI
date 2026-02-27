import React from "react";

const MyComplaintCard=({complaint})=>{
    const statusClass = `status-${(complaint.status || '').toLowerCase()}`;
    const priorityClass = `priority-${(complaint.priority || '').toLowerCase()}`;
    
    const createdAtDate = new Date(complaint.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    });


    return (
        <div className="border rounded-4 p-3 mb-2 text-start" style={{backgroundColor:"white"}}>
            <div className="d-flex justify-content-between ">
                <h4 className="stone-title m-0">{complaint.complaintTitle}</h4>
                <div className="text-muted">{formattedDate}
                </div>
            </div>

            <div className="tags d-flex my-sm-2 my-xs-5 my-md-2 my-lg-2">
                <div className={`status-indicator d-flex align-items-center ${statusClass}`} style={{width:"fit-content"}}>
                    <div className="status-dot"></div>
                    <span>{complaint.status}</span>
                </div>
                <div className={`priority-tag mx-5 text-nowrap text-center ${priorityClass}`} style={{width:"fit-content"}}>
                    {complaint.priority}
                </div>
            </div>

            <div className="complainBody text-start d-flex my-1 p-0 text-wrap overflow-scroll w-100 text-muted">
                {complaint.complaintBody}
            </div>

            <div className="stone-footer mt-2 d-flex flex-sm-row flex-column" >
                <div className="text-muted border border-secondary border-opacity-25 bg-secondary bg-opacity-10 py-1 px-2 rounded-2" style={{fontSize:"0.8rem"}}> 
                    <strong>Category: </strong>
                    <span>{complaint.category} - {complaint.subCategory}</span>
                </div>
            </div>
        </div>
    );
}

export default MyComplaintCard;