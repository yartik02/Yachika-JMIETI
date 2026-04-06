import React, { useState } from "react";
import adminPic from "../../../assets/Boyimg_avatar.png";
import { Error } from "../../Error";
import Overview from "./OverviewSuperAdmin";
import ReportedComplaintSection from "./ReportedComplaintSection.jsx";
import UnResolvedComplaints from "./UnResolvedComplaints.jsx";
import Settings from "../../../components/Settings";
import { useAuth } from "../../../store/auth";
import AllStudents from "../../AllStudents";
import ContectedBy from "../../ContectedBy";
import SideMenu from "../SideMenuAdmin.jsx";
import SuspensionAppeals from "../../SuspensionAppeals.jsx";

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
    name: "Overview",
    iconPath: (
      <>
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
      </>
    ),
  },
  {
    name: "Reported Complaints",
    iconPath: (
      <>
        <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
      </>
    ),
  },
  {
    name: "Unresolved Complaints",
    iconPath: (
      <>
        <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293z" />
        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
      </>
    ),
  },
  {
    name: "Settings",
    iconPath: (
      <>
        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
      </>
    ),
  },
];

function SuperAdminDashboard() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("Overview");
  const [activeView, setActiveView] = useState(null); // Null means tabs are showing
  const [showProfile, setShowProfile] = useState(false);

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
    setActiveTab("Complaints");
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
        className="adminView mx-auto py-5 flex-grow-1 bg-white my-3 rounded-start-5"
        style={{ minWidth: 0, overflowX: "visible" }}
      >
        <div
          className="text-center mb-4 d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
        >
          <h4
            className="text-start mx-4 fw-light"
            style={{ color: "#005050", width: "fit-content" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              width={30}
              height={30}
              fill="#005050"
              className="pb-1"
            >
              <path d="M320 312C253.7 312 200 258.3 200 192C200 125.7 253.7 72 320 72C386.3 72 440 125.7 440 192C440 258.3 386.3 312 320 312zM289.5 368L350.5 368C360.2 368 368 375.8 368 385.5C368 389.7 366.5 393.7 363.8 396.9L336.4 428.9L367.4 544L368 544L402.6 405.5C404.8 396.8 413.7 391.5 422.1 394.7C484 418.3 528 478.3 528 548.5C528 563.6 515.7 575.9 500.6 575.9L139.4 576C124.3 576 112 563.7 112 548.6C112 478.4 156 418.4 217.9 394.8C226.3 391.6 235.2 396.9 237.4 405.6L272 544.1L272.6 544.1L303.6 429L276.2 397C273.5 393.8 272 389.8 272 385.6C272 375.9 279.8 368.1 289.5 368.1z" />
            </svg>
            Super Admin Dashboard
          </h4>

          {showProfile ? (
            <button
              type="button"
              className="btn-close me-4 pe-3"
              onClick={() => setShowProfile(false)}
              aria-label="Close"
            ></button>
          ) : (
            <img
              src={adminPic}
              alt="Admin Avatar"
              role="button"
              className="ProfileimgAdmin rounded-circle mx-4"
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
                border: "3px solid #007575",
              }}
              title="Profile"
              onClick={() => setShowProfile(true)}
            />
          )}
        </div>

        <div
          className="card shadow p-4 mx-auto"
          style={{
            width: "96%",
            backgroundColor: "#7585ff16",
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
                  style={{ color: "#065064", width: "fit-content" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="#065064"
                    className="bi bi-person-bounding-box me-2"
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

              <div className="col-12 row mt-4 text-start text-sm-center">
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
              className="AdminMain flex-column"
              style={{ width: "100%", display: "flex" }}
            >
              <div
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
              </div>

              <div className="mt-4">
                {activeTab === "Overview" && (
                  <Overview activetab={goToComplaints} />
                )}
                {activeTab === "Reported Complaints" && (
                  <ReportedComplaintSection />
                )}
                {activeTab === "Unresolved Complaints" && (
                  <UnResolvedComplaints />
                )}
                {activeTab === "Settings" && <Settings />}
              </div>
            </div>
          )}

          {!showProfile && activeView !== null && (
            <main
              className="adminGetData flex-grow-1"
              style={{ width: "100%", display: "block", position: "relative" }}
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
                  fill="#065064"
                  className="bi bi-arrow-left xtra"
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
                className="bg-white p-lg-5 py-sm-3 rounded-4 shadow-sm"
                style={{ width: "100%", minHeight: "50vh", overflowX: "auto" }}
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
