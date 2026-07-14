import React, { useState } from "react";
import adminPic from "../../../assets/Boyimg_avatar.png";
import { Error } from "../../Error";
import Overview from "./OverviewSuperAdmin";
import ReportedComplaintSection from "./ReportedComplaintSection.jsx";
import UnResolvedComplaints from "./UnResolvedComplaints.jsx";
import Settings from "../Admindashboard/Settings.jsx";
import { useAuth } from "../../../store/auth";
import AllStudents from "../../AllStudents";
import ContectedBy from "../../ContectedBy";
import SideMenu from "../SideMenuAdmin.jsx";
import SuspensionAppeals from "../../SuspensionAppeals.jsx";
import TabButtonGroup from "../TabBtnGroup.jsx";
import {
  home,
  reportedComplaints,
  unresolvedComplaints,
  settings,
  light,
  dark
} from "../../../utils/Icons.jsx";
import { useTheme } from "../../../utils/useTheme.jsx";

const menuItems = [
  {
    name: "All Students",
    name2: "allStudentsBtn",
    iconPath:
      "M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  },
  {
    name: "Contacted By",
    name2: "contactedByBtn",
    iconPath:
      "M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1m9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0z",
  },
];

const btngrpData = [
  {
    name: "overview",
    btnValue: "Overview",
    icon: home,
  },
  {
    name: "reportedComplaints",
    btnValue: "Reported Complaints",
    icon: reportedComplaints,
  },
  {
    name: "unresolvedComplaints",
    btnValue: "Unresolved Complaints",
    icon: unresolvedComplaints,
  },
  {
    name: "settings",
    btnValue: "Settings",
    icon: settings,
  },
];

function SuperAdminDashboard() {
  const { user, isAuthChecked } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState(btngrpData[0].name);
  const [activeView, setActiveView] = useState(null); // Null means tabs are showing
  const [showProfile, setShowProfile] = useState(false);

  // Wait for the cookie-based session check to finish before deciding access
  if (!isAuthChecked) {
    return null; // or a spinner
  }

  if (!user || user.role !== "SuperAdmin") {
    return <Error />;
  }

  // Navigation Handlers
  const handlebtnClick = (btnName) => {
    setActiveTab(btnName);
  };

  const handleItemClick = (viewName) => {
    setActiveView(viewName);
    setShowProfile(false);
  };

  const goTomainDash = () => {
    setActiveView(null);
    setShowProfile(false);
  };

  const goToComplaints = () => {
    setActiveTab("reportedComplaints");
    setActiveView(null);
  };

  return (
    <div
      className="d-flex p-0"
      style={{
        minHeight: "100vh",
        alignItems: "stretch",
        backgroundColor: "#005050", // Matches sidebar to hide the seam
      }}
    >
      <SideMenu
        menuItems={menuItems}
        handleItemClick={handleItemClick}
        activeView={activeView}
        role="SuperAdmin"
      />

      {/* Main Dashboard Area - White rounded block */}
      <div
        className="adminView mx-auto py-5 flex-grow-1 my-3 rounded-start-5"
        style={{
          minWidth: 0,
          overflowX: "visible",
          backgroundColor: "var(--bg-main)",
        }}
      >
        <div
          className="text-center mb-4 d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
        >
          <h4
            className="text-start mx-4 fw-light"
            style={{
              color: "var(--text-dashboard-name)",
              width: "fit-content",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              width={30}
              height={30}
              fill="var(--text-dashboard-name)"
              className="pb-1"
            >
              <path d="M320 312C253.7 312 200 258.3 200 192C200 125.7 253.7 72 320 72C386.3 72 440 125.7 440 192C440 258.3 386.3 312 320 312zM289.5 368L350.5 368C360.2 368 368 375.8 368 385.5C368 389.7 366.5 393.7 363.8 396.9L336.4 428.9L367.4 544L368 544L402.6 405.5C404.8 396.8 413.7 391.5 422.1 394.7C484 418.3 528 478.3 528 548.5C528 563.6 515.7 575.9 500.6 575.9L139.4 576C124.3 576 112 563.7 112 548.6C112 478.4 156 418.4 217.9 394.8C226.3 391.6 235.2 396.9 237.4 405.6L272 544.1L272.6 544.1L303.6 429L276.2 397C273.5 393.8 272 389.8 272 385.6C272 375.9 279.8 368.1 289.5 368.1z" />
            </svg>
            SuperAdmin Dashboard
          </h4>

          <div
            className="headBtns d-flex align-items-center gap-3"
            data-bs-theme={`${theme === "light" ? "light" : "dark"}`}
          >
            {/* Theme Toggle Button */}
            <div className="btn-click-animation my-auto">
              <p
                className="d-flex align-items-center m-0 p-0 p-2 rounded-circle theme-toggle-btn"
                role="button"
                onClick={toggleTheme}
                style={{ cursor: "pointer", height: "fit-content" }}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {theme === "light" ? dark : light}
                </svg>
              </p>
            </div>

            <span className="fs-4 fw-lighter">|</span>

            {showProfile ? (
              <button
                type="button"
                className={`btn-close me-4 pe-3`}
                style={{
                  color: "var(--text-dashboard-name)",
                  boxShadow: "none",
                }}
                onClick={() => setShowProfile(false)}
                aria-label="Close"
              ></button>
            ) : (
              <img
                src={adminPic}
                alt="Admin Avatar"
                role="button"
                className="ProfileimgAdmin rounded-circle me-4"
                style={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  border: "3px solid var(--text-dashboard-name)",
                }}
                title="Profile"
                onClick={() => setShowProfile(true)}
              />
            )}
          </div>
        </div>

        <div
          className="card shadow p-4 mx-auto rounded-4"
          style={{
            width: "96%",
            backgroundColor: "var(--bg-surface)",
            border: "none",
          }}
        >
          {showProfile && (
            <div
              className="row profile text-center"
              style={{ display: "flex" }}
            >
              <div className="col-12">
                <h4
                  className="text-start fw-light d-flex align-items-center mx-4"
                  style={{
                    color: "var(--text-dashboard-name)",
                    width: "fit-content",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="var(--text-dashboard-name)"
                    className="me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  </svg>
                  Profile
                </h4>

                <img
                  src={adminPic}
                  width={70}
                  height={70}
                  className="rounded-circle"
                  alt=""
                />
              </div>

              <div className="col-12 row mt-4 text-start text-sm-center" style={{ color: "var(--text-primary)" }}>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <h5 className="fw-bold">Name:</h5>
                  <p>{user.name}</p>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12">
                  <h5 className="fw-bold">Email:</h5>
                  <p>{user.email}</p>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12">
                  <h5 className="fw-bold">Role:</h5>
                  <p>{user.role}</p>
                </div>
              </div>
            </div>
          )}

          {!showProfile && activeView === null && (
            <div
              className="AdminMain flex-column w-100"
              style={{ color: "var(--text-primary)", diaply: "block", position: "relative"  }}
            >
              {/* <div
                className="btngrp d-flex justify-content-between bg-secondary bg-opacity-10 p-1 rounded-5 flex-sm-row"
                style={{ width: "100%", height: "fit-content" }}
              >
                {btngrpData.map((btn, index) => (
                  <button
                    key={index}
                    className={`btn rounded-5 w-25 p-1 border border-light border-opacity-10 d-flex align-items-center justify-content-center ${
                      activeTab === btn.name ? "bg-white fw-bold" : ""
                    }`}
                    // ref assignment removed entirely
                    style={{ height: "100%", fontSize: "0.8rem" }}
                    onClick={() => handlebtnClick(btn.name)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="18"
                      fill="black"
                      className="me-lg-1"
                    >
                      {btn.iconPath}
                    </svg>

                    <span>{btn.name}</span>
                  </button>
                ))}
              </div> */}
              <TabButtonGroup
                tabs={btngrpData}
                activeTab={activeTab}
                onTabChange={handlebtnClick}
                theme={theme}
              />

              <div className="mt-4">
                {activeTab === "overview" && (
                  <Overview activetab={goToComplaints} />
                )}
                {activeTab === "reportedComplaints" && (
                  <ReportedComplaintSection />
                )}
                {activeTab === "unresolvedComplaints" && (
                  <UnResolvedComplaints />
                )}
                {activeTab === "settings" && <Settings />}
              </div>
            </div>
          )}

          {!showProfile && activeView !== null && (
            <main
              className="adminGetData w-100 d-flex flex-grow-1"
              style={{ position: "relative" }}
            >
              <button
                onClick={goTomainDash}
                className="rounded-5 position-absolute top-0 end-0 m-5"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  zIndex: 10,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="var(--text-dashboard-name)"
                  className="xtra"
                  style={{ backgroundColor: "transparent", boxShadow: "none" }}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
              </button>
              <div
                className="w-100 p-lg-5 py-sm-3 rounded-4 shadow-sm"
                style={{ minHeight: "50vh", overflowX: "auto", backgroundColor: "var(--bg-main)", color: "var(--text-primary)" }}
              >
                {activeView === "All Students" && (
                  <AllStudents role={user.role} />
                )}
                {activeView === "Contacted By" && <ContectedBy />}
                {activeView === "appealsBtn" && <SuspensionAppeals />}
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
