import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { toast } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();
  const { LogoutUser } = useAuth();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (!hasLoggedOut.current) {
      LogoutUser();
      toast.success("Logged out! Don’t ghost us for too long 👋");
      navigate("/");
      hasLoggedOut.current = true;
    }
  }, [LogoutUser, navigate]);

  return null;
}
