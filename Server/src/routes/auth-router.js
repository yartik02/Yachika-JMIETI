import express from "express";
const router = express.Router();
import {
  home,
  signup,
  login,
  user,
  contactUs,
  getNotifications,
  sendOtpToMail,
  verifyOtp,
  forgetPassword,
  clearNotifications,
  markNotificationsAsRead,
  getAllComplaints
} from "../controllers/Student.controllers.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { complaintSubmission } from "../controllers/complaint.controllers.js";

router.route("/").get(home);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/user").get(authMiddleware, user);
// router.route("/complaints").post(complaintSubmission);
router.route("/contactUs").post(contactUs);
router.route("/sendOtpToMail").post(sendOtpToMail);
router.route("/verifyOtp").post(verifyOtp);
router.route("/forgot-password/reset-password").post(forgetPassword);
router.route("/getNotifications").get(authMiddleware, getNotifications);
router.route("/clearNotifications").delete(authMiddleware, clearNotifications);
router.route("/markNotificationsAsRead").patch(authMiddleware, markNotificationsAsRead);
router.route('/getAllComplaints').get(authMiddleware, getAllComplaints)

export default router;
