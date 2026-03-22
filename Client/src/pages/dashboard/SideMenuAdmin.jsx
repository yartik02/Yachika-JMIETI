import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/YachikaLogo.png";

function SideMenu({ menuItems, handleItemClick, activeView, role }) {
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  return (
    <section className="sideMenu d-flex flex-column justify-content-between flex-shrink-0"
      style={{color:"rgb(9, 15, 61)"}}
    >
      <div className="w-100 mt-4">
        {/* Header / Logo */}
        <div className="headerSec d-flex align-items-center px-3 mb-4">
          <img src={logo} alt="Logo" className="img-fluid" width={45} style={{ flexShrink: 0 }} />
          <p className="text-white sideMenuText ms-0 mb-0 fw-bold" style={{fontSize:"1.2rem"}}>{role}</p>
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
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mb-4 px-2 w-100">
        <Link
          to="/logout"
          className={`text-decoration-none d-flex align-items-center text-white py-3 px-3 rounded-3 w-100 ${
            isLogoutHovered ? "bg-danger bg-opacity-25 text-danger" : ""
          }`}
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
          style={{ transition: "all 0.2s ease-in-out" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ flexShrink: 0 }}
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
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