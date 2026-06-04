import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { useTheme } from "../utils/useTheme.jsx";
import { light, dark } from "../utils/Icons.jsx";
import.meta.env.VITE_ADMIN_MAIL;
import.meta.env.VITE_SUPER_ADMIN_MAIL;

function Menu({ navData }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isLoggedIn = !!user;
  const isAdmin =
    user &&
    (user.email === import.meta.env.VITE_ADMIN_MAIL ||
      user.email === import.meta.env.VITE_SUPER_ADMIN_MAIL);

  return (
    <>
      <div
        className="offcanvas offcanvas-start w-75"
        // style={{ backgroundColor: "#f2f5fe", color: "#111b69" }}
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header px-4 d-flex justify-content-between align-items-center">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Menu
          </h5>

          <span className="d-flex align-items-center gap-3">
            {/* Theme Toggle Button */}
            <p
              className="d-flex align-items-center m-0 p-0 p-2 rounded-circle theme-toggle-btn btn-click-animation"
              role="button"
              onClick={toggleTheme}
              style={{ cursor: "pointer" }}
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
            <button
              type="button"
              className={`btn-close ${theme === "light" ? "" : "btn-close-white"}`}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </span>
        </div>
        <div className="offcanvas-body">
          {
            <>
              {navData.map((item, index) => {
                return (
                  <span key={index}>
                    <Link
                      to={item.path}
                      className="text-decoration-none fs-5 menuItems"
                    >
                      <div
                        className="text-center mb-2 p-2"
                        data-bs-dismiss="offcanvas"
                      >
                        {item.name}
                      </div>
                    </Link>
                  </span>
                );
              })}
              {isLoggedIn && (
                <span>
                  <Link
                    to={
                      isAdmin
                        ? `/${user.role.toLowerCase()}-dashboard`
                        : `/studentDashboard/${user.rollno}`
                    }
                    className="text-decoration-none"
                  >
                    <div
                      className="menuItems text-center mb-2 fs-4 p-2"
                      data-bs-dismiss="offcanvas"
                    >
                      Dashboard
                    </div>
                  </Link>
                </span>
              )}
              <p className="d-flex flex-column align-items-center justify-content-center py-2 gap-3">
                {isLoggedIn ? (
                  <Link
                    to={"/logout"}
                    className="py-1 px-2 ms-2 my-auto rounded login_btn2"
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
                    Log Out
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="py-1 px-2 ms-2 rounded login_btn btn-click-animation"
                      style={{ textDecoration: "none" }}
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className="py-1 px-2 ms-2 rounded login_btn btn-click-animation"
                      style={{ textDecoration: "none" }}
                    >
                      Log In
                    </Link>
                  </>
                )}
              </p>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default Menu;
