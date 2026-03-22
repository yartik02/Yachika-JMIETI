import React from 'react';

function Overview({ studentComplaints }) {
    const totalComplaints = studentComplaints.length;
    const pendingComplaints = studentComplaints.filter(c => c.status === 'Pending').length;
    const resolvedComplaints = studentComplaints.filter(c => c.status === 'Resolved').length;
    const ratedComplaints = studentComplaints.filter(c => c.rating!==0).length;

    const statsData = [
    {
        title: 'Total',
        value: totalComplaints,
        color: '#3b83f611', // Blue
        glowColor: '#0e469fff',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={70} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0062ffff" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: 'Pending',
        value: pendingComplaints,
        color: '#f59f0b17', // Amber
        glowColor: '#ba5a00ff',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={70} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ff7b00ff" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: 'Resolved',
        value: resolvedComplaints,
        color: '#10b9811e', // Emerald
        glowColor: '#0a5d36ff',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={70} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0f9166ff" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: 'Rated',
        value: ratedComplaints,
        color: '#8a5cf61d', // Violet
        glowColor: '#430986ff',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={70} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#aa00ffff" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        )
    }

];
    return (
        <div className="overviewCards mx-auto m-sm-0" style={{width:"100%"}}>
            <div className="row my-lg-4 my-sm-2">
                {statsData.map((stat, idx) => (
                    <div className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0" key={idx}>
                        <div className="d-flex p-4 rounded-4" style={{backgroundColor: stat.color, border:`1px solid ${stat.glowColor}`}}>
                            <span
                                className="my-auto"
                                style={{
                                    // boxShadow: `0 0 10px ${stat.glowColor}`,
                                }}
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

export default Overview;

