import express from "express";
const router = express.Router();
import {
  home,
  signup,
  login,
  logout,
  user,
  contactUs,
  getNotifications,
  sendOtpToMail,
  verifyOtp,
  forgetPassword,
  clearNotifications,
  markNotificationsAsRead,
  getAllComplaints,
  submitAppeal
} from "../controllers/Student.controllers.js";
import { authMiddleware, checkNotSuspended } from "../middlewares/auth-middleware.js";

router.route("/").get(home);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(authMiddleware, logout); // Server-side cookie clear
router.route("/user").get(authMiddleware, user);
// router.route("/complaints").post(complaintSubmission);
router.route("/contactUs").post(contactUs);
router.route("/sendOtpToMail").post(sendOtpToMail);
router.route("/verifyOtp").post(verifyOtp);
router.route("/forgot-password/reset-password").post(forgetPassword);
router.route("/getNotifications").get(authMiddleware, getNotifications);
router.route("/clearNotifications").delete(authMiddleware, clearNotifications);
router.route("/markNotificationsAsRead").patch(authMiddleware, markNotificationsAsRead);
router.route('/getAllComplaints').get(authMiddleware, getAllComplaints);

router.route('/submitAppeal').post(authMiddleware, submitAppeal)
//gemini said to apply the suspended middleware to all routes 

export default router;