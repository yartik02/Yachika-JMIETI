import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/YachikaLogo.png";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth.jsx";
import "react-toastify/dist/ReactToastify.css";
import "../components/CompliantSorting.css";

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
  Eye: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--text-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--text-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-.722-3.25" />
      <path d="M2 8a10.645 10.645 0 0 0 20 0" />
      <path d="m20 15-1.726-2.05" />
      <path d="m4 15 1.726-2.05" />
      <path d="m9 18 .722-3.25" />
    </svg>
  ),
};

function Signup() {
  const navigate = useNavigate();
  const { storeTokenInLocalStorage } = useAuth();
  const dropdownContainerRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      class: "col-6",
    },
    {
      label: "Roll No",
      type: "text",
      name: "rollno",
      placeholder: "Enter your Roll Number",
      class: "col-6",
    },
    {
      label: "College Email",
      type: "email",
      name: "email",
      placeholder: "Enter College Email",
      class: "col-12",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Create Password",
      class: "col-6",
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      class: "col-6",
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
      return toast.error("Oops! Something’s missing — please fill all fields", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "100%",
          minWidth: "40vw",
        }
      });
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "100%",
          minWidth: "40vw",
        }
      });
    }
    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters long!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "100%",
          minWidth: "40vw",
        }
      });
    }
    if (
      formData.branch === "Bachelor of Computer Applications" &&
      formData.className === "4th Year"
    ) {
      return toast.error("BCA 4th Year is not a valid class!", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "100%",
          minWidth: "40vw",
        }
      });
    }

    // 2. Send OTP
    try {
      setIsSendingOtp(true);
      const API_BASE = import.meta.env.VITE_API_BASE_URL;

      // Generate OTP and Send Email
      const mailRes = await fetch(`${API_BASE}/api/auth/sendOtpToMail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      // if (!mailRes.ok) throw new Error("Failed to send email");
      if (mailRes.ok) {
        toast.success(
          <div
            className="d-flex flex-column w-100"
            style={{ minWidth: "70vw" }}
          >
            <strong>OTP Sent!</strong>
            <p className="m-0" style={{ fontSize: "0.95rem" }}>
              If an account with that email exists, an OTP has been sent.
            </p>
            <p className="m-0" style={{ fontSize: "0.8rem" }}>
              Please check your email (and spam folder) for the OTP.
            </p>
          </div>,
          {
            style: {
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              width: "100%",
              minWidth: "40vw",
            },
          },
        );
        setStep(2); // Move to OTP Verification Step
      } else {
        const errorData = await mailRes.json();
        toast.error(<p className="m-0 ">{errorData.msg}</p>, {
          style: {
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-primary)",
            width: "100%",
            minWidth: "40vw",
          }
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP. Please try again.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "100%",
          minWidth: "40vw",
        }
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  // --- STEP 2: Verify OTP & Final Registration API ---
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      return toast.error("Please enter the complete 6-digit OTP.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "100%",
          minWidth: "40vw",
        }
      });
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

        toast.success("Sign up is complete, now sign in!", { autoClose: 2000 }, {
          style: {
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-primary)",
            width: "fit-content",
            minWidth: "40vw",
          },
        });
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.log(errorData.error);

        if (errorData.error.includes("ROLL_NUMBER_EXISTS")) {
          console.log(
            "Student with this Roll number already exist either check your roll number or complain into the admin cell!",
          );

          toast.error(
            <div className="d-flex flex-column">
              <strong>SignUp failed</strong>
              <p className="m-0" style={{ fontSize: "0.95rem" }}>
                Student with this roll number already exist,
              </p>
              <p className="m-0" style={{ fontSize: "0.8rem" }}>
                Check your Roll no or complain in admin cell!
              </p>
            </div>,
            {
              style: {
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-primary)",
                width: "100%",
                minWidth: "40vw",
              },
            },
          );
          return;
        }
        toast.error(
          errorData.msg || "Sign up failed. Please check your details.",
          {
            style: {
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              width: "100%",
              minWidth: "40vw",
            }
          }
        );
      }
    } catch (err) {
      console.log("err here:", err);

      console.error("Error during signup:", err);
      toast.error(err.message || "Sign up failed. A network error occurred.", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "100%",
          minWidth: "40vw",
        }
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="login row m-0" style={{ minHeight: "100vh" }}>
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
        <div className="d-flex align-items-center ">
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
      <div className="col-md-6 d-flex justify-content-center align-items-center p-lg-5 p-md-5 p-3">
        <div
          className="rounded-4 p-4 shadow-lg w-100 "
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--bg-surface)",
          }}
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
                  <p className="mb-3 opacity-75">
                    Signup and become a member now!
                  </p>
                </div>

                <div className="row g-2">
                  {inputFields.map((data, idx) => {
                    // Determine if the current input is one of the password fields and if it should be shown
                    const isPassword = data.name === "password";
                    const isConfirm = data.name === "confirmPassword";

                    let currentType = data.type;
                    if (isPassword)
                      currentType = showPassword ? "text" : "password";
                    if (isConfirm)
                      currentType = showConfirmPassword ? "text" : "password";

                    return (
                      <div key={idx} className={`${data.class}`}>
                        <div className="position-relative">
                          <input
                            id={data.name}
                            type={currentType}
                            placeholder={data.placeholder}
                            name={data.name}
                            value={formData[data.name]}
                            onChange={handleChange}
                            className="form-control p-3 pe-5"
                          />

                          {/* Render Eye Icon for Password fields */}
                          {(isPassword || isConfirm) && (
                            <span
                              className="position-absolute top-50 translate-middle-y end-0 pe-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                if (isPassword) setShowPassword(!showPassword);
                                if (isConfirm)
                                  setShowConfirmPassword(!showConfirmPassword);
                              }}
                            >
                              {isPassword
                                ? showPassword
                                  ? Icons.EyeOff
                                  : Icons.Eye
                                : showConfirmPassword
                                  ? Icons.EyeOff
                                  : Icons.Eye}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="my-3 text-start">
                  <label>Gender:</label>
                  <div className="options d-flex gap-4 gap-md-3 gap-lg-5">
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
                </div>

                <div className="dropdowns" ref={dropdownContainerRef}>
                  {dropdown.map((dropdown) => {
                    const isOpen = openDropdown === dropdown.name;
                    const selectedValue = filters[dropdown.name];
                    return (
                      <div className="text-start" key={dropdown.name}>
                        <div
                          className="p-2 ps-3 selects rounded-3 d-flex justify-content-between align-items-center position-relative mb-3"
                          role="button"
                          style={{
                            border: "1px solid var(--hover-overlay)",
                            backgroundColor: "transparent",
                          }}
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
                              className="menus mt-1 p-2 rounded-3 position-absolute w-100"
                              style={{
                                zIndex: 10,
                                backgroundColor: "var(--bg-surface)",
                                border: "1px solid var(--hover-overlay)",
                                color: "var(--text-primary)",
                              }}
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
                    className="login_btn p-2 rounded-2 w-100 px-4 mt-1 btn-click-animation"
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
                <p className="opacity-75 mb-4">
                  Enter the code sent to your email
                </p>

                <div className="text-center mt-2">
                  <div
                    className="bg-primary bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: "74px",
                      height: "74px",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {Icons.Mail}
                  </div>
                  <p className="opacity-75">
                    We've sent a 6-digit code to <br />
                    <strong style={{ color: "var(--bg-primary)" }}>
                      {formData.email}
                    </strong>
                  </p>
                </div>

                <div className="d-flex mx-auto justify-content-center gap-2 my-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      className="form-control otpInputs rounded-4 text-center fw-bold fs-4 border border-primary-subtle"
                      style={{
                        width: "50px",
                        height: "55px",
                        borderColor: "var(--accent-primary)",
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
                  style={{ color: "var(--accent-primary)" }}
                  onClick={handleSendOTP}
                  disabled={isSendingOtp}
                >
                  {isSendingOtp ? "Sending..." : "Resend Code"}
                </button>

                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-50 btn-click-animation"
                    onClick={() => setStep(1)}
                    disabled={isVerifying}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="login_btn p-2 rounded-2 w-50 btn-click-animation"
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
