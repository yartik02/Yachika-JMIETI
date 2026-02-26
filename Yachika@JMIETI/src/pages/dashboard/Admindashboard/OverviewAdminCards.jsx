import React from 'react';
import { useAuth } from "../../../store/auth";



function OverviewAdmin() {
  const { allComplaints } = useAuth();

const totalComp= allComplaints?.length || 0;

const pendingComp = allComplaints.filter(complaint => 
    complaint.status && complaint.status.toLowerCase() === 'pending'
);

const resolvedComp = allComplaints.filter(complaint => 
    complaint.status && complaint.status.toLowerCase() === 'resolved'
);

const highPriorityComp = allComplaints.filter(complaint => 
    complaint.priority && complaint.priority.toLowerCase() === 'high' && complaint.status!=="Resolved" && complaint.status!=="Rejected"
);

const statsData = [
    {
        title: 'Total',
        value: totalComp,
        color: '#3b83f611',
        glowColor: '#0e469fff',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={70} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0062ffff" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: 'Pending',
        value: pendingComp.length,
        color: '#f59f0b17',
        glowColor: '#ba8800ff',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={70} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ff7b00ff" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: 'Resolved',
        value: resolvedComp.length,
        color: '#10b9811e',
        glowColor: '#0a5d36ff',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={70} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0f9166ff" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: 'High Priority',
        value: highPriorityComp.length,
        color: '#ff000010',
        glowColor: '#890000ff',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={60} fill="#b60000ff" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
              <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
              <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>
        )
    }
];

    return (
        <div className="overviewCards mx-auto" style={{width:"100%"}}>
            <div className="row ">
                {statsData.map((stat, idx) => (
                    <div className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0" key={idx}>
                        <div className="d-flex p-4 rounded-4" style={{backgroundColor: stat.color, border:`1px solid ${stat.glowColor}`}}>
                            <span
                                className="my-auto"
                            >
                                {stat.icon}
                            </span>
                            <h6 className="fw-normal fs-6 ms-auto my-auto text-end" style={{color: stat.glowColor}}>{stat.title}
                            <p className="fw-normal fs-1 mt-2 mb-0">{stat.value}</p></h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OverviewAdmin;

