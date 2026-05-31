import React from "react";

const TabButtonGroup = ({ tabs, activeTab, onTabChange, theme }) => {
  return (
    <div
      className="btngrp d-flex justify-content-between bg-secondary bg-opacity-10 p-1 rounded-5 flex-sm-row"
      style={{ width: "100%", height: "fit-content" }}
    >
      {tabs.map((btn, index) => (
        <button
          key={btn.name}
          className={`rounded-5 w-25 p-1 d-flex align-items-center justify-content-center ${
            theme === "light" ? "border-light border-opacity-10" : "border-dark"} 
            ${activeTab === btn.name ? "activeBtn fw-bold" : ""}`}
          style={{ height: "100%", fontSize: "0.9rem" }}
          onClick={() => onTabChange(btn.name)}
        >
          <span className="d-flex align-items-center justify-content-center">
            <span className="me-2 d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={18}
                height={18}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {btn.icon}
              </svg>
            </span>
            <span>{btn.btnValue}</span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default TabButtonGroup;
