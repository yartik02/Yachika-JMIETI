import React, { useState } from "react";
import logo from "../assets/YachikaLogo.png";
import Menu from "./Menu";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import.meta.env.VITE_ADMIN_MAIL;
import.meta.env.VITE_SUPER_ADMIN_MAIL;

const navData = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contactUs" },
];

function Navbar() {
  const { user } = useAuth();

  // This is the ONLY state you need for tracking active links.
  const location = useLocation();

  const isSuspended = user && user.isSuspended === true;
  const isLoggedIn = !!user;
  const isAdmin =
    user &&
    (user.email === import.meta.env.VITE_ADMIN_MAIL ||
      user.email === import.meta.env.VITE_SUPER_ADMIN_MAIL);

  const dashboardPath = user
    ? isAdmin
      ? `/dashboard/${user.role.toLowerCase()}`
      : `/studentDashboard/${user.rollno}`
    : "";

  return (
    <nav className="m-0 p-0">
      <ul
        className="d-flex mx-3 m-auto p-0 py-1"
        style={{ listStyleType: "none" }}
      >
        {/* Valid HTML: Wrap non-list elements in <li> */}
        <li className="d-flex align-items-center me-auto">
          <img
            src={logo}
            alt="Yachika Logo"
            width={70}
            height={70}
            className="my-auto logoimg"
          />
          <p
            className="logo ps-0 my-auto m-0 p-0 fs-3"
            style={{
              color: "#065064",
              fontWeight: "600",
              height: "fit-content",
            }}
          >
            Yachika@JMIETI
          </p>
        </li>

        {/* Standard Navigation Links */}
        {navData.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li
              className="py-3 nav-items px-2 mx-1 fs-5 my-auto"
              key={item.name}
            >
              <Link
                to={item.path}
                className={`text-decoration-none ${
                  isActive ? "activeItem" : "navItemsColor"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}

        {/* Conditional Dashboard Link */}
        {isLoggedIn && !isSuspended && (
          <li className="py-3 nav-items px-2 mx-1 fs-5 my-auto">
            <Link
              to={dashboardPath}
              className={`text-decoration-none ${
                location.pathname === dashboardPath
                  ? "activeItem"
                  : "navItemsColor"
              }`}
            >
              Dashboard
            </Link>
          </li>
        )}

        {/* Conditional Auth Button (Login/Logout) */}
        <li className="my-auto">
          {isLoggedIn && !isSuspended ? (
            <Link to="/logout" className="py-1 btn d-flex align-items-center btn-outline-danger ms-2" title="Log Out">
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
              Log Out
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="py-1 px-2 mx-2 rounded login_btn"
                style={{ textDecoration: "none" }}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="py-1 px-2 ms-2 rounded login_btn"
                style={{ textDecoration: "none" }}
              >
                Log In
              </Link>
            </>
          )}
        </li>

        {/* Menu Icon for Off-canvas */}
        <span className="pe-2 fs-5 my-auto menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="black"
            role="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
          <Menu navData={navData} />
        </span>
      </ul>
    </nav>
  );
}

export default Navbar;
