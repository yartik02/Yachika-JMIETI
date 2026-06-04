import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/YachikaLogo.png";
import { logout } from "../../utils/Icons";

function SideMenu({ menuItems, handleItemClick, activeView, role }) {
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  return (
    <section
      className="sideMenu d-flex flex-column justify-content-between flex-shrink-0"
      style={{ color: "rgb(9, 15, 61)" }}
    >
      <div className="w-100 mt-4">
        {/* Header / Logo */}
        <div className="headerSec d-flex align-items-center px-3 mb-4">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            width={45}
            style={{ flexShrink: 0 }}
          />
          <p
            className="text-white sideMenuText ms-0 mb-0 fw-bold"
            style={{ fontSize: "1.2rem" }}
          >
            {role}
          </p>
        </div>

        {/* Menu Items */}
        <ul className="p-0 px-2 my-4" style={{ listStyle: "none" }}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item mb-2 p-3 rounded-3 text-nowrap ${
                activeView === item.name ? "active-button" : ""
              }`}
              role="button"
              onClick={() => handleItemClick(item.name)}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="white"
                viewBox="0 0 16 16"
                style={{ flexShrink: 0 }}
              >
                <path d={item.iconPath} />
              </svg>
              <span className="sideMenuText text-white ms-3">{item.name}</span>
            </li>
          ))}
          {role === "SuperAdmin" && (
            <li
              className={`menu-item mb-2 p-3 rounded-3 text-nowrap ${
                activeView === "appealsBtn" ? "active-button" : ""
              }`}
              role="button"
              onClick={() => handleItemClick("appealsBtn")}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
                className="lucide lucide-shield-ellipsis-icon lucide-shield-ellipsis"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="M8 12h.01" />
                <path d="M12 12h.01" />
                <path d="M16 12h.01" />
              </svg>
              <span className="sideMenuText text-white ms-3">Appeals</span>
            </li>
          )}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mb-4 px-2 w-100">
        <Link
          to="/logout"
          className={`text-decoration-none d-flex align-items-center py-3 px-3 rounded-3 w-100 bg-opacity-25 ${
            isLogoutHovered ? "bg-danger text-danger" : " text-white"
          }
          `}
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
          style={{ transition: "all 0.2s ease-in-out" }}
        >
          {logout}  
          <span className="sideMenuText ms-3">Logout</span>
        </Link>
      </div>

      <style>{`
        .sideMenu {
          width: 80px; 
          height: 100vh;
          position: sticky;
          top: 0;
          overflow-x: hidden; 
          transition: width 0.3s ease-in-out;
        }

        .sideMenu:hover {
          width: 200px; 
        }

        .sideMenuText {
          display: inline-block; 
          opacity: 0 !important; 
          max-width: 0px !important; 
          visibility: hidden !important; 
          overflow: hidden;
          white-space: nowrap;
          transition: opacity 0.2s ease, max-width 0.3s ease-in-out;
        }

        .sideMenu:hover .sideMenuText {
          opacity: 1 !important;
          visibility: visible !important;
          max-width: 200px !important; 
        }

        .active-button {
          background-color: rgba(255, 255, 255, 0.15);
        }
        
        .menu-item {
          transition: background-color 0.2s ease-in-out;
        }
        
        .menu-item:not(.active-button):hover {
          background-color: rgba(255, 255, 255, 0.08); 
        }
      `}</style>
    </section>
  );
}

export default SideMenu;
