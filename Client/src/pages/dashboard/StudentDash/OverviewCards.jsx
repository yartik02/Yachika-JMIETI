import React from "react";
import "./HomeStudent.css";

function Overview({ studentComplaints }) {
  const totalComplaints = studentComplaints.length;
  const pendingComplaints = studentComplaints.filter(
    (c) => c.status === "Pending",
  ).length;
  const resolvedComplaints = studentComplaints.filter(
    (c) => c.status === "Resolved",
  ).length;
  const ratedComplaints = studentComplaints.filter(
    (c) => c.rating !== 0,
  ).length;

  const statsData = [
  {
    title: "Total",
    value: totalComplaints,
    color: "var(--stat-total-bg)",
    glowColor: "var(--stat-total-glow)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={70}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="var(--stat-total-icon)"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Pending",
    value: pendingComplaints,
    color: "var(--stat-pending-bg)",
    glowColor: "var(--stat-pending-glow)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={70}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.4}
        stroke="var(--stat-pending-icon)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 14v2.2l1.6 1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v.832" />
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
        <circle cx="16" cy="16" r="6" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
      </svg>
    ),
  },
  {
    title: "Resolved",
    value: resolvedComplaints,
    color: "var(--stat-resolved-bg)",
    glowColor: "var(--stat-resolved-glow)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={70}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="var(--stat-resolved-icon)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Rated",
    value: ratedComplaints,
    color: "var(--stat-rated-bg)",
    glowColor: "var(--stat-rated-glow)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={70}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--stat-rated-icon)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </svg>
    ),
  },
];
  return (
    <div className="overviewCards mx-auto m-sm-0" style={{ width: "100%" }}>
      <div className="row my-lg-4 my-sm-2">
        {statsData.map((stat, idx) => (
          <div className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0" key={idx}>
            <div
              className="d-flex p-4 rounded-4"
              style={{
                backgroundColor: stat.color,
                border: `1px solid ${stat.glowColor}`,
              }}
            >
              <span className="my-auto">{stat.icon}</span>
              <h6
                className="fw-normal fs-6 ms-auto my-auto text-end"
                style={{ color: stat.glowColor }}
              >
                {stat.title}
                <p className="fw-normal fs-1 mt-2 mb-0">{stat.value}</p>
              </h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Overview;
