import express from "express";
import { getAllStudents, getAllComplaints, getContactUsMessages, AdminSignup, adminLogin, getRecentComplaints, deleteStudent, getComplaintById, updateComplaintById, updateRatingFeedback } from "../controllers/admin-controller.js";
const router = express.Router();
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { adminMiddleware } from "../middlewares/admin-middleware.js";

router.route('/allStudents').get(authMiddleware,adminMiddleware, getAllStudents);
router.route('/allComplaints').get(authMiddleware, getAllComplaints);
router.route('/allContactUsMessages').get(authMiddleware,adminMiddleware, getContactUsMessages);
router.route('/getRecentComplaints').get(authMiddleware,adminMiddleware, getRecentComplaints);
router.route('/signup').post(AdminSignup);
router.route('/login').post(adminLogin);
router.route('/student/delete/:id').delete(authMiddleware,adminMiddleware, deleteStudent);
router.route('/complaint/:id').get(authMiddleware,adminMiddleware, getComplaintById);
router.route('/complaint/update/:id').patch(authMiddleware,adminMiddleware, updateComplaintById);
router.route('/feedbackForm/:id').patch(authMiddleware, updateRatingFeedback);

export default router;