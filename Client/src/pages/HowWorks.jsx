import React from "react";
import "./Works.css";

const stepsData = [
  {
    title: "Submit Your Complaint",
    description: "Create an account and submit your concern through our easy-to-use form. Choose to remain anonymous if needed.",
  },
  {
    title: "Track Progress",
    description: "Monitor your complaint status in real-time and receive notifications when updates are made by our admin team.",
  },
  {
    title: "Get Resolution",
    description: "Once resolved, provide feedback on the solution and help us continuously improve our services.",
  },
];


const HowWorks = () => {
  return (
    <section
      className="dark-how-it-works-section mx-auto"
      id="howItWorks"
      style={{ zIndex:3 }}
    >
      <div className="container">
        <div className="texts mx-auto">
          <h6 className="display-6 heading fw-bold text-center">
            How Yachika@JMIETI <span className="text-gradient">Works</span>
          </h6>
          <p
            className="fs-6 fw-light mb-5 text-center mx-auto"
            style={{ color: "#9CA3AF" }}
          >
            Simple steps to make your voice heard
          </p>
        </div>
        <div className="timeline-container">
          {stepsData.map((step, index) => (
            // Alternate 'left' and 'right' classes for the zig-zag layout
            <div
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              key={index}
            >
              <div className="timeline-dot"></div>
              {/* 'is-visible' is added here for demonstration */}
              <div className="timeline-card is-visible p-4">
                <h3>{`0${index + 1}. ${step.title}`}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default HowWorks;