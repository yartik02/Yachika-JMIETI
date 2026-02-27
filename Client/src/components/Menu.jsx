import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";

function Menu({ navData }) {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin =
    user &&
    (user.email === process.env.AdminMail||
      user.email === process.env.SuperAdminMail)
      ? true
      : false;

  return (
    <>
      <div
        className="offcanvas offcanvas-start w-75"
        style={{ backgroundColor: "#f2f5fe", color: "#111b69" }}
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close "
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {
            <>
              {navData.map((item, index) => {
                return (
                  <span key={index}>
                    <Link
                      to={item.path}
                      className="text-decoration-none fs-5"
                      style={{ color: "#1a257d" }}
                    >
                      <div
                        className="menuItems text-center mb-2 fs-4 p-2"
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
                    style={{ color: "#1a257d" }}
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
              <p className="d-flex align-items-bottom justify-content-center py-3">
                {isLoggedIn ? (
                  <Link
                    to={"/logout"}
                    className="py-1 px-2 ms-2 my-auto rounded login_btn2"
                  >
                    Log Out
                  </Link>
                ) : (
                  <Link
                    to={"/signup"}
                    className="py-1 px-2 ms-2 my-auto rounded login_btn"
                    style={{ textDecoration: "none" }}
                  >
                    Sign Up
                  </Link>
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
