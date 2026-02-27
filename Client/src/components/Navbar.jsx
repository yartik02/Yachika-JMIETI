import React from "react";
import logo from "../assets/YachikaLogo.png";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";

const navData = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact Us", path: "/contactUs" },
];

function Navbar() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
const isAdmin =
  user &&
  (user.email === process.env.AdminMail ||
    user.email === process.env.SuperAdminMail)
    ? true
    : false;
  return (
      <nav className="m-0 p-0">
        <ul
          className="d-flex mx-3 m-auto p-0 py-1"
          style={{ listStyleType: "none" }}
        >
          <img
            src={logo}
            alt="Yachika Logo"
            width={70}
            height={70}
            className="my-auto logoimg"
          />
          <p
            className="me-auto logo ps-0 my-auto m-0 p-0 fs-3"
            style={{
              color: "#065064",
              fontWeight: "600",
              height: "fit-content",
            }}
          >
            Yachika@JMIETI
          </p>

          {/* Standard Navigation Links */}
          {navData.map((item) => (
            <li className="py-3 nav-items px-3 fs-5 my-auto" key={item.name}>
              <Link to={item.path} className="text-decoration-none text-dark">
                {item.name}
              </Link>
            </li>
          ))}

          {/* Conditional Dashboard Link */}
          {isLoggedIn && (
            <li className="py-3 nav-items px-3 fs-5 my-auto">
              <Link
                to={isAdmin ? `/dashboard/${user.role.toLowerCase()}` : `/studentDashboard/${user.rollno}`}
                className="text-decoration-none text-dark"
              >
                Dashboard
              </Link>
            </li>
          )}

          {/* Conditional Auth Button (Login/Logout) */}
          <li>
            {isLoggedIn ? (
              <Link
                to="/logout"
                className="py-1 px-2 ms-2 my-auto rounded login_btn2"
              >
                Log Out
              </Link>
            ) : (
              <Link
                to="/signup"
                className="py-1 px-2 ms-2 my-auto rounded login_btn"
                style={{ textDecoration: "none" }}
              >
                Sign Up
              </Link>
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