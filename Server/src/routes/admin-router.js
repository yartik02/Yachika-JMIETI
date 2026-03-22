import express from "express";
import {
  getAllStudents,
  getAllComplaintsAdmins,
  getContactUsMessages,
  AdminSignup,
  adminLogin,
  getRecentComplaints,
  deleteStudent,
  getComplaintById,
  updateComplaintById,
  updateRatingFeedback,
  reportComplaint,
  suspendStudent,
  getDashboardStats
} from "../controllers/admin-controller.js";
const router = express.Router();
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { adminMiddleware, verifyAdminToken } from "../middlewares/admin-middleware.js";

router .route("/allStudents") .get(authMiddleware, adminMiddleware, getAllStudents);
router.route("/allComplaintsAdmins").get(verifyAdminToken, getAllComplaintsAdmins);
router .route("/allContactUsMessages") .get(authMiddleware, adminMiddleware, getContactUsMessages);
router .route("/getRecentComplaints") .get(authMiddleware, adminMiddleware, getRecentComplaints);
router.route("/signup").post(AdminSignup);
router.route("/login").post(adminLogin);
router .route("/student/delete/:id") .delete(authMiddleware, adminMiddleware, deleteStudent);
router .route("/complaint/:id") .get(authMiddleware, adminMiddleware, getComplaintById);
router .route("/complaint/update/:id") .patch(authMiddleware, adminMiddleware, updateComplaintById);
router.route("/feedbackForm/:id").patch(authMiddleware, updateRatingFeedback);
router.route("/:id/reportComplaintToSuperAdmin").patch( verifyAdminToken, reportComplaint );
router.route("/superAdmin/suspendStudent").put(verifyAdminToken, suspendStudent);
router.route("/getDashboardStats").get(verifyAdminToken, getDashboardStats);

export default router;
