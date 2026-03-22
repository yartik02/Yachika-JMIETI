import React, { useEffect, useState, useRef } from "react";
import adminPic from "../../../assets/Boyimg_avatar.png";
import { Error } from "../../Error";
import { toast } from "react-toastify";
import Overview from "./OverviewSuperAdmin";
import ReportedComplaintSection from "./ReportedComplaintSection.jsx";
import UnResolvedComplaints from "./UnResolvedComplaints.jsx";
import Settings from "../../../components/Settings";
import { useAuth } from "../../../store/auth";
import AllStudents from "../../AllStudents";
import ContectedBy from "../../ContectedBy";
import SideMenu from "../SideMenuAdmin.jsx";

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
    path: "M80 96C88.8 96 96 103.2 96 112L96 464C96 490.5 117.5 512 144 512L560 512C568.8 512 576 519.2 576 528C576 536.8 568.8 544 560 544L144 544C99.8 544 64 508.2 64 464L64 112C64 103.2 71.2 96 80 96zM208 320C216.8 320 224 327.2 224 336L224 432C224 440.8 216.8 448 208 448C199.2 448 192 440.8 192 432L192 336C192 327.2 199.2 320 208 320zM320 208L320 432C320 440.8 312.8 448 304 448C295.2 448 288 440.8 288 432L288 208C288 199.2 295.2 192 304 192C312.8 192 320 199.2 320 208zM400 256C408.8 256 416 263.2 416 272L416 432C416 440.8 408.8 448 400 448C391.2 448 384 440.8 384 432L384 272C384 263.2 391.2 256 400 256zM512 144L512 432C512 440.8 504.8 448 496 448C487.2 448 480 440.8 480 432L480 144C480 135.2 487.2 128 496 128C504.8 128 512 135.2 512 144z",
  },
  {
    name: "Reported Complaints",
    path: "M243.2 597.6C243.2 597.6 243.2 597.6 243.2 597.6L236.8 602.4C232 606 226.1 608 220 608C204.5 608 192 595.5 192 580L192 512L160 512C107 512 64 469 64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L360 512C358.3 512 356.6 512.6 355.2 513.6L243.2 597.6zM224 532L224 572L336 488C342.9 482.8 351.3 480 360 480L480 480C515.3 480 544 451.3 544 416L544 192C544 156.7 515.3 128 480 128L160 128C124.7 128 96 156.7 96 192L96 416C96 451.3 124.7 480 160 480L200 480C213.3 480 224 490.7 224 504L224 532z",
  },
  {
    name: "Unresolved Complaints",
    path: "M400 176C400 167.2 407.2 160 416 160L592 160C600.8 160 608 167.2 608 176L608 352C608 360.8 600.8 368 592 368C583.2 368 576 360.8 576 352L576 214.6L363.3 427.3C357.1 433.5 346.9 433.5 340.7 427.3L224 310.6L59.3 475.3C53.1 481.5 42.9 481.5 36.7 475.3C30.5 469.1 30.5 458.9 36.7 452.7L212.7 276.7C218.9 270.5 229.1 270.5 235.3 276.7L352 393.4L553.4 192L416 192C407.2 192 400 184.8 400 176z",
  },
  {
    name: "Settings",
    viewBox: "0 0 16 16",
    w: "16",
    h: "16",
    path: "M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0 M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z",
  },
];

function SuperAdminDashboard() {
  const buttonRef = useRef(null);
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("Overview");
  const [activeView, setActiveView] = useState(null); // Null means tabs are showing
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (buttonRef.current && activeView === null && !showProfile) {
      buttonRef.current.focus();
    }
  }, [activeView, showProfile]);

  if (!user || user.role !== "superAdmin") {
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
            // FIX: Overriding CSS display:none with inline style

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
            // FIX: Overriding CSS display:none with inline style

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
                    className={`btn rounded-5 w-25 p-1 border border-light border-opacity-10 p-0 ${
                      activeTab === btn.name ? "bg-white fw-bold" : ""
                    }`}
                    ref={index === 0 ? buttonRef : null}
                    style={{ height: "100%", fontSize: "0.8rem" }}
                    onClick={() => handlebtnClick(btn.name)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox={btn.viewBox || "0 0 640 640"}
                      width={btn.w || "20"}
                      height={btn.h || "20"}
                      fill="black"
                      className="me-lg-1"
                    >
                      <path d={btn.path} />
                    </svg>

                    <span>{btn.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {activeTab === "Overview" && (
                  <Overview activetab={goToComplaints} />
                )}
                {activeTab === "Reported Complaints" && <ReportedComplaintSection />}
                {activeTab === "Unresolved Complaints" && <UnResolvedComplaints />}
                {activeTab === "Settings" && <Settings />}
              </div>
            </div>
          )}

          {!showProfile && activeView !== null && (
            // FIX: Overriding CSS display:none with inline style display: block
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
                {activeView === "All Students" && <AllStudents role={user.role} />}
                {activeView === "Contacted By" && <ContectedBy />}
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;