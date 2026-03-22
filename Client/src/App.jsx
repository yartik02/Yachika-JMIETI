import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/SignUp";
import StudentDashboard from "./pages/dashboard/StudentDash/StudentDashboard";
import AdminDashboard from "./pages/dashboard/Admindashboard/AdminDashboard";
import ComplaintForm from "./components/ComplaintForm";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Error } from "./pages/Error";
import Logout from "./components/Logout";
import ContectedUsers from "./pages/ContectedBy";
import AllStudents from "./pages/AllStudents";
import PrivacyPolicy from "./pages/PrivacyPolicies";
import ForgotPassword from "./pages/ForgetPassword";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SuperAdminDash from "./pages/dashboard/superAdminDash/SuperAdminDash";
import SuspendedAccount from "./pages/SuspendedAccount";

function App() {
  const location = useLocation();
  const hideNavbarAndFooter =
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/complaintSubmission" ||
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/suspended-account") ||
    location.pathname === "/forget-password";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {loading ? (
        <Routes>
          <Route path="*" element={<Loader />} />
        </Routes>
      ) : (
        <>
          {!hideNavbarAndFooter && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/studentDashboard/:rollno"
              element={<StudentDashboard />}
            />
            <Route path="/complaintSubmission" element={<ComplaintForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/suspended-account" element={<SuspendedAccount />} />
            
            <Route path="/dashboard/admin" element={<AdminDashboard />}>
              <Route path="allStudents" element={<AllStudents />} />
              <Route path="contactedUsers" element={<ContectedUsers />} />
            </Route>
            <Route path="/dashboard/superAdmin" element={<SuperAdminDash />} />
            
            <Route path="*" element={<Error />} />
          </Routes>
          <ScrollToTopButton />
          {!hideNavbarAndFooter && <Footer />}
        </>
      )}
    </>
  );
}

export default App;
