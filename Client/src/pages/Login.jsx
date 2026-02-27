import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/YachikaLogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth.jsx";
import Signup from "./SignUp.jsx";


export default function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { user, storeTokenInLocalStorage } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputData = [
    { type: "email", placeholder: "Enter your Email...", name: "email", label: "E-mail" },
    { type: "password", placeholder: "Enter your Password...", name: "password", label: "Password" },
  ];



  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if the form is empty
    if (!formData.email || !formData.password) {
      toast.error("Oops! Invalid credentials — maybe a typo? 🤔");
      return; // Stop the function here
    }

    const { email, password } = formData;
    try{
      const response = await fetch(`${import.meta.env.API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });
      // console.log("hello");
      
      // console.log("Response :", response);
      
      if (response.ok) {
        const res_data = await response.json();
        // console.log("Response data:", res_data);
        
        storeTokenInLocalStorage(res_data.token);
        // console.log("User data:", res_data);

        if(res_data.role === "admin" || res_data.role === "superAdmin"){
          return (
            toast.success(`Welcome ${res_data.adminName}, Login successful!`),
            setTimeout(() => {
            navigate(`/dashboard/${res_data.role.toLowerCase()}`);
            }, 1000),
            setFormData({ email: "", password: "" })
        );
        }
        else{
          toast.success(`Welcome back,  ${res_data.studentName}! Let’s fix some campus chaos 💪!`);
          setTimeout(() => {
            navigate(`/studentDashboard/${res_data.rollno}`);
          }, 1000);
          setFormData({ email: "", password: "" });
          return;
        }
        
      }
      else {
        const errorData = await response.json();
        // console.log("Error Data :", errorData);
        toast.error(errorData.message || "Invalid Email or Password!");
      }

    }catch(err){
      console.error("Error in form submission: ", err.message);
      toast.error("Server taking a chai break ☕");
    }finally {
      setLoading(false);
    }

    if (loading) {
    return (
      <div className="text-center loading my-5" style={{width: "100vw"}}>
        <div className="spinner-border" role="status">
        </div>
        <p className="">Loading the course details...</p>
      </div>
    );
  }

    toast.error("Invalid Email or Password!");
  };

  return (
    <div
      className="login row m-0"
      style={{ width: "100vw", minHeight: "100vh" }}
    >
      {/* Left Section */}
      <div
        className="col-md-6 py-5 d-flex align-items-center justify-content-center p-4 position-relative"
        style={{ backgroundColor: "#1a267dd5" }}
      >
        <button
          onClick={() => navigate(-1)}
          className="rounded-5 position-absolute top-0 start-0 m-3"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 
              4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 
              .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </button>
        <div className="d-flex align-items-center">
          <div className="text-white logo ms-3 p-4 rounded-3 fs-3 d-flex justify-content-center align-items-center">
            <p className="m-0">
              <img src={logo} alt="Yachika Logo" width={75} />
            </p>
          </div>
          <div className="ms-4">
            <p className="text-white mb-1 fs-3 fw-bold text-start">
              Yachika@JMIETI
            </p>
            <p className="text-white mb-0">
              Raising Concerns Made Easy, Because Every Issue Matters.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="col-md-6 d-flex justify-content-center align-items-center p-5">
        <div
          className="border rounded-3 p-4 shadow-lg w-100"
          style={{ background: "#fff" }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="w-100">
            <p className="fs-4 fw-bold mb-1">Login</p>
            <p className="text-muted mb-3">Login to your account</p>

            {inputData.map((data, idx) => (
              <div key={idx} className="mb-3 text-start">
                <label htmlFor={data.name} className="form-label w-100 d-flex justify-content-between">
                  <span>{data.label} <span className="text-danger">*</span></span>
                {data.name === "password" && (
                  <Link
                    to="/forget-password"
                    className="small fw-semibold text-decoration-none opacity-75"
                  >
                    Forgot password?
                  </Link>
                )}
                </label>
                <input
                  id={data.name}
                  type={data.type}
                  placeholder={data.placeholder}
                  name={data.name}
                  value={formData[data.name]}
                  onChange={handleChange}
                  // required
                  className="form-control"
                />
              </div>
            ))}

            <div className="text-center">
              <button type="submit" className="btn px-4 mt-3 login_btn">
                Login
              </button>
            </div>

            <p className="mt-3 text-center">
              Don’t have an account?&nbsp;
              {/* <span
                className="xtraText"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span> */}
              <Link to="/signup" className="xtraText">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
