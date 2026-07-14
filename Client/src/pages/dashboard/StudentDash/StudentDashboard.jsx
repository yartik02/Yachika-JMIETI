import React, { useEffect, useState, useMemo } from "react";
import male2img from "../../../assets/new male avatar.jpg";
import femaleimg from "../../../assets/Girl_img_avatar.png";
import othersimg from "../../../assets/others avatar.avif";
import { Link } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import HomeStudent from "./HomeStudent";
import MyComplaints from "./MyComplaints";
import Notifications from "./Notifications";
import { Error } from "../../Error";
import { useTheme } from "../../../utils/useTheme.jsx";
import TabButtonGroup from "../TabBtnGroup";
import {
  home,
  complaints,
  notifications,
  userProfile,
  light,
  dark,
} from "../../../utils/Icons.jsx";

const btngrpData = [
  {
    name: "HomeStudent",
    btnValue: "Home",
    icon: home,
  },
  {
    name: "MyComplaints",
    btnValue: "My Complaints",
    icon: complaints,
  },
  {
    name: "Notifications",
    btnValue: "Notifications",
    icon: notifications,
  },
  {
    name: "Profile",
    btnValue: "Profile",
    icon: userProfile,
  },
];

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const { allComplaints, user } = useAuth();
  const [activeTab, setActiveTab] = useState(btngrpData[0].name);
  const { toggleTheme, theme } = useTheme();
  useEffect(() => {
    if (user && !student) {
      setStudent({
        name: user.name,
        rollNo: user.rollno,
        className: user.className,
        branch: user.branch,
        email: user.email,
        gender: user.gender,
      });
    }
  }, [user, student]);

  const studentComplaints = useMemo(() => {
    if (!allComplaints || !user?.email) return [];
    return allComplaints.filter(
      (complaint) => complaint.createdByEmail === user.email,
    );
  }, [allComplaints, user?.email]);

  if (!student) {
    return <Error />;
  }

  let imgSrc;
  {
    if (student.gender === "Male") {
      imgSrc = male2img;
    } else if (student.gender === "Female") {
      imgSrc = femaleimg;
    } else {
      imgSrc = othersimg;
    }
  }

  const ProfileData = [
    { label: "Name", value: student.name },
    { label: "Roll Number", value: student.rollNo },
    { label: "Year", value: student.className },
    { label: "Department", value: student.branch },
    { label: "Email", value: student.email },
  ];

  return (
    <div className="my-5 studentDashboard mx-auto">
      <div
        className="mx-auto head container mb-4 d-flex justify-content-between align-items-center text-capitalize"
      >
        <h4
          className="text-start my-auto fw-light"
          style={{ color: "var(--text-dashboard-name)", width: "fit-content" }}
        >
          <img
            src={imgSrc}
            alt="Student Avatar"
            className="ProfileimgStudent rounded-circle me-md-3 me-lg-3 me-2"
            style={{
              border: "3px solid var(--text-dashboard-name)",
            }}
          />
          {student.name}'s Dash<span className="newCompBtn">board</span>
        </h4>

        <div className="headBtns d-flex align-items-center gap-3">
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

          <Link
            to="/logout"
            className="py-1 btn d-flex align-items-center btn-outline-danger"
            title="Log Out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-1"
            >
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
            <span className="newCompBtn">Log Out</span>
          </Link>
        </div>
      </div>

      <div
        className="card shadow-lg rounded-4 container p-4 pb-3"
        style={{ backgroundColor: "var(--bg-surface)" }}
      >
        <div className="row stuMain">
          <TabButtonGroup
            tabs={btngrpData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            theme={theme}
          />
          <div className="mt-4 p-0">
            {activeTab === "HomeStudent" && (
              <HomeStudent
                student={student}
                studentComplaints={studentComplaints}
              />
            )}
            {activeTab === "MyComplaints" && (
              <MyComplaints studentComplaints={studentComplaints} />
            )}
            {activeTab === "Notifications" && <Notifications />}
            {activeTab === "Profile" && (
              <div
                className="row text-center p-5 rounded-4 mx-1"
                style={{ backgroundColor: "var(--bg-main)" }}
              >
                <div className="col-12">
                  <h4
                    className="text-start fw-light d-flex align-items-center"
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
                      className="bi bi-person-bounding-box me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    </svg>
                    Profile
                  </h4>
                  <img
                    src={imgSrc}
                    width={70}
                    height={70}
                    className="rounded-circle"
                    alt="Avatar"
                  />
                </div>

                <div
                  className="col-12 row mt-5 text-start fs-6"
                  style={{ color: "var(--text-primary)" }}
                >
                  {ProfileData.map((item, index) => (
                    <div
                      key={index}
                      className="col-lg-4 col-md-6 col-sm-12 mb-2"
                    >
                      <h5 className="fw-bold">{item.label}:</h5>
                      <p
                        className="p-2 bg-secondary bg-opacity-10 rounded-5 px-3"
                        style={{ border: `1px solid var(--light-hover)` }}
                      >
                        {item.value || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
