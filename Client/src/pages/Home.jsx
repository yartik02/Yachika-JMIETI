import React from "react";
import bannerlg from "../assets/Banner_JMIETI5.png";
import bannersm from "../assets/bannerSmall3.png";
import Main1 from "./Main1";
import Main2 from "./Main2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";

// let tokenExist =null, isLoggedIn;
const Home = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/complaintSubmission");
    } else {
      toast.info(
        "Please login to submit a complaint.",
        { autoClose: 2000,
          style: {
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-primary)",
            width: "100%",
            minWidth: "40vw",
          },
        },
      );
      setTimeout(() => {
        toast.warning(
          "Redirecting to login page...",
          { autoClose: 2000,
            style: {
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              width: "100%",
              minWidth: "40vw",
            },
          },
        );
      }, 1500);
      setTimeout(() => {
        navigate("/login");
      }, 4400);
    }
  };

  return (
    <section className="home container-fluid p-0 w-100">
      {/* Banner Section */}
      <div className="banner position-relative">
        <picture className="d-block">
          <source srcSet={bannersm} media="(max-width: 768px)" />
          <img
            src={bannerlg}
            alt="Campus complaint system banner"
            className="w-100"
          />
        </picture>
        <button
          className="btn1 mb-4 rounded-pill fw-light btn-click-animation"
          onClick={handleClick}
        >
          SUBMIT A COMPLAINT
        </button>
      </div>

      {/* Main Content Section */}
      <Main1 />
      <Main2 />
    </section>
  );
};

export default Home;
