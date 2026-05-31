import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";
import { toast } from "react-toastify";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setError("");
    setMessage("");
  };

  /* ---------- STEP 1: SEND OTP ---------- */
  const handleSendOTP = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      console.log("student's mail:", email);

      const res = await fetch(`${API_BASE}/sendOtpToMail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, name:"Student" }),
      });

      // const data = await res.json();
      if (!res.ok) return toast.error(data.msg || "Failed to send OTP", {
        style: {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "fit-content",
          maxWidth: "40vw",
        },
      });

      setMessage("OTP sent successfully!");
      // console.log("data of otp generation",data);
      console.log("data of otp mail", res);

      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- STEP 2: VERIFY OTP ---------- */
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/verifyOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, otp: otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Invalid OTP");

      setMessage("OTP verified successfully.");
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- STEP 3: RESET PASSWORD ---------- */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    resetMessages();

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/forgot-password/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Password reset failed");

      ("Password updated successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="forgot-password-container"
      style={{ backgroundColor: "#090f3d" }}
    >
      {/* backbtn */}
      <button
        className="back-btn shadow-lg z-3 p-2 px-3 rounded-pill border-0 btn-click-animation"
        onClick={() => navigate("/login")}
        aria-label="Go back"
      >
        <svg width="24" height="24" fill="var(--accent-primary)" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>

      <div className="forgot-password-card" style={{backgroundColor:"var(--bg-surface)" }}>
        <h3 className="fw-bolder mb-0">Reset Your Password</h3>
        <p className="subtitle mb-4">Yachika@JMIETI Account Recovery</p>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div className="input-group text-start">
              <label className="opacity-75" style={{color:"var(--text-primary)"}}>Email Address</label>
              <input
                type="email"
                className="rounded-3 modalInput focus-ring" 
                style={{color:"var(--text-primary)", backgroundColor:"transparent"}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="login_btn p-2 w-100 rounded-3 btn-click-animation"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div className="input-group text-start">
              <label className="opacity-75" style={{color:"var(--text-primary)"}}>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="rounded-3 modalInput focus-ring" 
                style={{color:"var(--text-primary)", backgroundColor:"transparent"}}
                placeholder="6-digit code"
                maxLength="6"
                required
              />
            </div>

            <button className="login_btn p-2 w-100 rounded-3 btn-click-animation" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              className="secondary-btn btn-click-animation"
              onClick={() => setStep(1)}
            >
              Back to Email
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="input-group text-start">
              <label className="opacity-75" style={{color:"var(--text-primary)"}}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-3 modalInput focus-ring" 
                style={{color:"var(--text-primary)", backgroundColor:"transparent"}}
                placeholder="Enter new password... "
                required
              />
            </div>

            <div className="input-group text-start">
              <label className="opacity-75" style={{color:"var(--text-primary)"}}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-3 modalInput focus-ring" 
                style={{color:"var(--text-primary)", backgroundColor:"transparent"}}
                placeholder="Confirm new password... "
                required
              />
            </div>

            <button className="login_btn p-2 w-100 rounded-3 btn-click-animation" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;