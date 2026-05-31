import React from "react";
import image2 from "../assets/complainImageNew.png";

const statsData = [
  {
    title: "24/7",
    desc: "Support",
    color: "text-primary", // Using Bootstrap's color classes instead of inline styles
  },
  {
    title: "98%",
    desc: "Resolution Rate",
    color: "text-success",
  },
];

const floatingInfo = [
  {
    id: 1,
    title: "Fast Resolution",
    desc: "Average 2–3 days",
    path: "M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0 M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z", // can replace with a real icon later
    color: "success",
    position: { top: "-35px", left: "20px" },
    name: "bi bi-check2-circle",
  },
  {
    id: 2,
    title: "Secure & Anonymous",
    desc: "Your privacy matters",
    path: "M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56",
    color: "primary",
    position: { bottom: "-35px", right: "10px" },
    name: "bi bi-shield",
  },
];
function Main1() {
  return (
    <div className="main container mb-5 px-4 d-flex my-lg-5 pb-lg-5 my-sm-0 justify-content-center">
        <div className="row align-items-center mt-5 g-5 mb-5">
          <div className="col-lg-6 order-lg-1 order-1">
            <div className="d-flex flex-column mb-sm-5 mb-lg-0 h-100">
              <span className="badge main1Badge bg-primary bg-opacity-10 fw-normal d-flex align-items-center align-self-start mb-4 p-2 px-3 rounded-pill" style={{color:"#2648c2ff"}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-target me-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
                Excellence in Student Services
              </span>

              {/* Heading */}
              <h1 className="display-4 heading fw-bold mb-3 text-lg-start text-sm-center">
                Your Voice <span className="text-gradient">Matters</span>
              </h1>

              {/* Description */}
              <p className="fs-6 opacity-75 mb-4 text-lg-start text-sm-center">
                Submit complaints, track progress, and help us create a better
                campus experience for everyone. Your feedback drives positive
                change and helps build a stronger academic community.
              </p>

              {/* Stats */}
              <div className="d-flex flex-wrap gap-4 mb-4 mb-lg-0 justify-content-around">
                {statsData.map((item, index) => (
                  <div
                    className="d-flex flex-column shadow justify-content-center align-items-center p-4 rounded-4 smallStats"
                    key={index}
                    style={{ minWidth: "120px" }}
                  >
                    <span className={`display-6 fw-bold ${item.color}`}>
                      {item.title}
                    </span>
                    <small className="opacity-75">{item.desc}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="col-lg-6 order-lg-2 order-2">
            <div className="position-relative px-auto d-flex justify-content-center align-items-center mt-4 mt-lg-0 mb-md-5 mb-lg-0 mb-0">
              {/* Image */}
              <img
                src={image2}
                alt="Students discussing campus issues"
                className="img-fluid Main1Img rounded-4 shadow w-75"
              />

              {floatingInfo.map((item) => (
                <div
                  key={item.id}
                  className={`position-absolute smallStats rounded-3 px-3 d-flex align-items-center text-${item.color}`}
                  style={{
                    ...item.position,
                    boxShadow: "0 1px 10px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <span
                    className={`me-2 fw-bold bg-${item.color} bg-opacity-10 rounded-5`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className={`${item.name} m-1`}
                      viewBox="0 0 16 16"
                    >
                      <path d={item.path} />
                    </svg>
                  </span>
                  <div className="d-flex flex-column my-1">
                    <p className="fw-bold mb-0">{item.title}</p>
                    <small className="text-start">{item.desc}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Main1;