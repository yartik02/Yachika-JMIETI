import React, { useEffect, useState, useRef, useMemo } from "react";
// import maleimg from "../../assets/Boyimg_avatar.png";
import male2img from "../../../assets/new male avatar.jpg";
import femaleimg from "../../../assets/Girl_img_avatar.png";
import othersimg from "../../../assets/others avatar.avif";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import HomeStudent from "./HomeStudent";
import MyComplaints from "./MyComplaints";
import Notifications from "./Notifications";
import { Error } from "../../Error";
import Loader from "../../../components/Loader";

const btngrpData = [
  {
    name: "HomeStudent",
    claValue: "bi bi-house ",
    btnValue: "Home",
    path: "M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z",
  },
  {
    name: "MyComplaints",
    claValue: "bi bi-chat-dots ",
    btnValue: "My Complaints",
    path: "m 2.165 15.803 l 0.02 -0.004 c 1.83 -0.363 2.948 -0.842 3.468 -1.105 A 9 9 0 0 0 8 15 c 4.418 0 8 -3.134 8 -7 s -3.582 -7 -8 -7 s -8 3.134 -8 7 c 0 1.76 0.743 3.37 1.97 4.6 a 10.4 10.4 0 0 1 -0.524 2.318 l -0.003 0.011 a 11 11 0 0 1 -0.244 0.637 c -0.079 0.186 0.074 0.394 0.273 0.362 a 22 22 0 0 0 0.693 -0.125 m 0.8 -3.108 a 1 1 0 0 0 -0.287 -0.801 C 1.618 10.83 1 9.468 1 8 c 0 -3.192 3.004 -6 7 -6 s 7 2.808 7 6 s -3.004 6 -7 6 a 8 8 0 0 1 -2.088 -0.272 a 1 1 0 0 0 -0.711 0.074 c -0.387 0.196 -1.24 0.57 -2.634 0.893 a 11 11 0 0 0 0.398 -2",
  },
  {
    name: "Notifications",
    claValue: "bi bi-bell ",
    btnValue: "Notifications",
    path: "M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6",
  },
  {
    name: "Profile",
    claValue: "bi bi-person ",
    btnValue: "Profile",
    path: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z",
  },
];

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const { allComplaints } = useAuth();
  const [userData, setUserData] = useState(true);
  const buttonRef = useRef(null);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
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

  useEffect(() => {
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.focus();
        setActiveTab("HomeStudent");
      }
    }, 100);
  }, []);

  if (!student) {
    return (
      <Error />
    );
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

  const handlebtnClick = (btnName) => {
    setActiveTab(btnName);
  };

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
        className="text-center head mb-4 px-4 d-flex justify-content-between align-items-center text-capitalize"
        style={{ width: "100%" }}
      >
        <h4
          className="text-start mx-lg-4 mx-0 my-auto fw-light"
          style={{ color: "#065064", width: "fit-content" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width={30}
            height={30}
            fill="#065064"
            className="pb-1 me-1"
          >
            <path d="M320 312C253.7 312 200 258.3 200 192C200 125.7 253.7 72 320 72C386.3 72 440 125.7 440 192C440 258.3 386.3 312 320 312zM289.5 368L350.5 368C360.2 368 368 375.8 368 385.5C368 389.7 366.5 393.7 363.8 396.9L336.4 428.9L367.4 544L368 544L402.6 405.5C404.8 396.8 413.7 391.5 422.1 394.7C484 418.3 528 478.3 528 548.5C528 563.6 515.7 575.9 500.6 575.9L139.4 576C124.3 576 112 563.7 112 548.6C112 478.4 156 418.4 217.9 394.8C226.3 391.6 235.2 396.9 237.4 405.6L272 544.1L272.6 544.1L303.6 429L276.2 397C273.5 393.8 272 389.8 272 385.6C272 375.9 279.8 368.1 289.5 368.1z" />
          </svg>
          {student.name}'s Dashboard
        </h4>
        <img
          src={imgSrc}
          alt="Student Avatar"
          className="ProfileimgStudent rounded-circle mx-lg-4 mx-0"
          style={{ width: "40px", height: "40px", border: "3px solid #065064" }}
        />
      </div>

      <div className="card shadow-lg rounded-4 container p-4 pb-3">
        <div className="row stuMain">
          <div
            className="btngrp d-flex justify-content-between bg-secondary bg-opacity-10 p-1 rounded-5 flex-sm-row"
            style={{ width: "100%", height: "fit-content" }}
          >
            {btngrpData.map((btn, index) => (
              <button
                key={index}
                className={`btn rounded-5 w-25 p-1 d-flex align-items-center justify-content-center border-light border-opacity-10 ${activeTab === btn.name ? "bg-white fw-bold" : ""}`}
                ref={index === 0 ? buttonRef : null}
                style={{ height: "100%", fontSize: "0.9rem" }}
                onClick={() => handlebtnClick(btn.name)}
              >
                <span className="d-flex align-items-center justify-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width={20}
                    height={20}
                    fill="black"
                    className={`${btn.claValue} me-1`}
                  >
                    <path d={btn.path} />
                    <path
                      d={
                        index === 1
                          ? "M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                          : null
                      }
                    ></path>
                  </svg>
                  <span className="">{btn.btnValue}</span>
                </span>
              </button>
            ))}
          </div>
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
                style={{ backgroundColor: "#5292a310" }}
              >
                <div className="col-12">
                  <h4
                    className="text-start fw-light d-flex align-items-center"
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
                    src={imgSrc}
                    width={70}
                    height={70}
                    className="rounded-circle"
                    alt=""
                  />
                </div>

                <div className="col-12 row mt-5 text-start fs-6">
                  {ProfileData.map((item, index) => (
                    <div
                      key={index}
                      className="col-lg-4 col-md-6 col-sm-12 mb-2"
                    >
                      <h5 className="fw-bold">{item.label}:</h5>
                      <p className="border p-2 bg-secondary bg-opacity-10 rounded-5 px-3">
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
