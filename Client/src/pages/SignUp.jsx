import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/YachikaLogo.png";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth.jsx";
import "react-toastify/dist/ReactToastify.css";
import "../components/CompliantSorting.css";

// --- Reusable SVG Icons ---
const Icons = {
  Mail: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <path d="m16 19 2 2 4-4" />
    </svg>
  ),
};

function Signup() {
  const navigate = useNavigate();
  const { storeTokenInLocalStorage } = useAuth();
  const dropdownContainerRef = useRef(null);

  // --- Step & OTP State ---
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // --- Form Data State ---
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    className: "",
    branch: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dropdown = [
    {
      name: "Branch",
      value: "branch",
      options: [
        "Computer Science & Engineering",
        "Civil Engineering",
        "Artificial Intelligence & Machine Learning",
        "Bachelor of Computer Applications",
      ],
    },
    {
      name: "Year",
      value: "className",
      options: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    },
  ];

  const genders = ["Male", "Female", "Other"];
  const inputFields = [
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Enter your full name",
    },
    {
      label: "Roll No",
      type: "text",
      name: "rollno",
      placeholder: "Enter your Roll Number",
    },
    {
      label: "College Email",
      type: "email",
      name: "email",
      placeholder: "Enter College Email",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Create Password",
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
    },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const [filters, setFilters] = useState({
    Year: "Select Year",
    Branch: "Select Branch",
  });

  // --- Dropdown Logic ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelectOption = (name, option) => {
    setFilters((prev) => ({ ...prev, [name]: option }));
    if (name === "Year")
      setFormData((prev) => ({ ...prev, className: option }));
    else if (name === "Branch")
      setFormData((prev) => ({ ...prev, branch: option }));
    setOpenDropdown(null);
  };

  // --- OTP Input Logic ---
  const handleOtpChange = (index, e) => {
    if (isNaN(e.target.value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value.slice(-1);
    setOtp(updatedOtp);
    if (e.target.value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // --- STEP 1: Validation & Send OTP API ---
  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();

    // 1. Validate Form Data
    if (
      !formData.name ||
      !formData.rollno ||
      !formData.className ||
      !formData.branch ||
      !formData.gender ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error(
        "Oops! Something’s missing — please fill all fields 🐣",
      );
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters long!");
    }
    if (
      formData.branch === "Bachelor of Computer Applications" &&
      formData.className === "4th Year"
    ) {
      return toast.error("BCA 4th Year is not a valid class!");
    }

    // 2. Send OTP
    try {
      setIsSendingOtp(true);
      const API_BASE = import.meta.env.VITE_API_BASE_URL;

      // Generate OTP
      // Send Email
      const mailRes = await fetch(`${API_BASE}/api/auth/sendOtpToMail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      if (!mailRes.ok) throw new Error("Failed to send email");

      toast.success("OTP sent to your email!");
      setStep(2); // Move to OTP Verification Step
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // --- STEP 2: Verify OTP & Final Registration API ---
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      return toast.error("Please enter the complete 6-digit OTP.");
    }

    try {
      setIsVerifying(true);
      const API_BASE = import.meta.env.VITE_API_BASE_URL;

      // 1. Verify OTP
      const verifyRes = await fetch(`${API_BASE}/api/auth/verifyOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: enteredOtp }),
      });

      if (!verifyRes.ok) {
        const verifyData = await verifyRes.json();
        throw new Error(verifyData.msg || "Invalid OTP");
      }

      // 2. Final Signup API call (Your original logic)
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          rollno: formData.rollno,
          className: formData.className,
          branch: formData.branch,
          gender: formData.gender,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const res_Data = await response.json();
        storeTokenInLocalStorage(res_Data.token);

        // Reset form
        setFormData({
          name: "",
          rollno: "",
          className: "",
          branch: "",
          gender: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setOtp(["", "", "", "", "", ""]);

        toast.success("Sign up is complete, now sign in!", { autoClose: 2000 });
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.msg || "Sign up failed. Please check your details.",
        );
      }
    } catch (err) {
      console.error("Error during signup:", err);
      toast.error(err.message || "Sign up failed. A network error occurred.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      className="login row m-0"
      style={{ minHeight: "100vh" }}
    >
      {/* --- Left Branding Section --- */}
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
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </button>
        <div className="d-flex align-items-center topxtra">
          <div className="text-white logo ms-3 p-4 rounded-3 fs-3 d-flex justify-content-center align-items-center">
            <p className="m-0">
              <img src={logo} alt="Yachika Logo" width={75} />
            </p>
          </div>
          <div className="ms-4">
            <p className="text-white mb-1 fs-3 fw-bold text-start">
              Yachika@JMIETI
            </p>
            <p className="text-white text-start mb-0">
              Raising Concerns Made Easy, Because Every Issue Matters.
            </p>
          </div>
        </div>
      </div>

      {/* --- Right Form Section --- */}
      <div className="col-md-6 d-flex justify-content-center align-items-center p-lg-5 p-md-5 p-sm-5">
        <div
          className="border rounded-3 p-4 my-5 shadow-lg w-100"
          style={{ background: "#fff" }}
        >
          <form
            onSubmit={step === 1 ? handleSendOTP : handleFinalSubmit}
            method="POST"
            className="w-100"
            autoComplete="off"
          >
            {/* --- STEP 1: Registration Form --- */}
            {step === 1 && (
              <div className="fade-enter-active">
                <div className="formHeader text-center">
                  <p className="fs-4 fw-bold mb-1">Sign-up</p>
                  <p className="text-muted mb-3">
                    Signup and become a member now!
                  </p>
                </div>

                {inputFields.map((data, idx) => (
                  <div key={idx} className="mb-3 text-start">
                    <input
                      id={data.name}
                      type={data.type}
                      placeholder={data.placeholder}
                      name={data.name}
                      value={formData[data.name]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                ))}

                <div className="mb-3 text-start">
                  <label>Gender:</label>
                  {genders.map((option, idx) => (
                    <div key={idx} className="form-check">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        id={`gender${idx}`}
                        checked={formData.gender === option}
                        onChange={handleChange}
                        className="form-check-input"
                      />
                      <label
                        className="form-check-label gender-label"
                        htmlFor={`gender${idx}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="dropdowns" ref={dropdownContainerRef}>
                  {dropdown.map((dropdown) => {
                    const isOpen = openDropdown === dropdown.name;
                    const selectedValue = filters[dropdown.name];
                    return (
                      <div className="text-start" key={dropdown.name}>
                        <div
                          className="p-2 ps-3 selects border rounded-3 d-flex justify-content-between align-items-center position-relative mb-3"
                          role="button"
                          onClick={() => handleToggleDropdown(dropdown.name)}
                        >
                          {selectedValue}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className={`bi bi-chevron-down dropdown-arrow ${isOpen ? "open" : ""}`}
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                            />
                          </svg>
                          {isOpen && (
                            <div
                              className="border menus mt-1 p-2 rounded-3 bg-white position-absolute w-100"
                              style={{ zIndex: 10 }}
                            >
                              {dropdown.options.map((option) => (
                                <p
                                  key={option}
                                  className={`m-0 p-2 rounded-3 dropdown-option ${option === selectedValue ? "selected-option" : ""}`}
                                  onClick={() =>
                                    handleSelectOption(dropdown.name, option)
                                  }
                                >
                                  {option}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="login_btn p-2 rounded-2 w-100 px-4 mt-1"
                    disabled={isSendingOtp}
                  >
                    {isSendingOtp ? "Sending OTP..." : "Continue"}
                  </button>
                </div>
                <p className="text-center mt-3">
                  Already have an account?&nbsp;
                  <Link to="/login" className="xtraText">
                    Login
                  </Link>
                </p>
              </div>
            )}

            {/* --- STEP 2: OTP Verification --- */}
            {step === 2 && (
              <div className="fade-enter-active text-center">
                <p className="fs-4 fw-bold mb-1">Verify your identity</p>
                <p className="text-muted mb-4">
                  Enter the code sent to your email
                </p>

                <div className="text-center mt-2">
                  <div
                    className="bg-primary bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "74px", height: "74px", color: "#1a267d" }}
                  >
                    {Icons.Mail}
                  </div>
                  <p className="text-muted">
                    We've sent a 6-digit code to <br />
                    <strong className="text-dark">{formData.email}</strong>
                  </p>
                </div>

                <div className="d-flex mx-auto justify-content-center gap-2 my-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      className="form-control otpInputs rounded-4 text-center fw-bold fs-4 bg-light border border-primary-subtle"
                      style={{
                        width: "50px",
                        height: "55px",
                        borderColor: "#1a267d",
                      }}
                      maxLength="1"
                      value={digit}
                      ref={(el) => (otpRefs.current[index] = el)}
                      onChange={(e) => handleOtpChange(index, e)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-link fw-bold text-decoration-none small mb-4"
                  style={{ color: "#1a267d" }}
                  onClick={handleSendOTP}
                  disabled={isSendingOtp}
                >
                  {isSendingOtp ? "Sending..." : "Resend Code"}
                </button>

                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-50"
                    onClick={() => setStep(1)}
                    disabled={isVerifying}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="login_btn p-2 rounded-2 w-50"
                    disabled={isVerifying}
                  >
                    {isVerifying ? "Verifying..." : "Verify & Sign Up"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;